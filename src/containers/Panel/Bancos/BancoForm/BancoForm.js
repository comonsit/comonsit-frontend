import React, { Component } from 'react'
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'

import classes from './BancoForm.module.scss'
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import FormConfirmation from '../../../../components/UI/FormConfirmation/FormConfirmation';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../components/UI/Modal/Modal';
import Title from '../../../../components/UI/Title/Title';
import Tabs from '../../../../components/UI/Tabs/Tabs';
import Currency from '../../../../components/UI/Formatting/Currency';
import SwitchToggle from '../../../../components/UI/SwitchToggle/SwitchToggle'
import MovimientosListConc from '../../Movimientos/MovimientosListConc/MovimientosListConc';
import PagosList from '../../Pagos/PagosList/PagosList';
import CreditoListCont from '../../Creditos/CreditoListCont/CreditoListCont';
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'
import axios from '../../../../store/axios-be.js'


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
      fondosComunes: null,
      subcuentas: null,
      selTab: "bancoForm.Movimientos",
      cantidadCheck: null,
      referenciaCheck: null,
      subCtaIngrEgr: false,   // true=Ingreso & false=Egreso
      modalOpen: false,
      successResponse: null,
      confirmFormOpen: false,
      bankForm: {
        referencia_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..',
          },
          label: <><FormattedMessage id="bancoForm.referencia_banco"/>*</>,
          value: "",
          validation: {
            required: true,
            isAlphaNumeric: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          supportActions: {
            loseFocus: () => this.changeCase()
          }
        },
        fecha: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: <><FormattedMessage id="bancoForm.fecha"/>*</>,
          value: '',
          validation: {
            required: true,
            todayOrOlder: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
        cantidad: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
          },
          label:  (<><FormattedMessage id="bancoForm.cantidad"/>*</>),
          value: '',
          validation: {
            required: true,
            isDecimal: true,
            minNumValue: .01,
            maxNumValue: 9999999,
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
        referencia_alf: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..',
            maxLength: '60'
          },
          label:  (<FormattedMessage id="bancoForm.referencia_alf"/>),
          value: '',
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
          hide: false
        },
        subcuenta: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 99, displayValue: '...Loading...'}
            ]
          },
          label: (<><FormattedMessage id="bancoForm.subcuenta"/>*</>),
          value: 99,
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
      }
    }
  }

  componentDidMount() {
    this.onGetData()
  }

  componentWillUnmount() {
    this.props.onClearError()
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.props.selectedItems !== prevProps.selectedItems) {
      this.setState({
        formIsValid: this.checkIfFormIsValid(this.state.bankForm),
        cantidadCheck: this.onValidateCantidad(this.state.bankForm.cantidad.value),
        referenciaCheck: this.onValidateReferencia(this.state.bankForm.referencia_banco.value)
      })
    }
    if(this.state.selTab !== prevState.selTab) {
      this.setState({
        formIsValid: this.checkIfFormIsValid(this.state.bankForm),
        cantidadCheck: null,
        referenciaCheck: null
      })
    }
  }

  onValidateCantidad = currVal => {
    if (!currVal) return null

    let cant = null
    if (this.props.selectedItems.length > 0) {
      const total = this.props.selectedItems.reduce((acc, item) => acc + +item[ammountFields[this.state.selTab]], 0)
      const cl = total !== +currVal ? classes.inValid : null
      cant = (
        <strong className={cl}>
          <Currency
            value={total}
            hideZero
          />
        </strong>
      )
    }
    return cant
  }

  onValidateReferencia = (currVal) => {
    if (!currVal) return null
    let resp = null

    if (this.props.selectedItems.length > 0) {
      const referencias = this.props.selectedItems.map(item => item["referencia_banco"])
      if (referencias.length === 0) {
        resp = <p><FormattedMessage id={"bancoForm.sinReferenciaAlert"}/></p>
      } else if (referencias.length === 1 && referencias[0] !== currVal) {
        resp = <p><FormattedMessage id={"bancoForm.noCoincideAlert1"}/>{currVal}<FormattedMessage id={"bancoForm.noCoincideAlert2"}/>{referencias[0]}</p>
      } else if (referencias.length > 1) {
        resp = <p><FormattedMessage id={"bancoForm.diferentesAlert"}/></p>
      }
    }
    return resp
  }

  onGetData = () => {
    // todo change for a getAll request
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    axios.get('/movimientos-conc/', authData)
      .then(response => {
        this.setState({movs: response.data.results})
      })

    axios.get('/pagos/no-link/', authData)
      .then(response => {
        this.setState({pagos: response.data.results})
      })

    axios.get('/contratos/no-link/', authData)
      .then(response => {
        this.setState({creditos: response.data.results})
      })

    axios.get('/contratos/no-link/?fondocomun=1', authData)
      .then(response => {
        this.setState({fondosComunes: response.data.results})
      })

    axios.get('/subcuentas/', authData)
      .then(response => {
        const updatedFormElement = updateObject(this.state.bankForm.subcuenta, {
          elementConfig: {
            options: response.data.map(r => ({
              "value": r.id,
              "displayValue": r.id_contable+' - '+r.nombre
            })),
          },
          value: 1,
        })
        const updatedForm = updateObject(this.state.bankForm, {
          subcuenta: updatedFormElement
        })
        this.setState({
          subcuentas: response.data,
          bankForm: updatedForm
        })
      })
  }

  onShowConfirmation = event => {
    event.preventDefault();
    this.setState({modalOpen: true, confirmFormOpen: true})
  }

  onCancelConfirmation = () => {
    if (!this.state.successResponse) {
      this.setState({modalOpen: false, confirmFormOpen: false})
    }
  }

  onSubmitForm = event => {
    event.preventDefault();

    this.setState({confirmFormOpen: false})

    const formData = {}
    for (let formElementIdentifier in this.state.bankForm) {
      if (formElementIdentifier !== 'subcuenta') {
        formData[formElementIdentifier] = this.state.bankForm[formElementIdentifier].value
      }
    }

    formData["dataType"] = this.state.selTab.split(".")[1]
    if (formData.dataType === "Otros") {
      formData["selectedItems"] = [ this.state.bankForm.subcuenta.value]
      formData["ingrEgr"] = this.state.subCtaIngrEgr
    } else {
      formData["selectedItems"] = this.props.selectedItems.map(it => it.id)
    }

    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` },
    }

    axios.post('/mov-bancos/', formData, authData)
      .then(response => {
        this.setState({successResponse: response.data.registros_nvos})
        this.props.onClearError()
      })
      .catch(error => {
        this.setState({modalOpen: false, confirmFormOpen: false})
        this.props.onSetError(error.response.data)
      })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    let updatedFormElement
    const currValid = checkValidity(event.target.value, this.state.bankForm[inputIdentifier].validation, true)
    let extras = {}

    updatedFormElement = updateObject(this.state.bankForm[inputIdentifier], {
      value: event.target.value,
      valid: currValid.valid,
      errorMessage: currValid.errorMessage,
      touched: true
    })

    const updatedForm = updateObject(this.state.bankForm, {
      [inputIdentifier]: updatedFormElement
    })

    if (inputIdentifier === "cantidad" && currValid.valid) {
      extras = {
        cantidadCheck: this.onValidateCantidad(event.target.value)
      }
    } else if (inputIdentifier === "referencia_banco" && currValid.valid) {
      extras = {
        referenciaCheck: this.onValidateReferencia(event.target.value)
      }
    }

    this.setState({
      bankForm: updatedForm,
      formIsValid: this.checkIfFormIsValid(updatedForm),
      ...extras
    })
    if (this.props.formError && inputIdentifier in this.props.formError) {
      this.props.onClearError()
    }
  }

  checkIfFormIsValid = form => {
    let formIsValid = false
    if (
      this.state.selTab === 'bancoForm.Otros' ||
      (this.props.selectedItems && this.props.selectedItems.length > 0)
    ) {
      formIsValid = true
    }
    for (let inputIds in form) {
      formIsValid = form[inputIds].valid && formIsValid
    }
    return formIsValid
  }

  onToggleIngreso = () => {
    this.setState(prevState => ({
      subCtaIngrEgr: !prevState.subCtaIngrEgr
    }));
  }

  changeCase = () => {
    const updatedFormElement = updateObject(this.state.bankForm.referencia_banco, {
      value: this.state.bankForm.referencia_banco.value.toUpperCase(),
    })
    const updatedForm = updateObject(this.state.bankForm, {
      referencia_banco: updatedFormElement
    })
    this.setState({ bankForm: updatedForm })
  }

  render() {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const formOrder = [
      "referencia_banco",
      "fecha",
      "cantidad",
      "referencia_alf",
      "subcuenta"
    ]
    const formElementsArray = []
    let formElements, modalInfo = <Spinner/>

    formOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.bankForm[key]
      })
    })

    if (true) {
    // if (this.props.ctasBanco) {
      formElements = formElementsArray.map(formElement => {
        const serverErrorMessage = _.get(this.props.formError, formElement.id, "")
        return (
          <div
            className={classes.Inputs}
            key= {formElement.id}
          >
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
              disabled={formElement.config.disabled}
              supportData={formElement.id === "cantidad" ? this.state.cantidadCheck : null}
              alertMessage={formElement.id === "referencia_banco" ? this.state.referenciaCheck : null}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              supportActions={formElement.config.supportActions}
            />
          </div>
        )
      })
    }

    let movsList = <Spinner/>
    let pagosList = (this.state.pagos) 
      ? <PagosList data={this.state.pagos} onClick={() => {}} selectable/>
      : <Spinner/>
    let creditosList = (this.state.creditos)
      ? <CreditoListCont data={this.state.creditos} selectable/>
      : <Spinner/>
    let fondoComunList = (this.state.fondosComunes)
      ? <CreditoListCont data={this.state.fondosComunes} selectable/>
      : <Spinner/>
    const subcuentaInput = _.remove(formElements, el => el.key === "subcuenta" )

    if (this.state.movs) {
      movsList = (
        <MovimientosListConc
          data={this.state.movs}
          onClick={() => {}}
          selectable
          bankDetail
        />
      )
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
         <div label="FondosComunes.EjCredito">
           {fondoComunList}
         </div>
         <div label="bancoForm.Otros">
           <div className={classes.SubcuentaContainer}>
             {subcuentaInput}
             <div className={classes.IngresoToggle}>
               <SwitchToggle clicked={this.onToggleIngreso}/>
               <p><FormattedMessage id={this.state.subCtaIngrEgr ? "bancoForm.ingreso" : "bancoForm.egreso"}/></p>
             </div>
           </div>
         </div>
       </Tabs>
     </div>
     )

   formElements.push(selectableTabs)

    if (this.state.modalOpen) {
      if (this.state.confirmFormOpen) {
        let extras = (
           <div className={classes.IngresoToggle}>
             <p><FormattedMessage id={this.state.subCtaIngrEgr ? "bancoForm.ingreso" : "bancoForm.egreso"}/></p>
           </div>
         )
        if (this.state.selTab !== 'bancoForm.Otros') {
          formOrder.pop()
          const selected = this.props.selectedItems.map((it, ind) =>(<span key={ind}>{ (ind ? ', ' : '') + '#'+it.id }</span>))
          extras = (
            <div className={classes.IngresoToggle}>
             <p> {this.state.selTab.split(".")[1]} <FormattedMessage id="bancoForm.seleccionados"/>: {selected}</p>
            </div>
          )
        }
        modalInfo = (
          <FormConfirmation
            formOrder={formOrder}
            formData={this.state.bankForm}
            onSubmitAction={this.onSubmitForm}
            onCancelAction={this.onCancelConfirmation}
          >
            {extras}
          </FormConfirmation>
        )
      } else if (this.state.successResponse) {
        // TODO: Show TABLE with new REGISTROS instead of count
        // TODO: Crear Guardar Nuevo
        modalInfo = (
          <div className={classes.SuccessResponse}>
            <p><FormattedMessage id="bancoForm.respuesta1"/> {this.state.successResponse} <FormattedMessage id="bancoForm.respuesta2"/> </p>
            <Button
              btnType="Success"
              disabled={!this.state.formIsValid}
              clicked={() => this.props.history.replace('/bancos')}
            >
              <FormattedMessage id="bancoForm.terminar"/>
            </Button>
          </div>
        )
      }
    }

    return (
      <div className={classes.FormContainer}>
        <Modal
          show={this.state.modalOpen}
          modalClosed={this.onCancelConfirmation}
        >
          {modalInfo}
        </Modal>
        <Title
          titleName="bancoForm.title"
          >
        </Title>
        <form onSubmit={this.onShowConfirmation}>
          <div className={classes.Form}>
          {formElements}
          </div>
          <div className={classes.Form_Submit}>
            <Button
              btnType="Success"
              disabled={!this.state.formIsValid}
            >
              <FormattedMessage id="saveButton"/>
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    selectedItems: state.selList.selList,
    formError: state.errors.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetError: (err) => dispatch(actions.setError(err)),
    onClearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BancoForm, axios))
