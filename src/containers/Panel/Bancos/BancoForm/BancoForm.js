import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'
import axios from '../../../../store/axios-be.js'

import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Title from '../../../../components/UI/Title/Title';
import Tabs from '../../../../components/UI/Tabs/Tabs';
import Currency from '../../../../components/UI/Formatting/Currency';
import MovimientosListConc from '../../Movimientos/MovimientosListConc/MovimientosListConc';
import PagosList from '../../Pagos/PagosList/PagosList';
import CreditoListCont from '../../Creditos/CreditoListCont/CreditoListCont';
import classes from './BancoForm.module.css'
// import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


const ammountFields = {
  "bancoForm.Movimientos": "monto",
  "bancoForm.Pagos": "cantidad",
  "bancoForm.EjCredito": "monto"
}

class BancoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      movs: null,
      pagos: null,
      creditos: null,
      selTab: null,
      cantidadCheck: null,
      bankForm: {
        referencia_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="bancoForm.referencia_banco"/>*</>),
          value: null,
          validation: {
            required: true
          },
          valid: false,
          touched: false,
        },
        fecha: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="bancoForm.fecha"/>*</>),
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
          label:  (<><FormattedMessage id="bancoForm.cantidad"/>*</>),
          value: '',
          validation: {
            required: true,
            isDecimal: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        nota: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            placeholder: '..',
            maxLength: '100'
          },
          label:  (<FormattedMessage id="bancoForm.nota"/>),
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          hide: false
        },
      }
    }
  }

  componentDidMount () {
    this.onGetData()
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedItems !== prevProps.selectedItems) {
      this.setState({
        formIsValid: this.checkIfFormIsValid(this.state.bankForm),
        cantidadCheck: this.onValidateCantidad(this.state.bankForm.cantidad.value)
      })
    }
  }

  onValidateCantidad (currVal) {
    if (!currVal) return null

    let cant = null
    if (this.props.selectedItems.length > 0) {
      const total = this.props.selectedItems.reduce((acc, item) => acc + +item[ammountFields[this.state.selTab]], 0)
      const cl = total !== +currVal ? classes.inValid : null
      cant = (<strong className={cl}>
                <Currency
                  value={total}
                  hideZero
                />
            </strong>)
    }
    return cant
  }

  onGetData () {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    axios.get('/movimientos-conc/', authData)
      .then(response => {
        this.setState({movs: response.data})
      })

    axios.get('/pagos/no-link/', authData)
      .then(response => {
        this.setState({pagos: response.data})
      })

    axios.get('/contratos/no-link/', authData)
      .then(response => {
        this.setState({creditos: response.data})
      })
  }

  onSubmitForm = (event) => {
    event.preventDefault();

    const formData = {}
    for (let formElementIdentifier in this.state.bankForm) {
      formData[formElementIdentifier] = this.state.bankForm[formElementIdentifier].value
    }

    formData["dataType"] = this.state.selTab.split(".")[1]
    formData["selectedItems"] = this.props.selectedItems.map(it => it.id)


    console.log(formData)
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` },
    }

    axios.post('/mov-bancos/', formData, authData)
      .then(response => {
        // TODO:
      })
  }

  inputChangedHandler = (event, inputIdentifier) => {

    let updatedFormElement

      const currValid = checkValidity(event.target.value, this.state.bankForm[inputIdentifier].validation)

      updatedFormElement = updateObject(this.state.bankForm[inputIdentifier], {
        value: event.target.value,
        valid: currValid,
        touched: true
      })

    const updatedForm = updateObject(this.state.bankForm, {
      [inputIdentifier]: updatedFormElement
    })

    this.setState({
      bankForm: updatedForm,
      formIsValid: this.checkIfFormIsValid(updatedForm),
      cantidadCheck: this.onValidateCantidad(inputIdentifier === "cantidad" && currValid ? event.target.value : null)
    })
  }

  checkIfFormIsValid = (form) => {
    let formIsValid = (this.props.selectedItems && this.props.selectedItems.length > 0) ? true : false
    for (let inputIds in form) {
        formIsValid = form[inputIds].valid && formIsValid
    }
    return formIsValid
  }

  render () {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const formOrder = ["referencia_banco", "fecha", "cantidad", "nota"]
    const formElementsArray = []
    let formElements = <Spinner/>

    formOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.bankForm[key]
      })
    })

    if (true) {
    // if (this.props.ctasBanco) {
      formElements = formElementsArray.map(formElement => {

        return (
            <div
              className={classes.Inputs}
              key= {formElement.id}>
              <Input
                label={formElement.config.label}
                key= {formElement.id}
                elementType={formElement.config.elementType }
                elementConfig={formElement.config.elementConfig }
                value={formElement.config.value}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                disabled={formElement.config.disabled}
                supportData={formElement.id === "cantidad" ? this.state.cantidadCheck : null}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            </div>
            )
      })
    }

    let movsList = <Spinner/>
    let pagosList = <Spinner/>
    let creditosList = <Spinner/>

    if (this.state.movs) {
      movsList = <MovimientosListConc data={this.state.movs} onClick={() => {}}/>
    }
    if (this.state.pagos) {
      pagosList = <PagosList data={this.state.pagos} onClick={() => {}} selectable/>
    }
    if (this.state.creditos) {
      creditosList = <CreditoListCont data={this.state.creditos} selectable/>
    }

    const selectableTabs = (
      <div className={[classes.Inputs, classes.TabsInput].join(' ')} key="tabInput">
        <Tabs
          onSelectTab={(activeTab) => this.setState({selTab: activeTab})}
        >
         <div label="bancoForm.Movimientos">
           {movsList}
         </div>
         <div label="bancoForm.Pagos">
           {pagosList}
         </div>
         <div label="bancoForm.EjCredito">
           {creditosList}
         </div>
         <div label="bancoForm.Otros">
           <p>...otros...</p>
         </div>
       </Tabs>
     </div>
     )

   formElements.push(selectableTabs)

    return (
      <div>
        <Title
          titleName="bancoForm.title"
          >
        </Title>
        <form onSubmit={this.onSubmitForm}>
          <div className={classes.Form}>
          {formElements}
          </div>
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}
          >
            <FormattedMessage id="saveButton"/>
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    selectedItems: state.selList.selList
    // ctasBanco: state.bancos.bancos,
    // subcuetnas: state.bancos.subcuentas
  }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BancoForm, axios))
