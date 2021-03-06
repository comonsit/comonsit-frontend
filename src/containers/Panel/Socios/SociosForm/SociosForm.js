import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import axios from '../../../../store/axios-be.js'
import { Route } from 'react-router-dom';
import _ from 'lodash';

import classes from './SociosForm.module.scss';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Title from '../../../../components/UI/Title/Title';
import * as actions from '../../../../store/actions';
import { isGerencia } from '../../../../store/roles';
import { updateObject } from '../../../../store/reducers/utility';
import { checkValidity } from '../../../../utilities/validity';


class SociosForm extends Component {
  constructor(props) {
    super(props);
    //// TODO: this.props.map here should be done???
    this.state = {
      editing: this.props.new,
      formIsValid: !this.props.new,
      socioForm: {
        nombres: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="nombres"/>*</>),
          value: this.props.selSocio.nombres,
          validation: {
            required: true,
          },
          valid: !this.props.new,
          errorMessage: "",
          touched: false,
        },
        apellido_paterno: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="apellido_paterno"/>*</>),
          value: this.props.selSocio.apellido_paterno,
          validation: {
            required: true,
          },
          valid: !this.props.new,
          errorMessage: "",
          touched: false,
        },
        apellido_materno: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="apellido_materno"/></>),
          value: this.props.selSocio.apellido_materno,
          validation: {
            required: false,
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        comunidad: {
          elementType: 'select',
          elementConfig: {
            options: this.props.comunidades.map(r => ({
              "value": r.id,
              "displayValue": r.nombre_de_comunidad+' - '+r.nombre_region
            }))
          },
          label: (<><FormattedMessage id="socioForm.comunidad"/>*</>),
          value: this.props.selSocio.comunidad,
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        curp: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<FormattedMessage id="socioForm.curp"/>),
          value: this.props.selSocio.curp,
          validation: {
            required: false,
            minLength: 18,
            maxLength: 18,
            isAlphaNumeric: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
        },
        telefono: {
          elementType: 'input',
          elementConfig: {
            type: 'tel',
            placeholder: '..'
          },
          label: (<FormattedMessage id="telefono"/>),
          value: this.props.selSocio.telefono,
          validation: {
            required: false,
            minLength: 10,
            isNumeric: true
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        fecha_nacimiento: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="socioForm.fecha_nacimiento"/>*</>),
          value: this.props.selSocio.fecha_nacimiento,
          validation: {
            required: true,
            isDate: true,
            todayOrOlder: true
          },
          valid: !this.props.new,
          errorMessage: "",
          touched: false,
        },
        genero: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'MA', displayValue: 'Masculino'},
              {value: 'FE', displayValue: 'Femenino'}
            ]
          },
          label: (<p><FormattedMessage id="socioForm.genero"/>*</p>),
          value: this.props.selSocio.genero,
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
        },
        fecha_ingr_yomol_atel: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="socioForm.fecha_ingr_yomol_atel"/>*</>),
          value: this.props.selSocio.fecha_ingr_yomol_atel,
          validation: {
            required: true,
            isDate: true,
            todayOrOlder: true
          },
          valid: !this.props.new,
          errorMessage: "",
          touched: false,
        },
        fecha_ingr_programa: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="socioForm.fecha_ingr_programa"/>*</>),
          value: this.props.selSocio.fecha_ingr_programa,
          validation: {
            required: true,
            isDate: true
          },
          valid: !this.props.new,
          errorMessage: "",
          touched: false,
        },
        cargo: {
          elementType: 'select',
          elementConfig: {
            options: this.props.cargos.map(r => ({
              "value": r.id,
              "displayValue": r.nombre_de_cargo
            }))
          },
          label: (<><FormattedMessage id="socioForm.cargo"/>*</>),
          value: this.props.selSocio.cargo,
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        cargo_coop: {
          elementType: 'select_mult',
          elementConfig: {
            options: this.props.cargosCoop.map(r => ({
              "value": r.id,
              "displayValue": r.nombre_cargo_coop
            }))
          },
          label: (<><FormattedMessage id="socioForm.cargoCoop"/>*</>),
          value: this.props.selSocio.cargo_coop,
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        empresa: {
          elementType: 'select',
          elementConfig: {
            options: this.props.empresas.map(r => ({
              "value": r.id,
              "displayValue": r.nombre_empresa
            }))
          },
          label: (<><FormattedMessage id="empresa"/>*</>),
          value: this.props.selSocio.empresa,
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        puesto: {
          elementType: 'select',
          elementConfig: {
            options: this.props.puestos.map(r => ({
              "value": r.id,
              "displayValue": r.puesto
            }))
          },
          label: (<><FormattedMessage id="puesto"/>*</>),
          value: this.props.selSocio.puesto,
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        fuente: {
          elementType: 'select',
          elementConfig: {
            options: this.props.fuentes.map(r => ({
              "value": r.id,
              "displayValue": r.fuente
            }))
          },
          label: (<><FormattedMessage id="fuente"/>*</>),
          value: this.props.selSocio.fuente,
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        clave_anterior: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: ''
          },
          label: <FormattedMessage id="socioForm.clave_anterior"/>,
          value: this.props.selSocio.clave_anterior,
          validation: {
            required: false,
            maxLength: 11
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        estatus_cafe: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'AC', displayValue: 'ACTIVO'},
              {value: 'NP', displayValue: 'No Participa'},
              {value: 'BA', displayValue: 'Baja'},
            ]
          },
          label: (<><FormattedMessage id="socioForm.estatus_cafe"/>*</>),
          value: this.props.selSocio.estatus_cafe,
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
        },
        estatus_miel: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'AC', displayValue: 'ACTIVO'},
              {value: 'NP', displayValue: 'No Participa'},
              {value: 'BA', displayValue: 'Baja'},
            ]
          },
          label: (<><FormattedMessage id="socioForm.estatus_miel"/>*</>),
          value: this.props.selSocio.estatus_miel,
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
        },
        estatus_yip: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'AC', displayValue: 'ACTIVO'},
              {value: 'NP', displayValue: 'No Participa'},
              {value: 'BA', displayValue: 'Baja'},
            ]
          },
          label: (<><FormattedMessage id="socioForm.estatus_yip"/>*</>),
          value: this.props.selSocio.estatus_yip,
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
        },
        estatus_trabajador: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'AC', displayValue: 'ACTIVO'},
              {value: 'NP', displayValue: 'No Participa'},
              {value: 'BA', displayValue: 'Baja'},
            ]
          },
          label: (<><FormattedMessage id="socioForm.estatus_trabajador"/>*</>),
          value: this.props.selSocio.estatus_trabajador,
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
        },
        estatus_comonSit: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'AC', displayValue: 'ACTIVO'},
              {value: 'NP', displayValue: 'No Participa'},
              {value: 'BA', displayValue: 'Baja'},
            ]
          },
          label: (<p><FormattedMessage id="socioForm.estatus_comonSit"/>*</p>),
          value: this.props.selSocio.estatus_comonSit,
          validation: {
            required: true
          },
          valid: true,
          errorMessage: "",
          touched: true,
        },
        doc_curp: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: (<FormattedMessage id="socioForm.doc_curp"/>),
          value: this.props.selSocio.doc_curp,
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        doc_domicilio: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: (<FormattedMessage id="socioForm.doc_domicilio"/>),
          value: this.props.selSocio.doc_domicilio,
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        doc_act_nac: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: (<FormattedMessage id="socioForm.doc_act_nac"/>),
          value: this.props.selSocio.doc_act_nac,
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        doc_ine: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: (<FormattedMessage id="socioForm.doc_ine"/>),
          value: this.props.selSocio.doc_ine,
          validation: {
            required: false
          },
          valid: true,
          errorMessage: "",
          touched: false,
        },
        doc_rfc: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: (<FormattedMessage id="socioForm.doc_rfc"/>),
          value: this.props.selSocio.doc_rfc,
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

  onSubmitForm = event => {
    event.preventDefault();

    const formData = {}
    for (let formElementIdentifier in this.state.socioForm) {
      formData[formElementIdentifier] = this.state.socioForm[formElementIdentifier].value
    }

    const socio = {
        ...formData
    }

    if (this.props.new) {
      this.props.onCreateNewSocio(socio, this.props.token)
    } else {
      this.props.onEditSocio(socio, this.props.selSocio.clave_socio, this.props.token)
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    let updatedFormElement

    const validation = checkValidity(event.target.value, this.state.socioForm[inputIdentifier].validation, true)

    // TODO: create a generic for checkboxes and multiples:
    if (inputIdentifier === 'cargo_coop') {
      updatedFormElement = updateObject(this.state.socioForm[inputIdentifier], {
          value: Array.from(event.target.selectedOptions, option => option.value),
          valid: validation.valid,
          errorMessage: validation.errorMessage,
          touched: true
      })
    } else {
      const value = this.state.socioForm[inputIdentifier].elementType === 'checkbox'
        ? event.target.checked
        : event.target.value
      updatedFormElement = updateObject(this.state.socioForm[inputIdentifier], {
        value: value,
        valid: validation.valid,
        errorMessage: validation.errorMessage,
        touched: true
      })
    }


    const updatedSocioForm = updateObject(this.state.socioForm, {
      [inputIdentifier]: updatedFormElement
    })

    let formIsValid = true
    for (let inputIds in updatedSocioForm) {
      formIsValid = updatedSocioForm[inputIds].valid && formIsValid
    }

    this.setState({socioForm: updatedSocioForm, formIsValid: formIsValid })
    if (this.props.formError && inputIdentifier in this.props.formError) {
      this.props.onClearError()
    }
  }

  onStartEditing = () => {
    this.setState({editing: true})
  }

  calculateAge = birthdayString => { // birthday is a date
    const birthday = new Date(birthdayString).toString() !== 'Invalid Date'
      ? new Date(birthdayString).getTime()
      : null
    if (birthday){
      const ageDate = new Date(Date.now() - birthday); // miliseconds from epoch
      return ageDate.getUTCFullYear() - 1970
    } else {
      return ""
    }
}

  render() {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const sociosFormOrder = [
      "nombres",
      "apellido_paterno",
      "apellido_materno",
      "comunidad",
      "curp",
      "telefono",
      "fecha_nacimiento",
      "fecha_ingr_yomol_atel",
      "fecha_ingr_programa",
      "cargo",
      "cargo_coop",
      "clave_anterior",
      "genero",
      "estatus_cafe",
      "estatus_miel",
      "estatus_yip",
      "estatus_trabajador",
      "estatus_comonSit",
      "empresa",
      "puesto",
      "fuente",
      "doc_curp",
      "doc_act_nac",
      "doc_ine",
      "doc_rfc",
      "doc_domicilio"
    ]
    const formElementsArray = []
    let supportData
    let formElements = <Spinner/>
    let submitButton, editButton, evaluacionButton = null

    sociosFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.socioForm[key]
      })
    })

    if (this.props.selSocio && ! this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        const serverErrorMessage = _.get(this.props.formError, formElement.id, "")
        if (formElement.id === "fecha_nacimiento" || formElement.id === "fecha_ingr_yomol_atel") {
          supportData = (
            <div className={classes.SupportData}>
              <p>{this.calculateAge(formElement.config.value) + ' '} <FormattedMessage id="socioForm.age"/></p>
            </div>          )
        } else {
          supportData = null
        }
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
              disabled={!this.state.editing}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
              {supportData}
          </div>
        )
      })
    }

    if (isGerencia(this.props.role)) {
      if (this.state.editing) {
        submitButton = (
          <div className={classes.Form_Submit}>
            <Button
              btnType="Success"
              disabled={!this.state.formIsValid}
            >
              <FormattedMessage id="saveButton"/>
            </Button>
          </div>
        )
        editButton = null
      } else if (this.props.new) {
        submitButton = null
        editButton = null
      } else {
        submitButton = null
        editButton = (
          <Button
            clicked={this.onStartEditing}
            disabled={this.state.editing}
          >
            <FormattedMessage id="editButton"/>
          </Button>
        )
        evaluacionButton = (
          <Route
            render={({ history}) => (
              <Button
                clicked={() => history.push('/evaluacion-socio')}
                btnType="Medium"
              >
                <FormattedMessage id="socios.evaluacionSocio"/>
              </Button>
            )}
          />
        )
      }
    }

    return (
      <div className={classes.FormContainer}>
        <Title
          titleName="socioForm.title"
          titleNameEx={": " + this.props.selSocio.clave_socio}
          titleType="ModalTitle"
        >
          {editButton}
        </Title>
        <form onSubmit={this.onSubmitForm}>
          <div className={[classes.Form, classes.ModalForm].join(' ')}>
            {formElements}
          </div>
          {submitButton}
        </form>
          {evaluacionButton}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selSocio: state.socios.selectedSocio,
    loading: state.socios.loading,
    updated: state.socios.updated,
    token: state.auth.token,
    comunidades: state.generalData.comunidades,
    cargos: state.generalData.cargos,
    cargosCoop: state.generalData.cargosCoop,
    empresas: state.generalData.empresas,
    fuentes: state.generalData.fuentes,
    puestos: state.generalData.puestos,
    role: state.auth.role,
    new: state.socios.newSocio,
    formError: state.errors.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEditSocio: (socioData, id, token) => dispatch(actions.updateSocio(socioData, id, token)),
    onCreateNewSocio: (socioData, token) => dispatch(actions.createNewSocio(socioData, token)),
    onClearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SociosForm, axios))
