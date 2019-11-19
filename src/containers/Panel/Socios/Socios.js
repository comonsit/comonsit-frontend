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
        <h3>{i}-{s.nombre_de_comunidad}-{s.nombre_region}</h3>
      ))
    }
    return (
      <div className={classes.AccesoContainer}>
        <div className={classes.Acceso}>
          <h1>BIENVENIDOS</h1>
          {tmp}
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
