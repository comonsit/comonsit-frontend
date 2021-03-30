import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import _ from 'lodash';

import classes from './ContratoProrroga.module.scss'
import ContratoDetail from '../ContratoDetail/ContratoDetail'
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import FrmtedDate from '../../../../components/UI/Formatting/FrmtedDate'
import Title from '../../../../components/UI/Title/Title';
import Modal from '../../../../components/UI/Modal/Modal';
import FormConfirmation from '../../../../components/UI/FormConfirmation/FormConfirmation';
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'
import axios from '../../../../store/axios-be.js'


class ContratoProrroga extends Component {
  constructor(props) {
    super(props);
    if (!this.props.selContrato.id) {
      this.props.history.push('/')
    }
    this.state = {
      formIsValid: false,
      modalOpen: false, 
      confirmFormOpen: false,
      form: {
        prorroga: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '# meses'
          },
          label: (<><FormattedMessage id="prorroga"/></>),
          value: "",
          validation: {
            required: true,
            isNumeric: true,
            minNumValue: 1,
            maxNumValue: 14
          },
          valid: true,
          errorMessage: "",
          touched: false,
          hide: false
        },
        prorroga_justificacion: {
          elementType: 'textarea',
          elementConfig: {
            required: true,
            type: 'text',
            placeholder: '..',
            maxLength: '100', 
          },
          label: (<><FormattedMessage id="prorroga_justificacion"/></>),
          value: "",
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: false,
          hide: false
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.unSelContrato()
    this.props.onClearError()
  }

  onSubmitForm = event => {
    event.preventDefault();
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    const data = {
      prorroga: this.state.form.prorroga.value,
      prorroga_justificacion: this.state.form.prorroga_justificacion.value
    }
    this.setState({confirmFormOpen: false})
    
    axios.patch(`/contratos/${this.props.selContrato.id}/prorroga/`, data, authData)
      .then(response => {
        this.setState({successResponse: response.data.fecha_vencimiento})
        this.props.onClearError()
      })
      .catch(error => {
        this.setState({modalOpen: false, confirmFormOpen: false})
        this.props.onSetError(error.response.data)
      })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const validation = checkValidity(event.target.value, this.state.form[inputIdentifier].validation, true)

    const updatedFormElement = updateObject(this.state.form[inputIdentifier], {
      value:  event.target.value,
      valid: validation.valid,
      errorMessage: validation.errorMessage,
      touched: true
    })

    let updatedForm = updateObject(this.state.form, {
      [inputIdentifier]: updatedFormElement
    })

    this.setState({form: updatedForm, formIsValid: this.checkIfFormIsValid(updatedForm)})
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

  onShowConfirmation = event => {
    event.preventDefault();
    this.setState({modalOpen: true, confirmFormOpen: true})
  }

  render() {
    let newDate = null

    const vencimiento = (isNaN(this.props.selContrato.fecha_vencimiento) && !isNaN(Date.parse(this.props.selContrato.fecha_vencimiento)))
      ? new Date(this.props.selContrato.fecha_vencimiento.replace(/-/g, '/'))
      : null
    if (this.state.formIsValid && !isNaN(this.state.form.prorroga.value) && vencimiento) {
      newDate = new Date(vencimiento);
      newDate = new Date(newDate.setMonth(newDate.getMonth()+parseInt(this.state.form.prorroga.value)));
    }
    const message = (
      <div className={classes.Message}>
        <h4><FormattedMessage id="contratoProrroga.message1"/></h4>
        <p><FormattedMessage id="contratoProrroga.message2"/><FrmtedDate value={vencimiento ? vencimiento.toString() : null}/></p>
        <p><FormattedMessage id="contratoProrroga.message3"/><strong><FrmtedDate value={newDate ? newDate.toString() : null}/></strong></p>
      </div>
    )  

    const serverErrorMessage1 = _.get(this.props.formError, 'prorroga', "")
    const serverErrorMessage2 = _.get(this.props.formError, 'prorroga_justificacion', "")
    const form = (
        <form onSubmit={this.onShowConfirmation}>
          <div className={[classes.Form, classes.noScroll].join(' ')}>
            <div>
              <div className={classes.Inputs}>
                <Input
                  label={this.state.form.prorroga.label}
                  key= {'contractoProrroga1'}
                  elementType={this.state.form.prorroga.elementType }
                  elementConfig={this.state.form.prorroga.elementConfig }
                  value={this.state.form.prorroga.value}
                  shouldValidate={this.state.form.prorroga.validation}
                  invalid={!this.state.form.prorroga.valid || serverErrorMessage1 !== ""}
                  errorMessage={this.state.form.prorroga.errorMessage + serverErrorMessage1}
                  touched={this.state.form.prorroga.touched}
                  disabled={this.props.loading || this.state.form.prorroga.disabled}
                  hide={this.state.form.prorroga.hide}
                  changed={(event) => this.inputChangedHandler(event, 'prorroga')}
                  supportData={this.state.form.prorroga.supportData}
                />
              </div>
            </div>
            <div>
              <div className={classes.Inputs}>
                <Input
                  label={this.state.form.prorroga_justificacion.label}
                  key= {'contractoProrroga2'}
                  elementType={this.state.form.prorroga_justificacion.elementType }
                  elementConfig={this.state.form.prorroga_justificacion.elementConfig }
                  value={this.state.form.prorroga_justificacion.value}
                  shouldValidate={this.state.form.prorroga_justificacion.validation}
                  invalid={!this.state.form.prorroga_justificacion.valid || serverErrorMessage2 !== ""}
                  errorMessage={this.state.form.prorroga_justificacion.errorMessage + serverErrorMessage2}
                  touched={this.state.form.prorroga_justificacion.touched}
                  disabled={this.props.loading || this.state.form.prorroga_justificacion.disabled}
                  hide={this.state.form.prorroga_justificacion.hide}
                  changed={(event) => this.inputChangedHandler(event, 'prorroga_justificacion')}
                  supportData={this.state.form.prorroga_justificacion.supportData}
                />
              </div>
            </div>
          </div>
          <div className={classes.Form_Submit}>
            <Button
              btnType="Success"
              disabled={!this.state.formIsValid}
            >
              <FormattedMessage id="enviar"/>
            </Button>
          </div>
        </form>
      )

    let modalInfo = <Spinner />
    if (this.state.modalOpen) {
      if (this.state.confirmFormOpen) {
        modalInfo = (
          <FormConfirmation
            formOrder={['prorroga', 'prorroga_justificacion']}
            formData={this.state.form}
            onSubmitAction={this.onSubmitForm}
            onCancelAction={() => this.setState({modalOpen: false, confirmFormOpen: false})}
          />
        )
      } else if (this.state.successResponse) {
        modalInfo = (
          <div className={classes.SuccessResponse}>
            <p><FormattedMessage id="contratoProrroga.respuesta1"/> <strong><FrmtedDate value={this.state.successResponse}/></strong></p>
            <Button
              btnType="Success"
              clicked={() => this.props.history.replace('/creditos')}
            >
              <FormattedMessage id="bancoForm.terminar"/>
            </Button>
          </div>
        )
      }
    }


    return (
      <>
        <Modal
          show={this.state.modalOpen}
          modalClosed={() => this.setState({modalOpen: false, confirmFormOpen: false})}
        >
          {modalInfo}
        </Modal>
        <div className={classes.FormContainer}>
          <Title titleName="contratoProrroga.title"/>
          <div className={classes.FormContainer_extra}>
            <div className={classes.FormContainer_extraInfo}>
              <h3><FormattedMessage id="credito" /> {this.props.selContrato.id}</h3>
              <div className={classes.FormContainer_extraInfoData}>
                <ContratoDetail contrato={this.props.selContrato}/>
              </div>
            </div>
            <div className={classes.MessageContainer}>
              {message}
              {form}
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    selContrato: state.creditos.selectedContrato,
    token: state.auth.token,
    formError: state.errors.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    unSelContrato: () => dispatch(actions.unSelectContrato()),
    onSetError: (err) => dispatch(actions.setError(err)),
    onClearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContratoProrroga, axios))
