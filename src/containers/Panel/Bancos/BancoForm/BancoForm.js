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
import MovimientosListConc from '../../Movimientos/MovimientosListConc/MovimientosListConc';
import classes from './BancoForm.module.css'
// import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


class BancoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      movs: null,
      selTab: null,
      bankForm: {
        banco: {
          elementType: 'select',
          elementConfig: {
            options: [{value: 0, displayValue: 'Banamex'}]
            // options: this.props.ctasBanco.map(r => ({"value": r.id, "displayValue": r.nombre_cuenta}))
          },
          label: (<><FormattedMessage id="bancoForm.cuenta_banco"/>*</>),
          value: 0,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        },
        referencia: {
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
      }
    }
  }

  componentDidMount () {
    this.onGetMovimientos()
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedItems !== prevProps.selectedItems) {
      this.setState({ formIsValid: this.checkIfFormIsValid(this.state.bankForm) })
    }
  }

  onGetMovimientos () {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    axios.get('/movimientos-conc/', authData)
      .then(response => {
        this.setState({movs: response.data})
      })
  }

  onSubmitForm = (event) => {
    event.preventDefault();

    const formData = {}
    for (let formElementIdentifier in this.state.bankForm) {
      formData[formElementIdentifier] = this.state.bankForm[formElementIdentifier].value
    }

    formData["dataType"] = this.state.selTab.split(".")[1]
    formData["selectedItems"] = this.props.selectedItems

    // console.log(formData)
    //
    // const authData = {
    //   headers: { 'Authorization': `Bearer ${this.props.token}` }
    // }
    //
    // axios.get('/banco/', authData, formData)
    //   .then(response => {
    //     // TODO:
    //   })

    // this.props.onCreateNewMovimiento(formData, this.props.token)
  }

  inputChangedHandler = (event, inputIdentifier) => {

    let updatedFormElement

      updatedFormElement = updateObject(this.state.bankForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.bankForm[inputIdentifier].validation),
        touched: true
      })

    const updatedForm = updateObject(this.state.bankForm, {
      [inputIdentifier]: updatedFormElement
    })

    this.setState({bankForm: updatedForm, formIsValid: this.checkIfFormIsValid(updatedForm)})
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
    const formOrder = ["banco", "referencia", "fecha", "cantidad"]
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            </div>
            )
      })
    }

    let movsList = <Spinner/>

    if (this.state.movs) {
      movsList = <MovimientosListConc data={this.state.movs} onClick={() => {}}/>
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
           <p>...pagos...</p>
         </div>
         <div label="bancoForm.EjCredito">
           <p>...créditos...</p>
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
