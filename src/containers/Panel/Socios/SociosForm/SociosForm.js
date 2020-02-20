import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'
import axios from '../../../../store/axios-be.js'

import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import classes from './SociosForm.module.css'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


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
            required: true
          },
          valid: !this.props.new,
          touched: false,
        },
        apellidos: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="apellidos"/>*</>),
          value: this.props.selSocio.apellidos,
          validation: {
            required: true
          },
          valid: !this.props.new,
          touched: false,
        },
        comunidad: {
          elementType: 'select',
          elementConfig: {
            options: this.props.comunidades.map(r => ({"value": r.id, "displayValue": r.nombre_de_comunidad+' - '+r.nombre_region}))
          },
          label: (<><FormattedMessage id="socioForm.comunidad"/>*</>),
          value: this.props.selSocio.comunidad,
          validation: {
            required: true
          },
          valid: true,
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
            required: false
          },
          valid: true,
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
            maxLength: 10,
            isNumeric: true
          },
          valid: true,
          touched: true,
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
          touched: false,
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
          touched: false,
        },
        cargo: {
          elementType: 'select',
          elementConfig: {
            options: this.props.cargos.map(r => ({"value": r.id, "displayValue": r.nombre_de_cargo}))
          },
          label: (<><FormattedMessage id="socioForm.cargo"/>*</>),
          value: this.props.selSocio.cargo,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        },
        cargo_coop: {
          elementType: 'select',
          elementConfig: {
            options: this.props.cargosCoop.map(r => ({"value": r.id, "displayValue": r.nombre_cargo_coop}))
          },
          label: (<><FormattedMessage id="socioForm.cargoCoop"/>*</>),
          value: this.props.selSocio.cargo_coop,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        },
        empresa: {
          elementType: 'select',
          elementConfig: {
            options: this.props.empresas.map(r => ({"value": r.id, "displayValue": r.nombre_empresa}))
          },
          label: (<><FormattedMessage id="empresa"/>*</>),
          value: this.props.selSocio.empresa,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        },
        productor: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: (<FormattedMessage id="socioForm.productor"/>),
          value: this.props.selSocio.productor,
          validation: {
            required: false,
            pairedWith: 'trabajador'
          },
          valid: true,
          touched: false,
        },
        trabajador: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: (<FormattedMessage id="socioForm.trabajador"/>),
          value: this.props.selSocio.trabajador,
          validation: {
            required: false,
            pairedWith: 'productor'
          },
          valid: true,
          touched: false,
        },
        clave_anterior: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: ''
          },
          label: (<FormattedMessage id="socioForm.clave_anterior"/>),
          value: this.props.selSocio.clave_anterior,
          validation: {
            required: false
          },
          valid: true,
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
          touched: true,
        },
        estatus_gral: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'AC', displayValue: 'ACTIVO'},
              {value: 'NP', displayValue: 'No Participa'},
              {value: 'BA', displayValue: 'Baja'},
            ]
          },
          label: (<p><FormattedMessage id="socioForm.estatus_gral"/>*</p>),
          value: this.props.selSocio.estatus_gral,
          validation: {
            required: true
          },
          valid: true,
          touched: true,
        },
      }
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.setState({editing: false})
    }
  }

  componentDidMount () {

  }

  onSubmitForm = (event) => {
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
    let additional, updatedFormElement
    let pairedValidation = true

    // Special case for chaining checkbox into single Validation value
    if (inputIdentifier === 'trabajador' || inputIdentifier === 'productor') {
      additional = this.state.socioForm[this.state.socioForm[inputIdentifier].validation.pairedWith].value
      updatedFormElement = updateObject(this.state.socioForm[inputIdentifier], {
          value: event.target.checked,
          touched: true
      })
      pairedValidation = checkValidity(event.target.checked, this.state.socioForm[inputIdentifier].validation, additional)

    } else {
      updatedFormElement = updateObject(this.state.socioForm[inputIdentifier], {
          value: event.target.value,
          valid: checkValidity(event.target.value, this.state.socioForm[inputIdentifier].validation),
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

    if (!pairedValidation) {
      alert("Por favor agrega al menos Productor o Trabajador como opción")
    }
    this.setState({socioForm: updatedSocioForm, formIsValid: formIsValid && pairedValidation})
  }

  onStartEditing = () => {
    this.setState({editing: true})
  }

  calculateAge = (birthdayString) => { // birthday is a date
    const birthday = new Date(birthdayString).toString() !== 'Invalid Date' ? new Date(birthdayString).getTime() : null
    if (birthday){
      const ageDate = new Date(Date.now() - birthday); // miliseconds from epoch
      return ageDate.getUTCFullYear() - 1970
    } else {
      return ""
    }
}

  render () {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const sociosFormOrder = ["nombres", "apellidos", "comunidad", "curp", "telefono", "fecha_nacimiento", "fecha_ingr_yomol_atel", "fecha_ingr_programa", "cargo", "cargo_coop", "empresa", "productor", "trabajador", "clave_anterior", "estatus_cafe", "estatus_miel", "estatus_yip", "estatus_gral"]
    const formElementsArray = []
    let supportData
    let formElements = <Spinner/>
    let submitButton, editButton

    sociosFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.socioForm[key]
      })
    })

    if (this.props.selSocio && ! this.props.loading) {
      formElements = formElementsArray.map(formElement => {
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
                disabled={!this.state.editing}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                {supportData}
            </div>
            )
      })
    }


    if (this.state.editing) {
      submitButton = <Button btnType="Success" disabled={!this.state.formIsValid}><FormattedMessage id="saveButton"/></Button>
      editButton = null
    } else if (this.props.new) {
      submitButton = null
      editButton = null
    } else {
      submitButton = null
      editButton = <Button clicked={this.onStartEditing} disabled={this.state.editing}><FormattedMessage id="editButton"/></Button>
    }

    return (
      <>
        <div className={classes.Header}>
          <h2><FormattedMessage id="socioForm.title"/>: {this.props.selSocio.clave_socio}</h2>
          {editButton}
        </div>
        <form onSubmit={this.onSubmitForm}>
          <div className={classes.Form}>
          {formElements}
          </div>
          {submitButton}
        </form>
      </>
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
      new: state.socios.newSocio
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onEditSocio: (socioData, id, token) => dispatch(actions.updateSocio(socioData, id, token)),
      onCreateNewSocio: (socioData, token) => dispatch(actions.createNewSocio(socioData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SociosForm, axios))
