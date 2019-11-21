import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Socios.module.css'
import * as actions from '../../../store/actions'
import { updateObject } from '../../../store/reducers/utility'
import { checkValidity } from '../../../utilities/validity'

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
class Socios extends Component {
  state = {
    socioSeleccionado: false,
    editable: false,
    socioForm: {
      nombres: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Nombres'
        },
        value: '',
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
        value: '',
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
        value: '',
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

  componentDidMount () {
    this.props.onInitSocios(this.props.token)
  }

  fetchDetails =(id) => {
    this.setState({socioSeleccionado: true});
    this.props.onFetchSelSocios(this.props.token, id)
  }

  cancelSelected =() => {
    this.setState({ socioSeleccionado: false});
  }

  onToggleEditable = () => {
    this.setState(prevState => {
        return {editable: !prevState.editable}
    })
  }

  getStatusColor = (status) => {
    let st = null
    switch (status) {
      case ('AC'):
        st = <div className={classes.AC}></div>
        break;
      case ('BA'):
        st = <div className={classes.BA}></div>
        break;
      default:
        st = <div className={classes.NP}></div>
    }
    return st
  }

  render () {
    // SINGLE SOCIO
    const formElementsArray = []
    let socioData, selectedSocio, form
    for (let key in this.state.socioForm) {
      console.log(key + this.state.socioForm[key]);
      formElementsArray.push({
        id: key,
        config: this.state.socioForm[key]
      })
    }
    if (this.props.selSocio) {
      form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input
              label={formElement.config.elementConfig.placeholder}
              key= {formElement.id}
              elementType={formElement.config.elementType }
              elementConfig={formElement.config.elementConfig }
              value={this.props.selSocio[formElement.id] }
              shouldValidate={formElement.config.validation}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
          ))}
          <Button btnType="Success" disabled={!this.state.formIsValid}>Guardar</Button>
        </form>
      )      
    }


    // const labels = {
    //     "clave_socio": "Clave Socio",
    //     "nombres": "Nombre",
    //     "apellidos": "Apellidos",
    //     "nombre_de_comunidad": "Comunidad",
    //     "nombre_region": "Región",
    //     "curp": "CURP",
    //     "telefono": "Teléfono",
    //     "fecha_nacimiento": "Fecha de Nacimiento",
    //     "fecha_ingr_yomol_atel": "Ingreso a Yomol A'tel",
    //     "fecha_ingr_programa": "Ingreso a Comon Sit Ca'teltic",
    //     "cargo": "Cargo",
    //     "prod_trab": "Productor/Trabajador",
    //     "clave_anterior": "Clave Café",
    //     "estatus_cafe": "Estatus Café",
    //     "estatus_miel": "Estatus Miel",
    //     "estatus_yip": "Estatus Yip Antsetic",
    //     "estatus_gral": "Estatus General"
    // }
    // Object.keys(labels).map((key, i) => (
    //   console.log("UNO: " + labels[key])
    // ))
    // // TODO: eliminate when form has own component
    // if (this.props.selSocio) {
    //   if(this.state.editable) {
    //
    //   } else {
    //     selectedSocio = Object.keys(labels).map((key, i) => (
    //       <div className={classes.Element}>
    //         <label>{labels[key]}</label>
    //         :
    //         <p>{this.props.selSocio[key]}</p>
    //       </div>
    //     ))
    //   }
    // }



    // MAKE SOCIO LIST
    if (this.props.regiones) {
      console.log(this.props.regiones)
      socioData = this.props.regiones.map((s, i) => (
        <tr
          id={s.clave_socio + i}
          onClick={() => this.fetchDetails(s.clave_socio)}>
          <td>{s.clave_socio}</td>
          <td>{s.nombres} {s.apellidos}</td>
          <td>{s.comunidad.nombre_region}</td>
          <td>{s.comunidad.nombre_de_comunidad}</td>
          <td>{s.fecha_ingr_yomol_atel}</td>
          <td>{this.getStatusColor(s.estatus_cafe)}</td>
          <td>{this.getStatusColor(s.estatus_miel)}</td>
          <td>{this.getStatusColor(s.estatus_yip)}</td>
          <td>{this.getStatusColor(s.estatus_gral)}</td>
        </tr>
      ))
    }


    return (
      <>
        <Modal
          show={this.state.socioSeleccionado}
          modalClosed={this.cancelSelected}>
          {form}
        </Modal>
        <div className={classes.Container}>
          <h1>Socios</h1>
          <table className={classes.TablaSocios}>
          <tr>
            <th>Clave</th>
            <th>Nombre</th>
            <th>Región</th>
            <th>Comunidad</th>
            <th>Ingreso YA</th>
            <th>Café</th>
            <th>Miel</th>
            <th>Xapon</th>
            <th>Trabajador</th>
          </tr>
          <tbody>
            {socioData}
          </tbody>
          </table>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      regiones: state.socios.socios,
      selSocio: state.socios.selectedSocio,
      token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socios)
