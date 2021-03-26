import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import _ from 'lodash';

import classes from './ContratoCondonar.module.scss'
import ContratoDetail from '../ContratoDetail/ContratoDetail'
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Alert from '../../../../components/UI/Input/Alert';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Currency from '../../../../components/UI/Formatting/Currency';
import Title from '../../../../components/UI/Title/Title';
import Modal from '../../../../components/UI/Modal/Modal';
import FormConfirmation from '../../../../components/UI/FormConfirmation/FormConfirmation';
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'
import axios from '../../../../store/axios-be.js'


class ContratoCondonar extends Component {
  constructor(props) {
    super(props);
    if (!this.props.selContrato.id) {
      this.props.history.push('/')
    }
    this.state = {
      formIsValid: false,
      condonable: null,
      capital_pendiente: null,
      interes_ord: null,
      interes_mor: null,
      modalOpen: false, 
      confirmFormOpen: false,
      form: {
        justificacion: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            placeholder: '..',
            maxLength: '100'
          },
          label: (<><FormattedMessage id="justificacion"/></>),
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

  componentDidMount() {
    this.getCondonableStatus()
  }

  componentWillUnmount() {
    this.props.unSelContrato()
    this.props.onClearError()
  }

  getCondonableStatus() {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    axios.get('/contratos/'+this.props.selContrato.id+'/deuda/', authData)
      .then(response => {
        if ('capital_por_pagar' in response.data) {
          let condonable = false
          if (response.data.capital_por_pagar === 0) {
            condonable = true
          }
          this.setState({
            condonable: condonable,
            capital_pendiente: response.data.capital_por_pagar,
            interes_ord: response.data.interes_ordinario_deuda,
            interes_mor: response.data.interes_moratorio_deuda
          })
        }
      })
      .catch(error => {

      })
  }

  onSubmitForm = event => {
    event.preventDefault();
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    const data = {
      credito: this.props.selContrato.id,
      justificacion: this.state.form.justificacion.value
    }
    this.setState({confirmFormOpen: false})
    
    axios.post('/condonaciones/', data, authData)
      .then(response => {
        this.setState({successResponse: response.data.credito})
        this.props.onClearError()
      })
      .catch(error => {
        this.setState({modalOpen: false, confirmFormOpen: false})
        this.props.onSetError(error.response.data)
      })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const validation = checkValidity(event.target.value, this.state.form[inputIdentifier].validation, true)
    // TODO: checkbox check unnecesary
    const value = this.state.form[inputIdentifier].elementType === 'checkbox'
      ? event.target.checked
      : event.target.value

    const updatedFormElement = updateObject(this.state.form[inputIdentifier], {
      value: value,
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
    let form, message

    if (this.state.condonable === null) {
      message = null
      form = <Spinner />
    } else if (this.state.condonable === true) {
      message = (
        <div className={classes.Message}>
          <h4><FormattedMessage id="contratoCondonar.message1"/></h4>
          <p><FormattedMessage id="contratoCondonar.message2a"/><Currency value={this.state.interes_ord} /><FormattedMessage id="contratoCondonar.message2b"/><Currency value={this.state.interes_mor}/><FormattedMessage id="contratoCondonar.message2c"/><Currency value={this.state.capital_pendiente} />.</p>
          <p><FormattedMessage id="contratoCondonar.message3"/></p>
        </div>
      )
      const serverErrorMessage = _.get(this.props.formError, 'justificacion', "")
      form = (
        <form onSubmit={this.onShowConfirmation}>
          <div className={[classes.Form, classes.noScroll].join(' ')}>
            <div>
              <div className={classes.Inputs}>
                <Input
                  label={this.state.form.justificacion.label}
                  key= {'contractoCondonacion1'}
                  elementType={this.state.form.justificacion.elementType }
                  elementConfig={this.state.form.justificacion.elementConfig }
                  value={this.state.form.justificacion.value}
                  shouldValidate={this.state.form.justificacion.validation}
                  invalid={!this.state.form.justificacion.valid || serverErrorMessage !== ""}
                  errorMessage={this.state.form.justificacion.errorMessage + serverErrorMessage}
                  touched={this.state.form.justificacion.touched}
                  disabled={this.props.loading || this.state.form.justificacion.disabled}
                  hide={this.state.form.justificacion.hide}
                  changed={(event) => this.inputChangedHandler(event, 'justificacion')}
                  supportData={this.state.form.justificacion.supportData}
                  focused
                />
              </div>
            </div>
          </div>
          <div className={classes.Form_Submit}>
            <Button
              btnType="Success"
              disabled={!this.state.formIsValid}
            >
              <FormattedMessage id="contratoCondonar.condonar"/>
            </Button>
          </div>
        </form>
      )
    } else if (this.state.condonable === false) {
      message = (
        <div  className={classes.Message}>
          <h2><Alert />&nbsp;<FormattedMessage id="contratoCondonar.messageDenied1"/></h2>
          <h4><FormattedMessage id="contratoCondonar.messageDenied2a"/>#{this.props.selContrato.id}<FormattedMessage id="contratoCondonar.messageDenied2b"/><Currency value={this.state.capital_pendiente} /><FormattedMessage id="contratoCondonar.messageDenied2c"/></h4>
        </div>
        )
      form = null
    }

    let modalInfo = <Spinner />
    if (this.state.modalOpen) {
      if (this.state.confirmFormOpen) {
        const extraTitle = (
          <h3><FormattedMessage id="contratoCondonar.message1"/></h3>
        )
        modalInfo = (
          <FormConfirmation
            formOrder={['justificacion']}
            formData={this.state.form}
            onSubmitAction={this.onSubmitForm}
            onCancelAction={() => this.setState({modalOpen: false, confirmFormOpen: false})}
            extraTitle={extraTitle}
          />
        )
      } else if (this.state.successResponse) {
        modalInfo = (
          <div className={classes.SuccessResponse}>
            <p><FormattedMessage id="contratoCondonar.respuesta1"/> #{this.state.successResponse}<FormattedMessage id="contratoCondonar.respuesta2"/></p>
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
          <Title titleName="contratoCondonar.title"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContratoCondonar, axios))
