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

    if (this.props.listaSolicitudes && this.props.comunidades) {
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
