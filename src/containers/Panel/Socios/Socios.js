import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../../../components/UI/Modal/Modal';
import classes from './Socios.module.css'
import * as actions from '../../../store/actions'

class Socios extends Component {
  state = {
    socioSeleccionado: false
  }

  componentDidMount () {
    this.props.onInitSocios(this.props.token)
  }

  fetchDetails =(id) => {
    console.log('ME PICARON'+id);
    this.setState({socioSeleccionado: true});
    this.props.onFetchSelSocios(this.props.token, id)
  }

  cancelSelected =() => {
    this.setState({ socioSeleccionado: false});
  }

  getStatusColor(status)  {
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
    let tmp, selectedSocio
    if (this.props.regiones) {
      console.log(this.props.regiones)
      tmp = this.props.regiones.map((s, i) => (
        <tr
          id={s.clave_socio + i}
          onClick={() => this.fetchDetails(s.clave_socio)}>
          <td>{s.clave_socio}</td>
          <td>{s.nombres} {s.apellidos}</td>
          <td>{s.comunidad.nombre_region}</td>
          <td>{s.comunidad.nombre_de_comunidad}</td>
          <td>{s.fecha_ingr_yomol_atel}</td>
          <td>{this.getStatusColor(s.estatus_cafe)}</td>
          <td>{this.getStatusColor(s.estatus_miel)}</td>
          <td>{this.getStatusColor(s.estatus_yip)}</td>
          <td>{this.getStatusColor(s.estatus_gral)}</td>
        </tr>
      ))
    }
    selectedSocio = <div> NO HAY SOCIO </div>
    if (this.props.selSocio) {
      selectedSocio = (
        <div>
          <h3>{this.props.selSocio.nombres} {this.props.selSocio.apellidos}</h3>
          <p>{this.props.selSocio.prod_trab}</p>
        </div>
      )
    }
    return (
      <>
        <Modal
          show={this.state.socioSeleccionado}
          modalClosed={this.cancelSelected}>
          {selectedSocio}
        </Modal>
        <div className={classes.Container}>
          <h1>Socios</h1>
          <table className={classes.TablaSocios}>
          <tr>
            <th>Clave</th>
            <th>Nombre</th>
            <th>Región</th>
            <th>Comunidad</th>
            <th>Ingreso YA</th>
            <th>Café</th>
            <th>Miel</th>
            <th>Xapon</th>
            <th>Trabajador</th>
          </tr>
          <tbody>
            {tmp}
          </tbody>
          </table>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      regiones: state.socios.socios,
      selSocio: state.socios.selectedSocio,
      token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socios)
