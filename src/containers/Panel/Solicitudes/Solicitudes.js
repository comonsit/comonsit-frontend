import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import SolicitudForm from './SolicitudForm/SolicitudForm';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import RTable from '../../../components/UI/RTable/RTable';
import SelectColumnFilter from '../../../components/UI/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../components/UI/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../components/UI/RTable/Filters/FilterGreaterThan';
import Button from '../../../components/UI/Button/Button';
import classes from './Solicitudes.module.css'
import * as actions from '../../../store/actions'

class Solicitudes extends Component {
  state = {
    showSolicitudModal: false,
    selectedSol: null
  }

  componentDidMount () {
    this.props.onInitSolicitudes(this.props.token)
  }

  componentDidUpdate(prevProps) {
    // TODO: pendiente hasta que editemos el socio en Modal
    // if(this.props.updated !== prevProps.updated) {
    //   this.props.onInitSolicitudes(this.props.token)
    // }
    if(this.props.selectedSol !== prevProps.selectedSol) {
      console.log('CAMBIANDO EL ESTADO');
      this.setState({selectedSol: this.props.selectedSol})
    }
  }

  showSolicitud =(id) => {
    this.setState({
      showSolicitudModal: true
    });
    this.props.onFetchSelSocios(this.props.token, id)
    // this.props.onFetchSelSocios(this.props.token, id)
  }

  cancelSelected =() => {
    this.setState({
      showSolicitudModal: false,
      selectedSol: null
    });
    // this.props.unSelSocio()
  }

  onToggleEditable = () => {
    // this.setState(prevState => {
    //     return {editable: !prevState.editable}
    // })
  }

  onNewSolicitud = () => {
    // this.setState({showSolicitudModal: true});
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
        Header: <FormattedMessage id="solicitudes.clave_socio"/>,
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
        Header: <FormattedMessage id="solicitudes.plazo_de_pago_solicitado"/>,
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
        Header: <FormattedMessage id="solicitudes.estatus_ej_credito"/>,
        accessor: 'estatus_ej_credito',
        Cell: this.renderStatus,
        Filter: SelectColumnFilter,
        filter: 'includes',
      }
    ]

    let solicitudInfo = <Spinner/>

    // TODO: Mover a Container independiente informativo!!
    if (this.state.selectedSol) {
      solicitudInfo = (
        <div>
          <h3>Folio: {this.state.selectedSol.folio_solicitud} </h3>
          <h4>clave de Socio: {this.state.selectedSol.clave_socio} </h4>
          <h5>Generado por: {this.state.selectedSol.autor} </h5>
          <h5>Tipo: {this.state.selectedSol.tipo_credito} </h5>
          <h5>A {this.state.selectedSol.plazo_de_pago_solicitado} Meses </h5>
          <h5>Por ${this.state.selectedSol.monto_solicitado} </h5>
          <h5>...más información útil para decidir... </h5>
          <Button
            clicked={this.cancelSelected}
            ><FormattedMessage id="solicitudes.approve"/></Button>
          <Button
            clicked={this.cancelSelected}
            ><FormattedMessage id="solicitudes.disapprove"/></Button>
        </div>
      )
    }

    console.log(this.props.listaSolicitudes)


    console.log(this.props.selectedSol);

    // TODO:
    // if (this.state.solicitudSeleccionado && this.props.selSol) {
    //   solicitudInfo = (
    //     <SolicitudForm/>
    //   )
    // }

    return (
      <>
        <Modal
          show={this.state.showSolicitudModal}
          modalClosed={this.cancelSelected}>
          {solicitudInfo}
        </Modal>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1><FormattedMessage id="solicitudes.title"/></h1>
            <div className={classes.ButtonContainer}>
              <Button
                clicked={this.onNewSolicitud}
                ><FormattedMessage id="solicitudes.new"/></Button>
            </div>
          </div>
          <RTable
            columns={columns}
            data={this.props.listaSolicitudes}
            onRowClick={row => this.showSolicitud(row.values.folio_solicitud)}
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
      comunidades: state.generalData.comunidades,
      token: state.auth.token,
      // selSocio: state.socios.selectedSol,
      // updated: state.socios.updated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSolicitudes: (token) => dispatch(actions.initSolicitudes(token)),
      onNewSol: () => dispatch(actions.newSolicitud()),
      onFetchSelSocios: (token, solId) => dispatch(actions.fetchSelSolicitud(token, solId)),
      unSelSol: () => dispatch(actions.unSelectSolicitud())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Solicitudes))
