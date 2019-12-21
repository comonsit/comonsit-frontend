import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import classes from './Perfil.module.css'
// import { connect } from 'react-redux';


class Perfil extends Component {


  render () {
    return (
      <>
      <div className={classes.Container}>
        <div className={classes.HeaderContainer}>
          <h1><FormattedMessage id="perfil.title"/></h1>
        </div>
      </div>
      </>
    )
  }
}


export default Perfil
