import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import classes from './SociosForm.module.css'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'

// {"clave_socio": "Clave Socio",
// "nombres": "Nombre",
// "apellidos": "Apellidos",
// "nombre_de_comunidad": "Comunidad",
// "nombre_region": "Región",
// "curp": "CURP",
// "telefono": "Teléfono",
// "fecha_nacimiento": "Fecha de Nacimiento",
// "fecha_ingr_yomol_atel": "Ingreso a Yomol A'tel",
// "fecha_ingr_programa": "Ingreso a Comon Sit Ca'teltic",
// "cargo": "Cargo",
// "prod_trab": "Productor/Trabajador",
// "clave_anterior": "Clave Café",
// "estatus_cafe": "Estatus Café",
// "estatus_miel": "Estatus Miel",
// "estatus_yip": "Estatus Yip Antsetic",
// "estatus_gral": "Estatus General"
// }
class SociosForm extends Component {
  state = {
    editable: false,
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
        valid: false,
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
        valid: false,
        touched: false,
      },
      comunidad: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: "Ch'ich", displayValue: "Ch'ich"},
            {value: 'San Sebastiánito', displayValue: 'San Sebastiánito'},
            {value: 'Tulijá', displayValue: 'Tulijá'}
          ]
        },
        label: 'Comunidad',
        value: this.props.selSocio.comunidad.nombre_de_comunidad,
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      region: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'Ujcayil', displayValue: 'Ujcayil'},
            {value: 'San Sebastián', displayValue: 'San Sebastián'},
            {value: 'San Jerónimo', displayValue: 'San Jerónimo'}
          ]
        },
        label: 'Región',
        value: this.props.selSocio.comunidad.nombre_region,
        validation: {
          required: true
        },
        valid: false,
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
        valid: false,
        touched: false,
      },
      telefono: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
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
        valid: false,
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
        valid: false,
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
        valid: false,
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
        valid: false,
        touched: false,
      },
      cargo: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'Abatilel', displayValue: 'Abatilel'},
            {value: 'Poxtaywanej', displayValue: 'Poxtaywanej'},
          ]
        },
        label: 'Cargo',
        value: this.props.selSocio.cargo,
        validation: {
          required: true
        },
        valid: false,
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
        valid: false,
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
        valid: false,
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
        valid: false,
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
        valid: false,
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
        valid: false,
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
        valid: false,
        touched: false,
      },
    }
  }

  componentDidMount () {

  }

  onSubmitForm = () => {
    // TODO:
    // event.preventDefault();
    //
    // const formData = {}
    // for (let formElementIdentifier in this.state.socioForm) {
    //   formData[formElementIdentifier] = this.state.socioForm[formElementIdentifier].value
    // }
    //
    // const socio = {
    //     socioData: formData,
    //     userId: this.props.userId
    // }
    //
    // this.props.onEditSocio(socio, this.props.token)
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

  onToggleEditable = () => {
    this.setState(prevState => {
        return {editable: !prevState.editable}
    })
  }

  render () {
    // SINGLE SOCIO
    const formElementsArray = []
    let formElements
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
              changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
          ))
    }

    return (
      <>
        <div className={classes.Header}>
          <h1>{this.props.selSocio.clave_socio}</h1>
          <Button btnType="Success" disabled={!this.state.formIsValid}>Editar</Button>
        </div>
        <form onSubmit={this.onSubmitForm}>
          <div className={classes.Form}>
          {formElements}
          </div>
          <Button btnType="Success" disabled={!this.state.formIsValid}>Guardar</Button>
        </form>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      selSocio: state.socios.selectedSocio,
      token: state.auth.token
    }
}

export default connect(mapStateToProps)(SociosForm)
