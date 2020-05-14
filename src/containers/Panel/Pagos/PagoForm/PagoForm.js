import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'

import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../components/UI/Modal/Modal';
import Title from '../../../../components/UI/Title/Title';
import RenderStatus from '../../../../components/Tables/RenderStatus/RenderStatus'
import Currency from '../../../../components/UI/Formatting/Currency'
import CreditoList from '../../Creditos/CreditoList/CreditoList';
import ContratoDetail from '../../Creditos/ContratoDetail/ContratoDetail';
import classes from './PagoForm.module.css'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'
import axios from '../../../../store/axios-be.js'


class PagosForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      searchingOpen: false,
      loading: false,
      updated: false,
      pagoForm: {
        credito: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..folio del crédito'
          },
          label: (<><FormattedMessage id="credito"/>*</>),
          value: this.props.selContrato ? this.props.selContrato.id : null,
          validation: {
            required: true
          },
          valid: this.props.selContrato !== null,
          touched: this.props.selContrato !== null,
          hide: false,
          supportActions: {
            supportButton: (event) => this.onSearchCredito(event),
            loseFocus: () => this.searchByFocus(),
            suppButtLabelID: "searchCredito"
          },
          supportData: null
        },
        fecha_pago: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="pagos.fecha_pago"/>*</>),
          value: '',
          validation: {
            required: true,
            todayOrOlder: true
          },
          valid: false,
          touched: false,
          hide: false,
          supportActions: {
            supportButton: (event) => this.onSearchDeuda(event),
            suppButtLabelID: "searchDeuda"
          }
        },
        cantidad: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '9999999',
            min: '0',
            step: '.01'
          },
          label:  (<><FormattedMessage id="cantidad"/>*</>),
          value: 0,
          validation: {
            required: true,
            isDecimal: true
          },
          valid: false,
          touched: false,
          hide: false,
          supportData: 'Deuda pendiente: ',
          disabled: true
        },
        fecha_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="pagos.fecha_banco"/></>),
          value: null,
          validation: {
            required: false,
            todayOrOlder: true
          },
          valid: true,
          touched: true,
          hide: false
        },
        referencia_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="pagos.referencia_banco"/></>),
          value: null,
          validation: {
            required: false
          },
          valid: true,
          touched: true,
          hide: false
        },
        abono_capital: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '9999999',
            min: '0',
            step: '.01'
          },
          label:  (<><FormattedMessage id="pagos.abono_capital"/>*</>),
          value: 0,
          validation: {
            required: true,
            isDecimal: true
          },
          valid: true,
          touched: true,
          hide: false,
          supportData: 'Capital pendiente: '
        },
        interes_ord: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '9999999',
            min: '0',
            step: '.01'
          },
          label:  (<><FormattedMessage id="pagos.interes_ord"/>*</>),
          value: 0,
          validation: {
            required: true,
            isDecimal: true
          },
          valid: true,
          touched: true,
          hide: false,
          supportData: 'Interés ordinario pendiente: '
        },
        interes_mor: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '9999999',
            min: '0',
            step: '.01'
          },
          label:  (<><FormattedMessage id="pagos.interes_mor"/>*</>),
          value: 0,
          validation: {
            required: true,
            isDecimal: true
          },
          valid: true,
          touched: true,
          hide: false,
          supportData: 'Interés moratorio pendiente: '
        },
      }
    }
  }

  componentDidMount () {
    this.props.onInitCreditos(this.props.token)
  }

  componentWillUnmount() {
    this.props.unselContrato()
  }

  onSubmitForm = (event) => {
    event.preventDefault();

    let formData = {}
    for (let formElementIdentifier in this.state.pagoForm) {
      formData[formElementIdentifier] = this.state.pagoForm[formElementIdentifier].value
    }

    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    this.setState({
      loading: true
    })

    axios.post('/pagos/', formData, authData)
      .then(response => {
        alert('Se creó el pago ' + response.data.id + ' con éxito')
        if (response.data.estatus_nuevo === 'PA') {
          alert('¡El crédito ' + response.data.id + ' ya quedó totalmente pagado! :D')
        }
        this.setState({
          loading: false,
          updated: true
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          updated: false
        })
        alert('ALGO FALLÓ!')
      })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.pagoForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.pagoForm[inputIdentifier].validation),
        touched: true
    })

    const clearData = inputIdentifier === 'fecha_pago' ? this.clearSupportData() : null
    let updatedForm = updateObject(this.state.pagoForm, {
        [inputIdentifier]: updatedFormElement,
        ...clearData
    })

    if (inputIdentifier === "abono_capital" || inputIdentifier === "interes_ord" || inputIdentifier === "interes_mor") {
      updatedForm = this.updateCantidad(updatedForm)
    }

    this.setState({pagoForm: updatedForm, formIsValid: this.checkIfFormIsValid(updatedForm)})
  }

  checkIfFormIsValid = (form) => {
    let formIsValid = true
    for (let inputIds in form) {
        formIsValid = form[inputIds].valid && formIsValid
    }
    return formIsValid
  }

  updateCantidad = previousForm => {
    const cap = parseInt(previousForm.abono_capital.value)
    const int_ord = parseInt(previousForm.interes_ord.value)
    const int_mor = parseInt(previousForm.interes_mor.value)

    let total = 0
    if (!isNaN(cap) && !isNaN(int_ord) && !isNaN(int_mor)) {
      total = cap + int_ord + int_mor
    }

    return updateObject(previousForm, {
        cantidad: updateObject(previousForm.cantidad, {
          value: total,
          valid: total !== 0,
          touched: true,
        })
    })
  }

  onSearchCredito = (event) => {
    event.preventDefault();
    this.setState({searchingOpen: true})
  }

  cancelSearch = () => {
    this.setState({searchingOpen: false})
    this.props.unselContrato()
  }

  clearSupportData = () => {
    return {
      credito: updateObject(this.state.pagoForm.credito, {
        supportData: null
      }),
      cantidad: updateObject(this.state.pagoForm.cantidad, {
        supportData: <><FormattedMessage id="pagos.deuda_pend"/>:</>
      }),
      abono_capital: updateObject(this.state.pagoForm.abono_capital, {
        supportData:<><FormattedMessage id="pagos.cap_pend"/>:</>
      }),
      interes_ord: updateObject(this.state.pagoForm.interes_ord, {
        supportData: <><FormattedMessage id="pagos.intOrd_pend"/>:</>
      }),
      interes_mor: updateObject(this.state.pagoForm.interes_mor, {
        supportData: <><FormattedMessage id="pagos.intMor_pend"/>:</>
      })
    }
  }

  selectContrato = (id) => {
    const updatedForm = updateObject(this.state.pagoForm, {
        ...this.clearSupportData(),
        credito: updateObject(this.state.pagoForm.credito, {
            value: id,
            valid: true,
            touched: true,
            supportData: null
        }),

    })
    this.setState({
      searchingOpen: false,
      pagoForm: updatedForm
    });
    this.props.onFetchSelContrato(this.props.token, id)
    // TODO: CLEAR SUPPORT DATA
  }

  searchByFocus = () => {
    const contratoID = this.state.pagoForm.credito.value
    // TODO: validation of credito to search
    if (contratoID && !isNaN(contratoID)) {
      this.props.onFetchSelContrato(this.props.token, contratoID)
      const updatedForm = updateObject(this.state.pagoForm, {
          ...this.clearSupportData()
      })
      this.setState({
        pagoForm: updatedForm
      });
    }
  }

  onSearchDeuda = event => {
    event.preventDefault();
    const contratoID = this.state.pagoForm.credito.value
    const fecha_pago = this.state.pagoForm.fecha_pago.value
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    if (contratoID && !isNaN(contratoID) && isNaN(fecha_pago) && !isNaN(Date.parse(fecha_pago))) {
      axios.get('/contratos/'+contratoID+'/deuda/?fecha='+fecha_pago, authData)
        .then(response => {

          if ('total_deuda' in response.data) {
            console.log('TENEMOS DEUDA')
            console.log(response.data)

            const updatedForm = updateObject(this.state.pagoForm, {
              credito: updateObject(this.state.pagoForm.credito, {
                supportData: <RenderStatus value={response.data.estatus_detail} idLabel={"creditos.status."}/>
              }),
              cantidad: updateObject(this.state.pagoForm.cantidad, {
                supportData: <><FormattedMessage id="pagos.deuda_pend"/>: <strong><Currency value={response.data.total_deuda}/> </strong></>
              }),
              abono_capital: updateObject(this.state.pagoForm.abono_capital, {
                supportData:<><FormattedMessage id="pagos.cap_pend"/>: <strong><Currency value={response.data.capital_por_pagar}/> </strong></>
              }),
              interes_ord: updateObject(this.state.pagoForm.interes_ord, {
                supportData: <><FormattedMessage id="pagos.intOrd_pend"/>: <strong><Currency value={response.data.interes_ordinario_deuda}/> </strong></>
              }),
              interes_mor: updateObject(this.state.pagoForm.interes_mor, {
                supportData: <><FormattedMessage id="pagos.intMor_pend"/>: <strong><Currency value={response.data.interes_moratorio_deuda}/> </strong></>
              })
            })
            this.setState({pagoForm: updatedForm})
          }
        })
        .catch(error => {
          alert('ALGO FALLÓ!')
        })
    } else {
      alert ('Incluye crédito y fecha válida para buscar datos de deuda')
    }
  }


  render () {
    const pagoFormOrder = ["credito", "fecha_pago", "abono_capital", "interes_ord", "interes_mor",  "cantidad", "fecha_banco", "referencia_banco"]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let creditosBusqueda = <Spinner/>
    let formElements = <Spinner/>
    let creditDetail = null

    pagoFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.pagoForm[key]
      })
    })

    if (!this.state.loading) {
      formElements = formElementsArray.map(formElement => {
          return (
            <div
              key= {formElement.id}
              >
              <div className={classes.Inputs}>
                <Input
                  label={formElement.config.label}
                  key= {formElement.id}
                  elementType={formElement.config.elementType }
                  elementConfig={formElement.config.elementConfig }
                  value={formElement.config.value}
                  shouldValidate={formElement.config.validation}
                  invalid={!formElement.config.valid}
                  touched={formElement.config.touched}
                  disabled={this.props.loading || formElement.config.disabled}
                  hide={formElement.config.hide}
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  supportData={formElement.config.supportData}
                  supportActions={formElement.config.supportActions}
                  />
              </div>
            </div>
              )
      })
    }

    formClasses.push(classes.noScroll)

    const updatedRedirect = (this.state.updated) ? <Redirect to="/pagos"/> : null

    if (this.state.searchingOpen && this.props.listaCreditos) {
      creditosBusqueda = (
        <CreditoList
          data={this.props.listaCreditos}
          onClick={(row) => this.selectContrato(row.values.id)}
          />
      )
    }

    if (this.props.selContrato) {
      creditDetail = (<ContratoDetail contrato={this.props.selContrato}/>)
    }

    return (
      <>
        <Modal
          show={this.state.searchingOpen}
          modalClosed={this.cancelSearch}>
          <h3><FormattedMessage id="pagos.elige"/></h3>
          <div
            className={classes.TableContainer}>
            {creditosBusqueda}
          </div>
        </Modal>
        <Title
          titleName="pagoForm.title"/>
        <form onSubmit={this.onSubmitForm}>
          <div className={formClasses.join(' ')}>
          {formElements}
          </div>
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}>
            <FormattedMessage id="saveButton"/>
          </Button>
          {updatedRedirect}
        </form>
        {creditDetail}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    listaCreditos: state.creditos.creditos,
    selContrato: state.creditos.selectedContrato,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitCreditos: (token) => dispatch(actions.initCreditos(token)),
      onFetchSelContrato: (token, id) => dispatch(actions.fetchSelContrato(token, id)),
      unselContrato: () => dispatch(actions.unSelectContrato())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PagosForm, axios))
