import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

import ComunidadForm from './ComunidadForm/ComunidadForm';
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

  componentDidMount () {
    this.props.fetchGralData(this.props.token)
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.fetchGralData(this.props.token)
    }
  }

  showComunidad =(id) => {
    this.setState({comunidadSelected: true});
    this.props.selectComunidad(id)
  }

  cancelSelected =() => {
    this.setState({ comunidadSelected: false});
    this.props.unSelComunidad()
  }

  onNewSocio = () => {
    this.setState({socioSeleccionado: true});
  }

  render () {
    const comunidadHeaders = ["tsumbalil.id", "tsumbalil.nombre_de_comunidad", "tsumbalil.nombre_region"]
    let comunidadData
    let form = <Spinner/>
    if (this.props.comunidades) {
      comunidadData = this.props.comunidades.map((c, i) => {
        return {
          "tsumbalil.id": c.id,
          "tsumbalil.nombre_de_comunidad": c.nombre_de_comunidad,
          "tsumbalil.nombre_region": c.nombre_region
        }
      })
    }

    if (this.state.comunidadSelected && this.props.selComunidad) {
      form = (
        <ComunidadForm/>
      )
    }

    return (
      <>
        <Modal
          show={this.state.comunidadSelected}
          modalClosed={this.cancelSelected}>
          {form}
        </Modal>
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
            clickId={"tsumbalil.id"}
            useKey={"tsumbalil.id"}
            />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      comunidades: state.generalData.comunidades,
      updated: state.generalData.updated,
      selComunidad: state.generalData.selectedComunidad,
      token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      selectComunidad: (id) => dispatch(actions.selectComunidad(id)),
      unSelComunidad: () => dispatch(actions.unSelectComunidad()),
      fetchGralData: (token) => dispatch(actions.fetchGralData(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tsumbalil)
