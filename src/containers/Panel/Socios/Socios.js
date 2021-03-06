import React, { Component} from 'react';
import FileSaver from 'file-saver';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

// import classes from './Socios.module.scss';
import SociosForm from './SociosForm/SociosForm';
import SociosList from './SociosList/SociosList';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Card from '../../../components/UI/Card/Card';
import XLSButton from '../../../components/UI/XLSButton/XLSButton';
import Title from '../../../components/UI/Title/Title';
import * as actions from '../../../store/actions';
import { isGerencia } from '../../../store/roles';
import axios from '../../../store/axios-be.js';



class Socios extends Component {
  state = {
    socioSeleccionado: false
  }

  componentDidMount() {
    this.props.onInitSocios(this.props.token)
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated && this.props.updated !== prevProps.updated) {
      this.props.onInitSocios(this.props.token)
      this.setState({ socioSeleccionado: false});
    }
  }

  showSocio = id => {
    this.setState({socioSeleccionado: true});
    this.props.onFetchSelSocios(this.props.token, id)
  }

  cancelSelected = () => {
    this.setState({ socioSeleccionado: false});
    this.props.unSelSocio()
  }

  onNewSocio = () => {
    this.setState({socioSeleccionado: true});
    this.props.onNewSocios()
  }

  getXLSX = () => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` },
      responseType: 'blob',
    }
    axios.get('/sociosXLSX/', authData)
      .then(response => {
        FileSaver.saveAs(response.data, 'socios.xlsx')
      })
      .catch(error => {
        // TODO:
      })
  }

  getComunidad = id => {
    const index = this.props.comunidades.findIndex(x => x.id === id)
    return this.props.comunidades[index].nombre_de_comunidad
  }

  render() {
    let newSocioButton = null
    let form, socioList = <Spinner/>
    if (this.state.socioSeleccionado && this.props.selSocio) {
      form = <SociosForm/>
    }

    if (this.props.listaSocios) {
      socioList = (
        <SociosList
          listaSocios={this.props.listaSocios}
          onClick={row => this.showSocio(row.values.clave_socio)}
        />
      )
    }

    if (isGerencia(this.props.role)) {
      newSocioButton = (
        <Button clicked={this.onNewSocio}>
          <FormattedMessage id="socios.newSocioButton"/>
        </Button>
      )
    }


    return (
      <>
        <Modal
          show={this.state.socioSeleccionado}
          modalClosed={this.cancelSelected}>
          {form}
        </Modal>
        <Title titleName="socios.title">
          {newSocioButton}
        </Title>
        <Card table>
          <XLSButton
            clicked={this.getXLSX}
            labelID={"sociosXLSX"}
          />
          {socioList}
        </Card>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    listaSocios: state.socios.socios,
    selSocio: state.socios.selectedSocio,
    updated: state.socios.updated,
    token: state.auth.token,
    comunidades: state.generalData.comunidades,
    role: state.auth.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitSocios: (token) => dispatch(actions.initSocios(token)),
    onNewSocios: () => dispatch(actions.newSocio()),
    onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
    unSelSocio: () => dispatch(actions.unSelectSocio())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socios)
