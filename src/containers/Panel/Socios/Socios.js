import React, { Component } from 'react'
import { connect } from 'react-redux'

import SociosForm from './SociosForm/SociosForm';
import Modal from '../../../components/UI/Modal/Modal';
import classes from './Socios.module.css'
import * as actions from '../../../store/actions'

class Socios extends Component {
  state = {
    socioSeleccionado: false,
  }

  componentDidMount () {
    this.props.onInitSocios(this.props.token)
  }

  showSocio =(id) => {
    this.setState({socioSeleccionado: true});
    this.props.onFetchSelSocios(this.props.token, id)
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
    let socioData = <div>**** UN SPINNER ****</div>
    let form = <div>**** UN SPINNER ****</div>

    // MAKE SOCIO LIST
    if (this.props.listaSocios) {
      console.log(this.props.listaSocios)
      socioData = this.props.listaSocios.map((s, i) => (
        <tr
          id={s.clave_socio + i}
          onClick={() => this.showSocio(s.clave_socio)}>
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
            {socioData}
          </tbody>
          </table>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      listaSocios: state.socios.socios,
      selSocio: state.socios.selectedSocio,
      token: state.auth.token
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
