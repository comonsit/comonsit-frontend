import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './Socios.module.css'
import * as actions from '../../../store/actions'

class Socios extends Component {
  state = {}

  componentDidMount () {
    this.props.onInitSocios(this.props.token)
  }

  render () {
    let tmp
    if (this.props.regiones) {
      console.log(this.props.regiones)
      tmp = this.props.regiones.map((s, i) => (
        <tr>
          <td>{s.clave_socio}</td>
          <td>{s.nombres}</td>
          <td>{s.apellidos}</td>
          <td>{s.comunidad.nombre_region}</td>
          <td>{s.comunidad.nombre_de_comunidad}</td>
          <td>{s.fecha_ingr_yomol_atel}</td>
          <td>C</td>
          <td>M</td>
          <td>X</td>
          <td>T</td>
        </tr>
      ))
    }
    return (
      <div className={classes.AccesoContainer}>
        <div className={classes.Acceso}>
          <h1>BIENVENIDOS</h1>
          <table className={classes.TablaSocios}>
          <tr>
            <th>Clave</th>
            <th>Nombre</th>
            <th>Apellidos</th>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      regiones: state.socios.socios,
      token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socios)
