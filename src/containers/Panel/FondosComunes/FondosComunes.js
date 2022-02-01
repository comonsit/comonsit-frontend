import React, { Component } from 'react';
// import FileSaver from 'file-saver';
// import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './FondosComunes.module.scss'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
// import Modal from '../../../components/UI/Modal/Modal';
import HoverButton from '../../../components/UI/HoverButton/HoverButton';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Card from '../../../components/UI/Card/Card';
// import SwitchToggle from '../../../components/UI/SwitchToggle/SwitchToggle'
import Title from '../../../components/UI/Title/Title';
// import * as actions from '../../../store/actions'
import { isGerencia } from '../../../store/roles'
import axios from '../../../store/axios-be.js'

class FondosComunes extends Component {

  // componentDidMount() {
  //   this.props.onInitFondosComunes(this.props.token, this.state.oldFondosComunes)
  //   // to cleanup previous selections
  //   this.props.unSelContrato()
  // }

  // getXLSX = type => {
  //   let query = '?'
  //   let name, nameFilt
  //   if (this.state.oldFondosComunes) {
  //     query += '&all=true'
  //     nameFilt = '_todos'
  //   } else {
  //     query += ''
  //     nameFilt = '_conDeuda'
  //   }

  //   if (type === 'ALL') {
  //     query += ''
  //     name = ''
  //   } else {
  //     query += '&region='+type
  //     name = '_region_'+type
  //   }
  //   const authData = {
  //     headers: { 'Authorization': `Bearer ${this.props.token}` },
  //     responseType: 'blob',
  //   }

  //   axios.get('/contratosXLSX/' + query, authData)
  //     .then(response => {
  //       FileSaver.saveAs(response.data, 'contratos'+name+nameFilt+'.xlsx')
  //     })
  //     .catch(error => {
  //       // TODO:
  //     })
  // }

  // showContrato = id => {
  //   this.setState({
  //     showContratoModal: true,
  //   })
  //   this.props.onFetchSelContrato(this.props.token, id)

  //   const authData = {
  //     headers: { 'Authorization': `Bearer ${this.props.token}` }
  //   }

  //   // TODO: move to PAGOS reducer!!
  //   axios.get('/contratos/' + id + '/pagos/', authData)
  //     .then(response => {
  //       this.setState({
  //         selectedContratoPagos: response.data
  //       });
  //     })
  //     .catch(error => {
  //       // alert('ALGO FALLÓ!')
  //     })
  // }

  // cancelSelected = () => {
  //   this.setState({
  //     showContratoModal: false,
  //     selectedContratoPagos: null
  //   });
  //   this.props.unSelContrato()
  // }


  render() {
    // let actions = <Spinner/>
    let downloadXLSButton = null

    // RENDER XLS DOWNLOAD BUTTON
    if (isGerencia(this.props.role)) {
      const processList = ['ALL', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      downloadXLSButton = (
        <div>
          <div className={classes.XLSContainer}>
            <HoverButton title="fondosXLSX" items={processList} clicked={this.getXLSX}/>
          </div>
        </div>
      )
    }

    // // RENDER ACTIONS
    // if (this.props.selContrato && this.state.selectedContratoPagos) {
    //   actions = (
    //     <ContratoActions
    //       selContrato={this.props.selContrato}
    //       pagos={this.state.selectedContratoPagos}
    //       role={this.props.role}
    //     />
    //   )
    // }

    return (
      <>
        {/* <Modal
          show={this.state.showContratoModal}
          modalClosed={this.cancelSelected}>
          {actions}
        </Modal> */}
        <Title
          titleName="FondosComunes.title">
        </Title>
        <Card table>
          {downloadXLSButton}
          {/* <CreditoList
            data={this.props.listaFondosComunes}
            onClick={(row) => this.showContrato(row.values.id)}
          /> */}
        </Card>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    // listaFondosComunes: state.FondosComunes.FondosComunes,
    // selContrato: state.FondosComunes.selectedContrato,
    token: state.auth.token,
    role: state.auth.role,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onInitFondosComunes: (token, all) => dispatch(actions.initFondosComunes(token, all)),
    // onFetchSelContrato: (token, id) => dispatch(actions.fetchSelContrato(token, id)),
    // unSelContrato: () => dispatch(actions.unSelectContrato())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FondosComunes, axios)))
