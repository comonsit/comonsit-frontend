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
import CreditoList from '../../Creditos/CreditoList/CreditoList';
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
          hide: false
          // supportActions: {
          //   supportButton: (event) => this.onSearchCredito(event),
          //   loseFocus: () => this.searchByFocus(),
          //   suppButtLabelID: "searchCredito"
          // }
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
          hide: false
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
          value: '',
          validation: {
            required: true,
            isDecimal: true
          },
          valid: false,
          touched: false,
          hide: false
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
          hide: false
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
          hide: false
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
          hide: false
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
        alert('Se creó el pago ' + response.data.folio + ' con éxito')
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

    let updatedForm = updateObject(this.state.pagoForm, {
        [inputIdentifier]: updatedFormElement
    })

    this.setState({pagoForm: updatedForm, formIsValid: this.checkIfFormIsValid(updatedForm)})

    // TODO: update HELP formIsValid
    // credito data
    // old payment data
    // status and debt at given date
    // possible debt payment (int_ord, int_mor, abono capital)
  }

  checkIfFormIsValid = (form) => {
    let formIsValid = true
    for (let inputIds in form) {
        formIsValid = form[inputIds].valid && formIsValid
    }
    return formIsValid
  }

  // onSearchCredito = (event) => {
  //   event.preventDefault();
  //   this.setState({searchingOpen: true})
  // }
  //
  // cancelSearch = () => {
  //   this.setState({searchingOpen: false})
  //   this.props.unselContrato()
  // }
  //
  // selectContrato =(id) => {
  //   const updatedForm = updateObject(this.state.pagoForm, {
  //       credito: updateObject(this.state.pagoForm.credito, {
  //           value: id,
  //           valid: true,
  //           touched: true
  //       })
  //   })
  //   this.setState({
  //     searchingOpen: false,
  //     pagoForm: updatedForm
  //   });
  //   this.props.onFetchSelContrato(this.props.token, id)
  // }
  //
  // searchByFocus = () => {
  //   const value = this.state.pagoForm.credito.value
  //   // TODO: validation of socio to search
  //   if (value && !isNaN(value)) {
  //     this.props.onFetchSelContrato(this.props.token, value)
  //   }
  // }


  render () {
    const pagoFormOrder = ["credito", "fecha_pago", "cantidad", "abono_capital", "interes_ord", "interes_mor", "fecha_banco", "referencia_banco"]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let creditosBusqueda = <Spinner/>
    let formElements = <Spinner/>

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
                  disabled={this.props.loading}
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
          listaSocios={this.props.listaCreditos}
          onClick={row => this.selectContrato(row.values.id)}
          />
      )
    }


    return (
      <>
        <Modal
          show={this.state.searchingOpen}
          modalClosed={this.cancelSearch}>
          <h3>Búsqueda de Socios...pendiente</h3>
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
      unselContrato: () => dispatch(actions.unSelectContrato()),
      // onCreateNewPago: (form, token) => dispatch(actions.newPago(form, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PagosForm, axios))
