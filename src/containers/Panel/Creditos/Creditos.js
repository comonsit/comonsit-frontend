import React, { Component } from 'react';
import FileSaver from 'file-saver';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Creditos.module.scss'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import ContratoActions from './ContratoActions/ContratoActions';
import Modal from '../../../components/UI/Modal/Modal';
import HoverButton from '../../../components/UI/HoverButton/HoverButton';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Card from '../../../components/UI/Card/Card';
import CreditoList from './CreditoList/CreditoList';
import SwitchToggle from '../../../components/UI/SwitchToggle/SwitchToggle'
import Title from '../../../components/UI/Title/Title';
import * as actions from '../../../store/actions'
import { isGerencia } from '../../../store/roles'
import axios from '../../../store/axios-be.js'

class Creditos extends Component {
  state = {
    showContratoModal: false,
    oldCreditos: false,
    selectedContratoPagos: null
  }

  componentDidMount() {
    this.props.onInitCreditos(this.props.token, this.state.oldCreditos)
    // to cleanup previous selections
    this.props.unSelContrato()
  }

  getXLSX = type => {
    let query, name, nameFilt
    if (this.state.oldCreditos) {
      query = '?all=true'
      nameFilt = '_todos'
    } else {
      query = ''
      nameFilt = '_conDeuda'
    }

    if (type === 'ALL') {
      query = query + ''
      name = ''
    } else {
      query = query +'&?region='+type
      name = '_region_'+type
    }
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` },
      responseType: 'blob',
    }

    axios.get('/contratosXLSX/' + query, authData)
      .then(response => {
        FileSaver.saveAs(response.data, 'contratos'+name+nameFilt+'.xlsx')
      })
      .catch(error => {
        // TODO:
      })
  }

  showContrato = id => {
    this.setState({
      showContratoModal: true,
    })
    this.props.onFetchSelContrato(this.props.token, id)

    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    // TODO: move to PAGOS reducer!!
    axios.get('/contratos/' + id + '/pagos/', authData)
      .then(response => {
        this.setState({
          selectedContratoPagos: response.data
        });
      })
      .catch(error => {
        // alert('ALGO FALLÓ!')
      })
  }

  cancelSelected = () => {
    this.setState({
      showContratoModal: false,
      selectedContratoPagos: null
    });
    this.props.unSelContrato()
  }

  onToggleFilter = () => {
    this.props.onInitCreditos(this.props.token, !this.state.oldCreditos)
    this.setState(({oldCreditos: !this.state.oldCreditos}))
  }

  render() {
    let actions = <Spinner/>
    let downloadXLSButton = null

    // RENDER XLS DOWNLOAD BUTTON
    if (isGerencia(this.props.role)) {
      const processList = ['ALL', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      const oldCreditsMessId = this.state.oldCreditos
        ? 'creditos.allCreditsTrue'
        : 'creditos.allCreditsFalse'
      downloadXLSButton = (
        <div>
          <div className={classes.XLSContainer}>
            <HoverButton title="contratosXLSX" items={processList} clicked={this.getXLSX}/>
            <SwitchToggle clicked={this.onToggleFilter}/>
            <p><FormattedMessage id={oldCreditsMessId}/></p>
          </div>
        </div>
      )
    }

    // RENDER ACTIONS
    if (this.props.selContrato && this.state.selectedContratoPagos) {
      actions = (
        <ContratoActions
          selContrato={this.props.selContrato}
          pagos={this.state.selectedContratoPagos}
          role={this.props.role}
        />
      )
    }

    return (
      <>
        <Modal
          show={this.state.showContratoModal}
          modalClosed={this.cancelSelected}>
          {actions}
        </Modal>
        <Title
          titleName="creditos.title">
        </Title>
        <Card table>
          {downloadXLSButton}
          <CreditoList
            data={this.props.listaCreditos}
            onClick={(row) => this.showContrato(row.values.id)}
          />
        </Card>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    listaCreditos: state.creditos.creditos,
    selContrato: state.creditos.selectedContrato,
    token: state.auth.token,
    role: state.auth.role,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitCreditos: (token, all) => dispatch(actions.initCreditos(token, all)),
    onFetchSelContrato: (token, id) => dispatch(actions.fetchSelContrato(token, id)),
    unSelContrato: () => dispatch(actions.unSelectContrato())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Creditos, axios)))
