import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

import SociosForm from './SociosForm/SociosForm';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Socios.module.css'
import * as actions from '../../../store/actions'

class Socios extends Component {
  state = {
    socioSeleccionado: false,
  }

  componentDidMount () {
    this.props.onInitSocios(this.props.token)
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.onInitSocios(this.props.token)
    }
  }

  showSocio =(id) => {
    this.setState({socioSeleccionado: true});
    this.props.onFetchSelSocios(this.props.token, id)
    // TODO: leer redux editado y hacer un re-render si hubo cambios
  }

  cancelSelected =() => {
    this.setState({ socioSeleccionado: false});
    this.props.unSelSocio()
  }

  onToggleEditable = () => {
    this.setState(prevState => {
        return {editable: !prevState.editable}
    })
  }

  getComunidad = (id) => {
    const index = this.props.comunidades.findIndex(x => x.id === id)
    return this.props.comunidades[index].nombre_de_comunidad
  }

  getStatusColor = (status) => {
    let st = null
    switch (status) {
      case ('AC'):
        st = <div className={classes.AC}></div>
        break;
      case ('BA'):
        st = <div className={classes.BA}></div>
        break;
      default:
        st = <div className={classes.NP}></div>
    }
    return st
  }

  render () {
    let socioData = <Spinner/>
    let form = <Spinner/>

    // MAKE SOCIO LIST
    // TODO: checar si es null para poner vacío??
    if (this.props.listaSocios) {
      console.log(this.props.listaSocios)
      socioData = this.props.listaSocios.map((s, i) => (
        <tr
          id={s.clave_socio + i}
          onClick={() => this.showSocio(s.clave_socio)}>
          <td>{s.clave_socio}</td>
          <td>{s.nombres} {s.apellidos}</td>
          <td>{s.comunidad ? this.getComunidad(s.comunidad) : ""}</td>
          <td>{s.region ? s.region : ""}</td>
          <td>{s.fecha_ingr_yomol_atel}</td>
          <td>{this.getStatusColor(s.estatus_cafe)}</td>
          <td>{this.getStatusColor(s.estatus_miel)}</td>
          <td>{this.getStatusColor(s.estatus_yip)}</td>
          <td>{this.getStatusColor(s.estatus_gral)}</td>
        </tr>
      ))
    }

    if (this.state.socioSeleccionado && this.props.selSocio) {
      form = (
        <SociosForm/>
      )
    }


    return (
      <>
        <Modal
          show={this.state.socioSeleccionado}
          modalClosed={this.cancelSelected}>
          {form}
        </Modal>
        <div className={classes.Container}>
          <h1><FormattedMessage id="socios.title"/></h1>
          <div className={classes.TableContainer}>
            <table className={classes.TablaSocios}>
              <tr>
                <th><FormattedMessage id="socios.clave"/></th>
                <th><FormattedMessage id="socios.nombre"/></th>
                <th><FormattedMessage id="socios.region"/></th>
                <th><FormattedMessage id="socios.comunidad"/></th>
                <th><FormattedMessage id="socios.ingreso-ya"/></th>
                <th><FormattedMessage id="socios.cafe"/></th>
                <th><FormattedMessage id="socios.miel"/></th>
                <th><FormattedMessage id="socios.jabon"/></th>
                <th><FormattedMessage id="socios.general"/></th>
              </tr>
              <tbody>
                {socioData}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      listaSocios: state.socios.socios,
      selSocio: state.socios.selectedSocio,
      updated: state.socios.updated,
      token: state.auth.token,
      comunidades: state.auth.comunidades
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
      unSelSocio: () => dispatch(actions.unSelectSocio())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socios)
