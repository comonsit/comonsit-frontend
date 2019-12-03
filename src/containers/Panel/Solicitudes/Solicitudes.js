import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import SolicitudForm from './SolicitudForm/SolicitudForm';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Table from '../../../components/UI/Table/Table';
import Button from '../../../components/UI/Button/Button';
import classes from './Solicitudes.module.css'
import * as actions from '../../../store/actions'

class Solicitudes extends Component {
  state = {
    solicSeleccionado: false,
  }

  componentDidMount () {
    this.props.onInitSolicitudes(this.props.token)
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.onInitSolicitudes(this.props.token)
    }
  }

  showSolicitud =(id) => {
    // this.setState({solicSeleccionado: true});
    // this.props.onFetchSelSocios(this.props.token, id)
  }

  cancelSelected =() => {
    this.setState({ solicSeleccionado: false});
    // this.props.unSelSocio()
  }

  onToggleEditable = () => {
    // this.setState(prevState => {
    //     return {editable: !prevState.editable}
    // })
  }

  onNewSolicitud = () => {
    this.setState({solicSeleccionado: true});
    this.props.history.push('solicitud-formato');
  }

  getComunidad = (id) => {
    const index = this.props.comunidades.findIndex(x => x.id === id)
    return this.props.comunidades[index].nombre_de_comunidad
  }

  render () {
    //// TODO: fecha de solicitud por año (filtro)
    // TODO: mandar comunidad y región del socio
    const solicitudHeaders = ["solicitudes.folio_solicitud", "solicitudes.fecha_solicitud", "solicitudes.clave_socio", "solicitudes.tipo_credito", "solicitudes.monto_solicitado", "solicitudes.plazo_de_pago_solicitado", "solicitudes.estatus_solicitud", "solicitudes.estatus_ej_credito"]

    const colors = {
      'CO': "Green",  // Cobrado
      'AP': "Blue",   // Aprobado
      'RV': "Yellow", // Revisión
      'RE': "Red",     // Rechazado
      'CA': "Gray"    // Cancelado
    }
    const coloredColumns = {
      "solicitudes.estatus_solicitud": colors,
      "solicitudes.estatus_ej_credito": colors
    }
    let solTableData
    let form = <Spinner/>

    if (this.props.listaSolicitudes && this.props.comunidades) {
      console.log(this.props.listaSolicitudes);
      solTableData = this.props.listaSolicitudes.map((s, i) => {
        return {
          "solicitudes.folio_solicitud": s.folio_solicitud,
          "solicitudes.fecha_solicitud": s.fecha_solicitud,
          "solicitudes.clave_socio": s.clave_socio,
          "solicitudes.tipo_credito": s.tipo_credito,
          "solicitudes.monto_solicitado": s.monto_solicitado,
          "solicitudes.plazo_de_pago_solicitado": s.plazo_de_pago_solicitado,
          "solicitudes.estatus_solicitud": s.estatus_solicitud,
          "solicitudes.estatus_ej_credito": s.estatus_ej_credito
        }
      })
    }

    // TODO:
    // if (this.state.solicitudSeleccionado && this.props.selSol) {
    //   form = (
    //     <SolicitudForm/>
    //   )
    // }


    return (
      <>
        <Modal
          show={this.state.solicSeleccionado}
          modalClosed={this.cancelSelected}>
          {form}
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
          <Table
            headers={solicitudHeaders}
            data={solTableData}
            clicked={this.showSolicitud}
            clickId={"solicitudes.folio_solicitud"}
            colors={coloredColumns}
            />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      listaSolicitudes: state.solicitudes.solicitudes,
      comunidades: state.auth.comunidades,
      token: state.auth.token,
      // selSocio: state.socios.selectedSocio,
      // updated: state.socios.updated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSolicitudes: (token) => dispatch(actions.initSolicitudes(token))
      // onNewSocios: () => dispatch(actions.newSocio()),
      // onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
      // unSelSocio: () => dispatch(actions.unSelectSocio())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Solicitudes))
