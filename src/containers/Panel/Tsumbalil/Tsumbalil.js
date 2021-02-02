import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import classes from './Tsumbalil.module.scss';
import ComunidadList from './ComunidadList/ComunidadList';
import ErmitasList from './ErmitasList/ErmitasList';
import ComunidadForm from './ComunidadForm/ComunidadForm';
import ErmitaDetail from './ErmitaDetail/ErmitaDetail';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Card from '../../../components/UI/Card/Card';
import Title from '../../../components/UI/Title/Title';
import axios from '../../../store/axios-be.js';
import * as actions from '../../../store/actions';
import { isGerencia } from '../../../store/roles';


class Tsumbalil extends Component {
  state = {
    itemSelected: false,
    ermitaSelected: null
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.fetchGralData(this.props.token)
    }
  }

  showComunidad = id => {
    if (isGerencia(this.props.role)) {
      this.setState({itemSelected: true});
      this.props.selectComunidad(id)
    }
  }

  showErmita = id => {
    this.setState({itemSelected: true});
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    axios.get(`/ermitas/${id}.json`, authData)
      .then(response => {
        this.setState({ermitaSelected: response.data})
      })
      .catch(error => {
        // TODO:
      })
  }

  cancelSelected = () => {
    this.setState({
      itemSelected: false,
      ermitaSelected: false
    });
    this.props.unSelComunidad()
  }

  onNewComunidad = () => {
    this.setState({ itemSelected: true});
    this.props.onNewComunidad()
  }

  render() {
    let modalContent = <Spinner/>
    if (this.state.itemSelected && this.props.selComunidad) {
      modalContent = <ComunidadForm />
    } else if (this.state.itemSelected && this.state.ermitaSelected) {
      modalContent = (
        <div className={classes.Container}>
          <div className={classes.SubTitle}>
            <h3>
              {this.state.ermitaSelected ? this.state.ermitaSelected.nombre : ''}
            </h3>
          </div>
          <div className={classes.ContentContainer}>
            <ErmitaDetail ermita={this.state.ermitaSelected}/>
          </div>
        </div>
      )


    }

    const newComunidadButton = isGerencia(this.props.role)
      ? (
          <Button clicked={this.onNewComunidad}>
            <FormattedMessage id="tsumbalil.newComunidad"/>
          </Button>
        )
      : null

    const comunidadTable = this.props.comunidades
      ? (
          <ComunidadList
            data={this.props.comunidades}
            onClick={row => this.showComunidad(row.values.id)}
          />
        )
      : <Spinner/>

    const ermitaTable = this.props.ermitas
      ? (
          <ErmitasList
            data={this.props.ermitas}
            onClick={row => this.showErmita(row.values.ermita_id)}
          />
        )
      : <Spinner/>

    return (
      <>
        <Modal
          show={this.state.itemSelected}
          modalClosed={this.cancelSelected}
        >
          {modalContent}
        </Modal>
        <Title titleName="tsumbalil.title">
          {newComunidadButton}
        </Title>
        <Card table title={"tsumbalil.comunidades"}>
          {comunidadTable}
        </Card>
        <Card table title={"tsumbalil.ermitas"}>
          {ermitaTable}
        </Card>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    comunidades: state.generalData.comunidades,
    ermitas: state.generalData.ermitas,
    updated: state.generalData.updated,
    selComunidad: state.generalData.selectedComunidad,
    token: state.auth.token,
    role: state.auth.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectComunidad: (id) => dispatch(actions.selectComunidad(id)),
    unSelComunidad: () => dispatch(actions.unSelectComunidad()),
    fetchGralData: (token) => dispatch(actions.fetchGralData(token)),
    onNewComunidad: () => dispatch(actions.newComunidad()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tsumbalil)
