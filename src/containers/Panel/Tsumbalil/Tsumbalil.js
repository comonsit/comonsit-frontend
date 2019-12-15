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
    comunidadSelected: false
  }

  showComunidad =(id) => {
    this.setState({comunidadSelected: true});
  }

  cancelSelected =() => {
    this.setState({ comunidadSelected: false});
  }

  onNewSocio = () => {
    this.setState({socioSeleccionado: true});
  }

  getComunidad = (id) => {
    const index = this.props.comunidades.findIndex(x => x.id === id)
    return this.props.comunidades[index].nombre_de_comunidad
  }

  render () {
    const comunidadHeaders = ["tsumbalil.nombre_de_comunidad", "tsumbalil.nombre_region"]
    let comunidadData
    if (this.props.comunidades) {
      console.log(this.props.comunidades);
      comunidadData = this.props.comunidades.map((c, i) => {
        return {
          "tsumbalil.nombre_de_comunidad": c.nombre_de_comunidad,
          "tsumbalil.nombre_region": c.nombre_region
        }
      })
    }

    return (
      <>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1><FormattedMessage id="tsumbalil.title"/></h1>
            <div className={classes.ButtonContainer}>
              <Button
                clicked={this.onNewComunidad}
                ><FormattedMessage id="tsumbalil.newComunidad"/></Button>
            </div>
          </div>
          <Table
            headers={comunidadHeaders}
            data={comunidadData}
            clicked={this.showComunidad}
            clickId={"comunidad.id"}
            useKey={"comunidad.id"}
            />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      comunidades: state.generalData.comunidades
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tsumbalil)
