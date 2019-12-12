import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Table from '../../../components/UI/Table/Table';
import Button from '../../../components/UI/Button/Button';
import classes from './Tsumbalil.module.css'
import * as actions from '../../../store/actions'

class Tsumbalil extends Component {
  state = {
  }

  getComunidad = (id) => {
    const index = this.props.comunidades.findIndex(x => x.id === id)
    return this.props.comunidades[index].nombre_de_comunidad
  }

  render () {


    return (
      <>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1><FormattedMessage id="tsumbalil.title"/></h1>
            <div className={classes.ButtonContainer}>
            </div>
          </div>

        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      comunidades: state.auth.comunidades
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tsumbalil)
