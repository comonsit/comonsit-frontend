import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SolicitudDetail from './SolicitudDetail/SolicitudDetail';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import RTable from '../../../components/UI/RTable/RTable';
import SelectColumnFilter from '../../../components/UI/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../components/UI/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../components/UI/RTable/Filters/FilterGreaterThan';
import Button from '../../../components/UI/Button/Button';
import Title from '../../../components/UI/Title/Title';
import classes from './Solicitudes.module.css'
import * as actions from '../../../store/actions'
import { isGerencia } from '../../../store/roles'

class Solicitudes extends Component {
  state = {
    showSolicitudModal: false,
    selectedSol: null,
    saldos: null
  }

  componentDidMount () {
    this.props.onInitSolicitudes(this.props.token)
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedSol !== prevProps.selectedSol) {
      this.setState({selectedSol: this.props.selectedSol})
    } else if(this.props.saldo !== prevProps.saldo) {
          this.setState({saldos: this.props.saldo})
        }
  }

  showSolicitud = (id, socio) => {
    this.setState({
      showSolicitudModal: true
    });
    this.props.onFetchSelSol(this.props.token, id)
    this.props.onGetSocioSaldo(this.props.token, socio)
  }

  cancelSelected =() => {
    this.setState({
      showSolicitudModal: false,
      selectedSol: null,
      saldos: null
    });
  }

  onNewSolicitud = () => {
    this.props.history.push('solicitud-formato');
    this.props.onNewSol()
  }

  renderStatus = cellInfo => {
    const colors = {
      "AP": "#2bc71b",
      "RV": "#d1df2c",
      "RE": "#ec573c",
      "CA": "#868a86"
    }

     return (
       <div
        style={{
          borderRadius: "2rem",
          width: "2rem",
          height: "2rem",
          backgroundColor: colors[cellInfo.cell.value] }}
       />
     )
 }

  render () {
    const columns = [
      {
        Header: <FormattedMessage id="solicitudes.folio_solicitud"/>,
        accessor: 'folio_solicitud',
        Filter: '',
        filter: ''
      },
      {
        Header: <FormattedMessage id="solicitudes.fecha_solicitud"/>,
        accessor: 'fecha_solicitud'
      },
      {
        Header: <FormattedMessage id="clave_socio"/>,
        accessor: 'clave_socio'
      },
      {
        Header: <FormattedMessage id="solicitudes.tipo_credito"/>,
        accessor: 'tipo_credito',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: <FormattedMessage id="solicitudes.monto_solicitado"/>,
        accessor: 'monto_solicitado',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="plazo_de_pago_solicitado"/>,
        accessor: 'plazo_de_pago_solicitado',
        Filter: SliderColumnFilter,
        filter: 'equals'
      },
      {
        Header: <FormattedMessage id="solicitudes.estatus_solicitud"/>,
        accessor: 'estatus_solicitud',
        Cell: this.renderStatus,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: <FormattedMessage id="solicitudes.estatus_evaluacion"/>,
      accessor: 'estatus_evaluacion',
        Cell: this.renderStatus,
        Filter: SelectColumnFilter,
        filter: 'includes',
      }
    ]

    let solicitudInfoButton = null
    let solicitudInfo = <Spinner/>

    if (this.state.selectedSol && this.state.saldos) {
      solicitudInfo = (
        <div>
          <SolicitudDetail
            solicitud={this.state.selectedSol}
            saldos={this.state.saldos}
          />
        </div>
      )
      if (this.state.selectedSol.estatus_solicitud === 'RV' && isGerencia(this.props.role)) {
        solicitudInfoButton = <Button
          clicked={() => this.props.history.push('mesa-control')}
          btnType="Success"
          ><FormattedMessage id="solicitudes.goToMesaControl"/></Button>
      }
    }

    return (
      <>
        <Modal
          show={this.state.showSolicitudModal}
          modalClosed={this.cancelSelected}>
          <div className={classes.Container}>
            <div className={classes.InfoContainer}>
              {solicitudInfo}
            </div>
            {solicitudInfoButton}
          </div>
        </Modal>
        <div className={classes.Container}>
          <Title
            titleName="solicitudes.title">
            <Button
              clicked={this.onNewSolicitud}
              ><FormattedMessage id="solicitudes.new"/></Button>
          </Title>
          <RTable
            columns={columns}
            data={this.props.listaSolicitudes}
            onRowClick={(row, socio) => this.showSolicitud(row.values.folio_solicitud, row.values.clave_socio)}
            />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      listaSolicitudes: state.solicitudes.solicitudes,
      selectedSol: state.solicitudes.selectedSolicitud,
      token: state.auth.token,
      role: state.generalData.role,
      saldo: state.acopios.socioSaldo
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSolicitudes: (token) => dispatch(actions.initSolicitudes(token)),
      onNewSol: () => dispatch(actions.newSolicitud()),
      onFetchSelSol: (token, solId) => dispatch(actions.fetchSelSolicitud(token, solId)),
      unSelSol: () => dispatch(actions.unSelectSolicitud()),
      onGetSocioSaldo: (token, socioId) => dispatch(actions.getSocioSaldo(token, socioId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Solicitudes))
