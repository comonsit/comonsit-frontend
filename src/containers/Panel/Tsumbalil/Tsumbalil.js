import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// import classes from './Tsumbalil.module.scss';
import ComunidadList from './ComunidadList/ComunidadList';
import ErmitasList from './ErmitasList/ErmitasList';
import ComunidadForm from './ComunidadForm/ComunidadForm';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Card from '../../../components/UI/Card/Card';
import Title from '../../../components/UI/Title/Title';
import * as actions from '../../../store/actions';
import { isGerencia } from '../../../store/roles';


class Tsumbalil extends Component {
  state = {
    comunidadSelected: false
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.fetchGralData(this.props.token)
    }
  }

  showComunidad = id => {
    if (isGerencia(this.props.role)) {
      this.setState({comunidadSelected: true});
      this.props.selectComunidad(id)
    }
  }

  cancelSelected = () => {
    this.setState({comunidadSelected: false});
    this.props.unSelComunidad()
  }

  onNewComunidad = () => {
    this.setState({ comunidadSelected: true});
    this.props.onNewComunidad()
  }

  render() {
    let form = (this.state.comunidadSelected && this.props.selComunidad)
      ? <ComunidadForm />
      : <Spinner/>

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
            onClick={() => {}}
          />
        )
      : <Spinner/>

    return (
      <>
        <Modal
          show={this.state.comunidadSelected}
          modalClosed={this.cancelSelected}
        >
          {form}
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
