import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';
import axios from '../../../../store/axios-be.js';
import _ from 'lodash';

import classes from './AcopioForm.module.scss'
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../components/UI/Modal/Modal';
import FormConfirmation from '../../../../components/UI/FormConfirmation/FormConfirmation';
import Title from '../../../../components/UI/Title/Title';
import ProcessSelector from '../../../../components/UI/ProcessSelector/ProcessSelector';
import SociosList from '../../Socios/SociosList/SociosList';
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


const status = {
  'CF': 'estatus_cafe',
  'MI': 'estatus_miel',
  'JA': 'estatus_yip',
  'SL': 'estatus_trabajador'
}


class AcopioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      modalOpen: false,
      searchSocio: false,
      confirmFormOpen: false,
      processOptions: {
            CF: 'NP',
            MI: 'NP',
            JA: 'NP',
            SL: 'NP'
      },
      acopioForm: {
        clave_socio: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="clave"/>*</>),
          value: '',
          validation: {
            required: true,
            isNumeric: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false,
          supportActions: {
            supportButton: (event) => this.onSearchSocio(event),
            loseFocus: () => this.searchByFocus('clave_socio'),
            suppButtLabelID: "searchSocio"
          }
        },
        fecha: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="fecha"/>*</>),
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
        tipo_de_producto: {
          elementType: 'icons',
          elementConfig: {
            type: 'icons'
          },
          label: (<><FormattedMessage id="producto"/>*</>),
          value: null,
          validation: {
            required: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
        kilos_de_producto: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
          },
          label:  (<><FormattedMessage id="acopioForm.kilos_de_producto"/>*</>),
          value: '',
          validation: {
            required: false,
            isDecimal: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
        ingreso: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
          },
          label:  (<><FormattedMessage id="acopioForm.ingreso"/>*</>),
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
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selSocio
      && (!prevProps.selSocio
      || this.props.selSocio.clave_socio !== prevProps.selSocio.clave_socio)
    ) {
      let newProceso = this.state.acopioForm.tipo_de_producto
      const newProcessValues = this.state.processOptions

      for (let id in status) {
        newProcessValues[id] = this.props.selSocio[status[id]]
      }
      newProceso = updateObject(this.state.acopioForm.tipo_de_producto, {
          value: null,
          valid: false,
          errorMessage: "",
          touched: false
      })


      const socioName = this.props.selSocio.nombres + ' ' + this.props.selSocio.apellido_paterno + ' ' + this.props.selSocio.apellido_materno
      const socioComunidad = this.props.comunidades.find(x => x.id === this.props.selSocio.comunidad).nombre_de_comunidad
      const updatedForm = updateObject(this.state.acopioForm, {
        tipo_de_producto: newProceso,
        clave_socio: updateObject(this.state.acopioForm.clave_socio, {
          supportData: socioName + ' de ' + socioComunidad
        })
      })

      this.setState({
        processOptions: newProcessValues,
        acopioForm: updatedForm,
        formIsValid: this.checkIfFormIsValid(updatedForm)
      });
    }
  }

  componentDidMount () {
    this.props.onInitSocios(this.props.token)
  }

  componentWillUnmount() {
    this.props.unSelSocio()
  }

  onSubmitForm = (event) => {
    event.preventDefault();

    const formData = {}
    for (let formElementIdentifier in this.state.acopioForm) {
      if (
        this.state.acopioForm[formElementIdentifier].validation.required
        || this.state.acopioForm[formElementIdentifier].value !== ''
      ) {
        formData[formElementIdentifier] = this.state.acopioForm[formElementIdentifier].value
      }
    }

    this.props.onCreateNewAcopio(formData, this.props.token)
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const validation = checkValidity(event.target.value, this.state.acopioForm[inputIdentifier].validation, true)
    // TODO: checkbox check unnecesary
    const value = this.state.acopioForm[inputIdentifier].elementType === 'checkbox'
      ? event.target.checked
      : event.target.value

    const updatedFormElement = updateObject(this.state.acopioForm[inputIdentifier], {
        value: value,
        valid: validation.valid,
        errorMessage: validation.errorMessage,
        touched: true
    })

    let updatedForm = updateObject(this.state.acopioForm, {
        [inputIdentifier]: updatedFormElement
    })

    this.setState({acopioForm: updatedForm, formIsValid: this.checkIfFormIsValid(updatedForm)})
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

  onSearchSocio = (event, element) => {
    event.preventDefault();
    this.setState({modalOpen: true, searchSocio: true})
  }

  cancelSearch =() => {
    this.setState({modalOpen: false, searchSocio: false, confirmFormOpen: false})
    this.props.unSelSocio()
  }

  selectSocio =(id) => {
    const updatedForm = updateObject(this.state.acopioForm, {
      clave_socio: updateObject(this.state.acopioForm.clave_socio, {
        value: id,
        valid: true,
        touched: true
      })
    })
    this.setState({
      modalOpen: false,
      searchSocio: false,
      acopioForm: updatedForm
    });
    this.props.onFetchSelSocios(this.props.token, id)
  }

  searchByFocus = inputIdentifier => {
    const value = this.state.acopioForm.clave_socio.value
    // TODO: validation of socio to search
    if (value && !isNaN(value)) {
      this.props.onFetchSelSocios(this.props.token, value)
    }
  }

  OnChooseProcess = current => {
    // event.preventDefault();
    const previous = this.state.acopioForm.tipo_de_producto.value
    if (
      previous !== current && this.props.selSocio &&
      this.props.selSocio[status[current]] === 'AC'
    ) {
      const newProcesses = updateObject(this.state.processOptions, {
        [previous]: this.props.selSocio[status[previous]],
        [current]: 'SEL'
      })

      // Hide Kilos option if not applicable
      const hideKilos = !(current === 'CF' || current === 'MI')

      const updatedForm = updateObject(this.state.acopioForm, {
        tipo_de_producto: updateObject(this.state.acopioForm.tipo_de_producto, {
          value: current,
          valid: true,
          touched: true
        }),
        kilos_de_producto: updateObject(this.state.acopioForm.kilos_de_producto, {
          hide: hideKilos,
          valid: true,
          value: '',
          validation: {
            required: !hideKilos,
            isDecimal: true
          },
          touched: true
        })
      })

      this.setState({
        processOptions: newProcesses,
        acopioForm: updatedForm,
        formIsValid: this.checkIfFormIsValid(updatedForm)
      })
    }
  }

  onShowConfirmation = event => {
    event.preventDefault();
    this.setState({modalOpen: true, confirmFormOpen: true})
  }

  render () {
    // SINGLE SOCIO
    const acopioFormOrder = [
      "clave_socio",
      "fecha",
      "tipo_de_producto",
      "kilos_de_producto",
      "ingreso"
    ]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let supportData
    let formElements, modalInfo = <Spinner/>

    acopioFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.acopioForm[key]
      })
    })

    if (!this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        const serverErrorMessage = _.get(this.props.formError, formElement.id, "")
        if (formElement.id === "tipo_de_producto" ) {
          return (
            <div
              key= {formElement.id}
              className={classes.Inputs}
            >
              <ProcessSelector
                label={formElement.id}
                processes={this.state.processOptions}
                clicked={this.OnChooseProcess}
              />
            </div>
              )
        } else {
          if (
            formElement.id === "kilos_de_producto" &&
            this.state.acopioForm.kilos_de_producto.value > 0 &&
            this.state.acopioForm.ingreso.value > 0
          ) {
            supportData = (
              <div className={classes.SupportData}>
                <p>
                  <FormattedMessage id="acopioForm.avg_price"/>
                  : {Math.round(this.state.acopioForm.ingreso.value / this.state.acopioForm.kilos_de_producto.value)}
                </p>
              </div>)
          } else {
            supportData = null
          }
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
                  />
              </div>
              {supportData}
            </div>
          )
        }
      })
    }

    formClasses.push(classes.noScroll)

    if (this.state.modalOpen) {
      if (this.props.listaSocios && this.state.searchSocio) {
        modalInfo = (
          <>
            <h3><FormattedMessage id="selectSocio"/></h3>
            <div className={classes.TableContainer}>
              <SociosList
                listaSocios={this.props.listaSocios}
                onClick={row => this.selectSocio(row.values.clave_socio)}
              />
            </div>
          </>
        )
       } else if (this.state.confirmFormOpen) {
        modalInfo = (
          <FormConfirmation
            formOrder={acopioFormOrder}
            formData={this.state.acopioForm}
            onSubmitAction={this.onSubmitForm}
            onCancelAction={() => this.setState({modalOpen: false, confirmFormOpen: false})}
          />
          )
       }
     }

    const updatedRedirect = (this.props.updated) ? <Redirect to="/acopios"/> : null


    return (
      <>
        <Modal
          show={this.state.modalOpen}
          modalClosed={this.cancelSearch}
        >
          {modalInfo}
        </Modal>
        <Title
          titleName="acopioForm.title"/>
        <form onSubmit={this.onShowConfirmation}>
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
    token: state.auth.token,
    loading: state.acopios.loading,
    updated: state.acopios.updated,
    listaSocios: state.socios.socios,
    selSocio: state.socios.selectedSocio,
    comunidades: state.generalData.comunidades,
    formError: state.errors.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitSocios: (token) => dispatch(actions.initSocios(token)),
    onCreateNewAcopio: (solData, token) => dispatch(actions.createNewAcopio(solData, token)),
    onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
    unSelSocio: () => dispatch(actions.unSelectSocio()),
    onClearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(AcopioForm, axios))
