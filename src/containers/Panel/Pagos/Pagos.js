import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
// import FileSaver from 'file-saver';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Modal from '../../../components/UI/Modal/Modal';
import TextElement from '../../../components/UI/TextElement/TextElement';
// import HoverButton from '../../../components/UI/HoverButton/HoverButton';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import PagosList from './PagosList/PagosList';
// import SwitchToggle from '../../../components/UI/SwitchToggle/SwitchToggle'
import Title from '../../../components/UI/Title/Title';
import classes from './Pagos.module.css'
import * as actions from '../../../store/actions'
// import { isGerencia } from '../../../store/roles'
import axios from '../../../store/axios-be.js'

class Pagos extends Component {
  state = {
    showPagoModal: false,
    selectedPago: null
  }

  componentDidMount () {
    this.props.onInitPagos(this.props.token)
    // to cleanup previous selections
  }

  // getXLSX = type => {
  //   const authData = {
  //     headers: { 'Authorization': `Bearer ${this.props.token}` },
  //     responseType: 'blob',
  //   }
  //
  //   axios.get('/pagosXLSX/' + query, authData)
  //     .then(response => {
  //       FileSaver.saveAs(response.data, 'pagos.xlsx')
  //     })
  //     .catch(error => {
  //       // TODO:
  //     })
  // }

  showPago = id => {
    this.setState({
      showPagoModal: true,
    })

    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    // TODO: move to PAGOS reducer!!
    axios.get('/pagos/' + id + '.json', authData)
      .then(response => {
        this.setState({
          selectedPago: response.data
        });
      })
      .catch(error => {
        // alert('ALGO FALLÓ!')
      })
  }

  cancelSelected =() => {
    this.setState({
      showPagoModal: false,
      selectedPago: null
    });
  }

  newPago = () => {
    this.props.unSelContrato()
    this.props.history.push('/pago-formato')
  }

  render () {
    // let downloadXLSButton = null
    //
    // // RENDER XLS DOWNLOAD BUTTON
    // if (isGerencia(this.props.role)) {
    //   const processList = ['ALL', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    //   const oldCreditsMessId = this.state.oldCreditos ? 'creditos.allCreditsTrue' : 'creditos.allCreditsFalse'
    //   downloadXLSButton = (
    //     <div>
    //       <div className={classes.XLSContainer}>
    //         <HoverButton title="contratosXLSX" items={processList} clicked={this.getXLSX}/>
    //         <SwitchToggle clicked={() => this.setState(({oldCreditos: !this.state.oldCreditos}))}/>
    //         <p><FormattedMessage id={oldCreditsMessId}/></p>
    //       </div>
    //     </div>)
    // }

    // RENDER ACTIONS
    let pago = <Spinner/>
    if (this.state.selectedPago) {
      const items = ["id", "credito", "fecha_pago", "cantidad", "fecha_banco", "referencia_banco",
                     "autor", "interes_ord", "interes_mor", "abono_capital", "estatus_actual",
                    "deuda_prev_total", "deuda_prev_int_ord", "deuda_prev_int_mor"]
      pago = items.map(id => {
        return (<TextElement
                  label={"pagos."+id}
                  content={this.state.selectedPago[id]}
                  isNum={id === "cantidad" || id === "interes_ord" || id === "interes_mor" || id === "abono_capital" || id === "deuda_prev_total" || id === "deuda_prev_int_ord" || id === "deuda_prev_int_mor" }
                  />)
      })
    }

    return (
      <>
        <Modal
          show={this.state.showPagoModal}
          modalClosed={this.cancelSelected}>
          <div className={classes.Container}>
            <div className={classes.SubTitle}>
              <h3>
                <FormattedMessage id={"pagos.selectedPago"}/> #{this.state.selectedPago ? this.state.selectedPago.id : ''}
              </h3>
            </div>
            <div className={classes.ContentContainer}>
            {pago}
            </div>
          </div>
        </Modal>
        <div className={classes.Container}>
          <Title
            titleName="pagos.title">
              <Button
                clicked={this.newPago}
              >
                <FormattedMessage id="pagoForm.title"/>
              </Button>
          </Title>
          <div className={classes.Table}>
            <PagosList
              data={this.props.listaPagos}
              onClick={(row) => this.showPago(row.values.id)}
            />
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      listaPagos: state.pagos.pagos,
      token: state.auth.token,
      role: state.generalData.role,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitPagos: (token) => dispatch(actions.initPagos(token)),
      unSelContrato: () => dispatch(actions.unSelectContrato())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Pagos, axios)))
