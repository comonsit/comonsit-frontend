import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'
import _ from 'lodash';

import classes from './ContratoActivate.module.scss'
import ContratoDetail from '../ContratoDetail/ContratoDetail'
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Title from '../../../../components/UI/Title/Title';
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'
import axios from '../../../../store/axios-be.js'


class ContratoActivate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      contratoUpdateForm: {
        fecha_inicio: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="contratoActivate.fechaFirma"/>*</>),
          value: this.props.selContrato.fecha_inicio || "",
          validation: {
            required: true,
            todayOrOlder: true
          },
          valid: this.props.selContrato.fecha_inicio !== null,
          errorMessage: "",
          touched: false,
          hide: false,
          disabled: this.props.selContrato.fecha_inicio !== null,
        },
        tipo_tasa: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'FI', displayValue: 'Fija'},
              {value: 'VA', displayValue: 'Variable'}
            ]
          },
          label: (<><FormattedMessage id="contratoActivate.tipo_tasa"/>*</>),
          value: this.props.selContrato.tipo_tasa || 'FI',
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
          disabled: this.props.selContrato.fecha_inicio !== null,
        },
        iva: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: (<FormattedMessage id="contratoActivate.iva"/>),
          value: this.props.selContrato.iva  || false,
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
          disabled: this.props.selContrato.iva !== null,
        },
        estatus_ejecucion: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'CO', displayValue: 'Cobrado'},
              {value: 'PC', displayValue: 'Por Cobrar'}
            ]
          },
          label: (<><FormattedMessage id="contratoActivate.estatus_ejecucion"/>*</>),
          value: this.props.selContrato.estatus_ejecucion || "PC",
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
          disabled: this.props.selContrato.estatus_ejecucion !== 'PC'
        },
        fecha_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="contratoActivate.fecha_banco"/></>),
          value: this.props.selContrato.fecha_banco || "",
          validation: {
            required: false,
            todayOrOlder: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
          hide: false,
          disabled: this.props.selContrato.fecha_banco !== null,
        },
        referencia_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="contratoActivate.referencia_banco"/></>),
          value: this.props.selContrato.referencia_banco || "",
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: true,
          hide: false,
          disabled: this.props.selContrato.referencia_banco !== null,
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.unSelContrato()
    this.props.onClearError()
  }

  onSubmitForm = (event) => {
    event.preventDefault();

    const formData = {}
    for (let formElementIdentifier in this.state.contratoUpdateForm) {
      if (
        this.state.contratoUpdateForm[formElementIdentifier].validation.required
        || this.state.contratoUpdateForm[formElementIdentifier].value !== ''
      ) {
        formData[formElementIdentifier] = this.state.contratoUpdateForm[formElementIdentifier].value
      }
    }

    if (this.props.selContrato.fecha_inicio) {
      delete formData.fecha_inicio
      delete formData.tipo_tasa
    }

    this.props.onUpdateContrato(formData, this.props.selContrato.id, this.props.token)
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const validation = checkValidity(event.target.value, this.state.contratoUpdateForm[inputIdentifier].validation, true)
    // TODO: checkbox check unnecesary
    const value = this.state.contratoUpdateForm[inputIdentifier].elementType === 'checkbox'
      ? event.target.checked
      : event.target.value

    const updatedFormElement = updateObject(this.state.contratoUpdateForm[inputIdentifier], {
      value: value,
      valid: validation.valid,
      errorMessage: validation.errorMessage,
      touched: true
    })

    let updatedForm = updateObject(this.state.contratoUpdateForm, {
      [inputIdentifier]: updatedFormElement
    })

    this.setState({contratoUpdateForm: updatedForm, formIsValid: this.checkIfFormIsValid(updatedForm)})
    if (this.props.formError && inputIdentifier in this.props.formError) {
      this.props.onClearError()
    }
  }

  checkIfFormIsValid = (form) => {
    let formIsValid = true
    for (let inputIds in form) {
      formIsValid = form[inputIds].valid && formIsValid
    }
    return formIsValid
  }

  render () {
    const contratoUpdateFormOrder = [
      "fecha_inicio",
      "tipo_tasa",
      "iva",
      "estatus_ejecucion",
      "referencia_banco",
      "fecha_banco"
    ]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let formElements = <Spinner/>

    contratoUpdateFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.contratoUpdateForm[key]
      })
    })

    if (!this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        const serverErrorMessage = _.get(this.props.formError, formElement.id, "")
        return (
          <div key= {formElement.id}>
            <div className={classes.Inputs}>
              <Input
                label={formElement.config.label}
                key= {formElement.id}
                elementType={formElement.config.elementType }
                elementConfig={formElement.config.elementConfig }
                value={formElement.config.value}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid || serverErrorMessage !== ""}
                errorMessage={formElement.config.errorMessage + serverErrorMessage}
                touched={formElement.config.touched}
                disabled={this.props.loading || formElement.config.disabled}
                hide={formElement.config.hide}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                supportData={formElement.config.supportData}
              />
            </div>
          </div>
        )
      })
    }

    formClasses.push(classes.noScroll)

    const updatedRedirect = (this.props.updated) ? <Redirect to="/creditos"/> : null

    return (
      <div className={classes.FormContainer}>
        <Title titleName="contratoUpdateForm.title"/>
        <div className={classes.SupportText}>
          <FormattedMessage id="contratoUpdateForm.supportText"/>
        </div>
        <form onSubmit={this.onSubmitForm}>
          <div className={formClasses.join(' ')}>
            {formElements}
          </div>
          <div className={classes.Form_Submit}>
            <Button
              btnType="Success"
              disabled={!this.state.formIsValid}
            >
              <FormattedMessage id="contratoActivate.actualizar"/>
            </Button>
          </div>
          {updatedRedirect}
        </form>
        <ContratoDetail contrato={this.props.selContrato}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selContrato: state.creditos.selectedContrato,
    updated: state.creditos.updated,
    loading: state.creditos.loading,
    token: state.auth.token,
    role: state.generalData.role,
    formError: state.errors.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateContrato: (contrato, id, token) => dispatch(actions.updateCredito(contrato, id, token)),
    unSelContrato: () => dispatch(actions.unSelectContrato()),
    onClearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContratoActivate, axios))
