import React, { Component } from 'react'
// import { connect } from 'react-redux'

import classes from './Socios.module.css'
// import * as actions from '../../../store/actions'

class Socios extends Component {
    state = {}

    render () {
        return (
            <div className={classes.AccesoContainer}>
              <div className={classes.Acceso}>
                <h1>BIENVENIDOS</h1>
              </div>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//     }
// }

export default Socios
