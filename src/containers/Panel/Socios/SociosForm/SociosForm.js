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
          placeholder: 'Nombres'
        },
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
          placeholder: 'Apellidos'
        },
        value: this.props.selSocio.apellidos,
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
          placeholder: 'Teléfono'
        },
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
    }
  }

  componentDidMount () {

  }

  editHandler = () => {
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
              label={formElement.config.elementConfig.placeholder}
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
        <form onSubmit={this.orderHandler}>
          {formElements}
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
