import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import axios from '../../../../store/axios-be.js';
import _ from 'lodash';

import classes from './MovimientoBankForm.module.scss';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../store/reducers/utility';
import { checkValidity } from '../../../../utilities/validity';


class MovimientoBankForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      movimientoForm: {
        tipo_de_movimiento: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'EF', displayValue: 'Efectivo'},
              {value: 'BA', displayValue: 'Banco'},
              {value: 'TR', displayValue: 'Transferencia'},
            ]
          },
          label: (<><FormattedMessage id="movimientos.tipo"/>*</>),
          value: 'BA',
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
        },
        fecha_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="movimientosForm.fecha_banco"/>*</>),
          value: null,
          validation: {
            required: true,
            todayOrOlder: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
        referencia_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="movimientosForm.referencia_banco"/>*</>),
          value: '',
          validation: {
            required: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        }
      }
    }
  }

  onSubmitForm = event => {
    event.preventDefault();

    let formData = {}
    for (let formElementIdentifier in this.state.movimientoForm) {
      formData[formElementIdentifier] = this.state.movimientoForm[formElementIdentifier].value
    }

    // TODO: eliminar esta opción???
    if (this.state.movimientoForm.tipo_de_movimiento.value === 'EF') {
      formData = updateObject(formData, {
        fecha_banco: null,
        referencia_banco: null
      })
    }

    this.props.onEditMovimiento(formData, this.props.selectedMov, this.props.token)
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const validation = checkValidity(event.target.value, this.state.movimientoForm[inputIdentifier].validation, true)

    const value = this.state.movimientoForm[inputIdentifier].elementType === 'checkbox'
      ? event.target.checked
      : event.target.value

    const updatedFormElement = updateObject(this.state.movimientoForm[inputIdentifier], {
        value: value,
        valid: validation.valid,
        errorMessage: validation.errorMessage,
        touched: true
    })

    let updatedForm = updateObject(this.state.movimientoForm, {
      [inputIdentifier]: updatedFormElement
    })

    this.setState({movimientoForm: updatedForm, formIsValid: this.checkIfFormIsValid(updatedForm)})
    if (this.props.formError && inputIdentifier in this.props.formError) {
      this.props.onClearError()
    }
  }

  checkIfFormIsValid = form => {
    let formIsValid = true
    for (let inputIds in form) {
      formIsValid = form[inputIds].valid && formIsValid
    }
    return formIsValid
  }

  render() {
    const movimientoFormOrder = ["tipo_de_movimiento", "fecha_banco", "referencia_banco"]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let formElements = <Spinner/>

    movimientoFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.movimientoForm[key]
      })
    })

    if (!this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        const serverErrorMessage = _.get(this.props.formError, formElement.id, "")
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
                invalid={!formElement.config.valid || serverErrorMessage !== ""}
                errorMessage={formElement.config.errorMessage + serverErrorMessage}
                touched={formElement.config.touched}
                disabled={this.props.loading}
                hide={formElement.config.hide}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                supportData={formElement.config.supportData}
                supportActions={formElement.config.supportActions}
                labelCheckbox={formElement.config.labelCheckbox}
              />
            </div>
          </div>
        )
      })
    }

    formClasses.push(classes.noScroll)

    return (
      <>
        <form onSubmit={this.onSubmitForm}>
          <div className={formClasses.join(' ')}>
          {formElements}
          </div>
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}
          >
            <FormattedMessage id="saveButton"/>
          </Button>
        </form>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    role: state.generalData.role,
    loading: state.movimientos.loading,
    updated: state.movimientos.updated,
    formError: state.errors.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitSocios: (token) => dispatch(actions.initSocios(token)),
    onEditMovimiento: (movData, id, token) => dispatch(actions.updateMovimiento(movData, id, token)),
    unSelMov: () => dispatch(actions.unSelectMov()),
    onClearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MovimientoBankForm, axios))
