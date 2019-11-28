import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'

import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import classes from './SociosForm.module.css'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


class SociosForm extends Component {
  constructor(props) {
    super(props);
    //// TODO: this.props.map here should be done???
    this.state = {
      editing: false,
      formIsValid: true,
      socioForm: {
        nombres: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Juan'
          },
          label: 'Nombres',
          value: this.props.selSocio.nombres,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        },
        apellidos: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Hernández Hernández'
          },
          label: 'Apellidos',
          value: this.props.selSocio.apellidos,
          validation: {
            required: true
          },
          valid: true,
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
            placeholder: 'AAAA571203A00'
          },
          label: 'CURP',
          value: this.props.selSocio.curp,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        },
        telefono: {
          elementType: 'input',
          elementConfig: {
            type: 'tel',
            placeholder: '9191110000'
          },
          label: 'Teléfono',
          value: this.props.selSocio.telefono,
          validation: {
            required: true,
            minLength: 10,
            maxLength: 12,
            isNumeric: true
          },
          valid: true,
          touched: false,
        },
        fecha_nacimiento: {
          elementType: 'input',
          elementConfig: {
            type: 'date',
            placeholder: '1957-12-03'
          },
          label: 'Fecha de Nacimiento',
          value: this.props.selSocio.fecha_nacimiento,
          validation: {
            required: true,
            isDate: true
          },
          valid: true,
          touched: false,
        },
        fecha_ingr_yomol_atel: {
          elementType: 'input',
          elementConfig: {
            type: 'date',
            placeholder: "1957-12-03"
          },
          label: "Fecha ingreso a Yomol A'tel",
          value: this.props.selSocio.fecha_ingr_yomol_atel,
          validation: {
            required: true,
            isDate: true
          },
          valid: true,
          touched: false,
        },
        fecha_ingr_programa: {
          elementType: 'input',
          elementConfig: {
            type: 'date',
            placeholder: "1957-12-03"
          },
          label: "Fecha ingreso a Programa",
          value: this.props.selSocio.fecha_ingr_programa,
          validation: {
            required: true,
            isDate: true
          },
          valid: true,
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
        prod_trab: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'PR', displayValue: 'Productor'},
              {value: 'TR', displayValue: 'Trabajador'},
            ]
          },
          label: 'Productor Trabajador',
          value: this.props.selSocio.prod_trab,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        },
        clave_anterior: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'XXX1234'
          },
          label: 'Clave Café',
          value: this.props.selSocio.clave_anterior,
          validation: {
            required: true
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
          touched: false,
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
          touched: false,
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
          touched: false,
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
          touched: false,
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

    this.props.onEditSocio(socio, this.props.selSocio.clave_socio, this.props.token)

  }

  inputChangedHandler = (event, inputIdentifier) => {
    // TODO:
    // ahora sí lo clonamos??? AAAHHH!
    const updatedFormElement = updateObject(this.state.socioForm[inputIdentifier], {
        value: event.target.value,
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
    console.log("Editable is: "+this.state.editing);
  }

  render () {
    // SINGLE SOCIO
    const formElementsArray = []
    // TODO: lógica de loading / Success / Failed pendiente!!
    let formElements = <div>**** UN SPINNER ****</div>
    let submitButton

    for (let key in this.state.socioForm) {
      console.log(key + this.state.socioForm[key]);
      formElementsArray.push({
        id: key,
        config: this.state.socioForm[key]
      })
    }
    if (this.props.selSocio) {
      formElements = formElementsArray.map(formElement => (
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
          ))
    }

    if (this.state.editing) {
      submitButton = <Button btnType="Success" disabled={!this.state.formIsValid}><FormattedMessage id="socioForm.saveButton"/></Button>
    }else {
      submitButton=null
    }

    return (
      <>
        <div className={classes.Header}>
          <h1>{this.props.selSocio.clave_socio}</h1>
          <Button
            btnType="Success"
            clicked={this.onStartEditing}
            disabled={this.state.editing}
            ><FormattedMessage id="socioForm.editButton"/></Button>
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
      token: state.auth.token,
      regiones: state.auth.regiones,
      comunidades: state.auth.comunidades,
      cargos: state.auth.cargos
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onEditSocio: (socioData, token) => dispatch(actions.updateSocio(socioData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SociosForm)
