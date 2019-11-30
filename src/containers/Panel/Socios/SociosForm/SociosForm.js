import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'

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
            placeholder: '..nombre'
          },
          label: 'Nombres',
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
            placeholder: '..apellidos'
          },
          label: 'Apellidos',
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
          label: 'Comunidad Región',
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
            placeholder: '..curp'
          },
          label: 'CURP',
          value: this.props.selSocio.curp,
          validation: {
            required: true
          },
          valid: !this.props.new,
          touched: false,
        },
        telefono: {
          elementType: 'input',
          elementConfig: {
            type: 'tel',
            placeholder: '..teléfono'
          },
          label: 'Teléfono',
          value: this.props.selSocio.telefono,
          validation: {
            required: true,
            minLength: 10,
            maxLength: 12,
            isNumeric: true
          },
          valid: !this.props.new,
          touched: false,
        },
        fecha_nacimiento: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: 'Fecha de Nacimiento',
          value: this.props.selSocio.fecha_nacimiento,
          validation: {
            required: true,
            isDate: true
          },
          valid: !this.props.new,
          touched: false,
        },
        fecha_ingr_yomol_atel: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: "Fecha ingreso a Yomol A'tel",
          value: this.props.selSocio.fecha_ingr_yomol_atel,
          validation: {
            required: true,
            isDate: true
          },
          valid: !this.props.new,
          touched: false,
        },
        fecha_ingr_programa: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: "Fecha ingreso a Programa",
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
          label: 'Cargo',
          value: this.props.selSocio.cargo,
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
          label: 'Productor',
          value: this.props.selSocio.productor,
          validation: {
            required: false
          },
          valid: true,
          touched: false,
        },
        trabajador: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: 'Trabajador',
          value: this.props.selSocio.trabajador,
          validation: {
            required: false
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
          label: 'Clave Café',
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
          label: 'Estatus Café',
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
          label: 'Estatus Miel',
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
          label: 'Estatus Yip Antsetic',
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
          label: 'Estatus General',
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


  componentDidMount () {

  }

  onSubmitForm = (event) => {
    event.preventDefault();
    this.setState({editing: false})


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

    const updatedFormElement = updateObject(this.state.socioForm[inputIdentifier], {
        value: this.state.socioForm[inputIdentifier].elementType === 'checkbox' ? event.target.checked : event.target.value,
        valid: checkValidity(event.target.value, this.state.socioForm[inputIdentifier].validation),
        // esto del touched me parece muy ineficiente e innecesario! es sólo para que no sea rojo al principio? :S
        touched: true
    })

    // por qué copiamos todo!?
    const updatedSocioForm = updateObject(this.state.socioForm, {
        [inputIdentifier]: updatedFormElement
    })

    let formIsValid = true
    for (let inputIds in updatedSocioForm) {
        formIsValid = updatedSocioForm[inputIds].valid && formIsValid
    }

    this.setState({socioForm: updatedSocioForm, formIsValid: formIsValid})
  }

  onStartEditing = () => {
    this.setState({editing: true})
  }

  calculateAge = (birthdayString) => { // birthday is a date
    const birthday = new Date(birthdayString).toString() !== 'Invalid Date' ? new Date(birthdayString).getTime() : null
    if (birthday){
      const ageDate = new Date(Date.now() - birthday); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return ""
    }
}

  render () {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const sociosFormOrder = ["nombres", "apellidos", "comunidad", "curp", "telefono", "fecha_nacimiento", "fecha_ingr_yomol_atel", "fecha_ingr_programa", "cargo", "productor", "trabajador", "clave_anterior", "estatus_cafe", "estatus_miel", "estatus_yip", "estatus_gral"]
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
        if (formElement.id == "fecha_nacimiento" || formElement.id == "fecha_ingr_yomol_atel") {
          supportData = (
            <div className={classes.SupportData}>
              <p>{this.calculateAge(formElement.config.value) + ' '} <FormattedMessage id="socioForm.age"/></p>
            </div>          )
        } else {
          supportData = null
        }
        return (
            <div className={classes.Inputs}>
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


    if (this.state.editing || this.props.new) {
      submitButton = <Button btnType="Success" disabled={!this.state.formIsValid}><FormattedMessage id="socioForm.saveButton"/></Button>
      editButton = null
    }else {
      submitButton = null
      editButton = <Button clicked={this.onStartEditing} disabled={this.state.editing}><FormattedMessage id="socioForm.editButton"/></Button>
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
      token: state.auth.token,
      regiones: state.auth.regiones,
      comunidades: state.auth.comunidades,
      cargos: state.auth.cargos,
      new: state.socios.newSocio
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onEditSocio: (socioData, id, token) => dispatch(actions.updateSocio(socioData, id, token)),
      onCreateNewSocio: (socioData, token) => dispatch(actions.createNewSocio(socioData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SociosForm)
