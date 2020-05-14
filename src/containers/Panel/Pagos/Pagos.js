import React, { Component } from 'react';
import FileSaver from 'file-saver';
import { FormattedMessage } from 'react-intl';
// import FileSaver from 'file-saver';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Modal from '../../../components/UI/Modal/Modal';
import TextElement from '../../../components/UI/TextElement/TextElement';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import PagosList from './PagosList/PagosList';
import Title from '../../../components/UI/Title/Title';
import classes from './Pagos.module.css'
import * as actions from '../../../store/actions'
import axios from '../../../store/axios-be.js'

class Pagos extends Component {
  state = {
    showPagoModal: false,
    editPago: false
  }

  componentDidMount () {
    this.props.onInitPagos(this.props.token)
  }

  componentWillUnmount () {
    if (!this.state.editPago) {
      this.props.unSelPago()
    }
  }

  getXLSX = type => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` },
      responseType: 'blob',
    }

    axios.get('/pagosXLSX/', authData)
      .then(response => {
        FileSaver.saveAs(response.data, 'pagos.xlsx')
      })
      .catch(error => {
        // TODO:
      })
  }

  showPago = id => {
    this.setState({
      showPagoModal: true,
    })

    this.props.onFetchSelPago(this.props.token, id)
  }

  cancelSelected =() => {
    this.setState({
      showPagoModal: false,
    });
    this.props.unSelPago()
  }

  newPago = () => {
    this.props.unSelContrato()
    this.props.history.push('/pago-formato')
  }

  render () {

    let pago = <Spinner/>
    if (this.props.selPago) {
      const items = ["id", "credito", "fecha_pago", "cantidad", "fecha_banco", "referencia_banco",
                     "autor", "interes_ord", "interes_mor", "abono_capital", "estatus_previo",
                    "deuda_prev_total", "deuda_prev_int_ord", "deuda_prev_int_mor"]
      pago = items.map(id => {
        return (<TextElement
                  label={"pagos."+id}
                  content={this.props.selPago[id]}
                  isNum={id === "cantidad" || id === "interes_ord" || id === "interes_mor" || id === "abono_capital" || id === "deuda_prev_total" || id === "deuda_prev_int_ord" || id === "deuda_prev_int_mor" }
                  />)
      })
    }

    if (this.state.editPago) {
      this.props.history.push('/pago-formato')
    }

    let editPaymentButton = null
    if (this.props.selPago && this.props.selPago.fecha_banco === null) {
      editPaymentButton = (<Button
                             clicked={() => this.setState({editPago: true})}
                           >
                             <FormattedMessage id="pagoForm.editBankInfo"/>
                           </Button>)
    }

    return (
      <>
        <Modal
          show={this.state.showPagoModal}
          modalClosed={this.cancelSelected}>
          <div className={classes.Container}>
            <div className={classes.SubTitle}>
              <h3>
                <FormattedMessage id={"pagos.selectedPago"}/> #{this.props.selPago ? this.props.selPago.id : ''}
              </h3>
              {editPaymentButton}
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
            <div className={classes.XLSButton}>
              <button onClick={this.getXLSX}>
                <FormattedMessage id="pagosXLSX"/>
              </button>
            </div>
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
      selPago: state.pagos.selectedPago,
      token: state.auth.token,
      role: state.generalData.role,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitPagos: (token) => dispatch(actions.initPagos(token)),
      unSelContrato: () => dispatch(actions.unSelectContrato()),
      onFetchSelPago: (token, pagoId) => dispatch(actions.fetchSelPago(token, pagoId)),
      unSelPago: () => dispatch(actions.unSelectPago())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Pagos, axios)))
