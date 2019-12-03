import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'

import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import classes from './SolicitudForm.module.css'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


class SolicitudForm extends Component {
  constructor(props) {
    super(props);
    //// TODO: this.props.map here should be done???
    this.state = {
      editing: true,
      formIsValid: false,
      solicitudForm: {
        clave_socio: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..clave del socio'
          },
          label: 'Nombres',
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        fecha_solicitud: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: 'Fecha de Solicitud',
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        tipo_credito: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'MC', displayValue: 'Microcrédito'},
              {value: 'CP', displayValue: 'Crédito Productivo'}
            ]
          },
          label: 'Tipo de Crédito',
          value: 'MC',
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        act_productiva: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'CA', displayValue: 'Cafetal'},
              {value: 'VI', displayValue: 'Viveros'},
              {value: 'HR', displayValue: 'Hortalizas'},
              {value: 'GE', displayValue: 'Ganado Vacuno (engorda)'},
              {value: 'GC', displayValue: 'Ganado Vacuno (pie de cría)'},
              {value: 'PE', displayValue: 'Ganado Porcino (engorda)'},
              {value: 'PC', displayValue: 'Ganado Porcino (pie de cría)'},
              {value: 'AT', displayValue: 'Aves de Traspatio'},
              {value: 'MI', displayValue: 'Milpa'},
              {value: 'EL', displayValue: 'Elaboración de Alimentos'},
              {value: 'ER', displayValue: 'Elaboración de Artesanía'},
              {value: 'HE', displayValue: 'Herramientas y Equipo de Trabajo'},
              {value: 'OT', displayValue: 'Otro'}
            ]
          },
          label: 'Actividad Productiva',
          value: 'CA',
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        act_productiva_otro: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..descripción'
          },
          label: 'OTRA',
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          hide: true
        },
        mot_credito: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'SA', displayValue: 'Salud'},
              {value: 'AL', displayValue: 'Alimento'},
              {value: 'TR', displayValue: 'Trabajo'},
              {value: 'ED', displayValue: 'Educación'},
              {value: 'FI', displayValue: 'Fiestas'},
              {value: 'OT', displayValue: 'Otro'}
            ]
          },
          label: 'Motivo de Crédito',
          value: 'TR',
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        mot_credito_otro: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..motivo'
          },
          label: 'OTRO',
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          hide: true
        },
        emergencia_medica: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: 'Emergencia Médica',
          value: false,
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          hide: false
        },
        monto_solicitado: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '9999999',
            min: '0'
          },
          label: 'Monto Solicitado',
          value: '',
          validation: {
            required: true,
            isNumeric: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        plazo_de_pago_solicitado: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: '..# meses'
          },
          label: 'Plazo de Pago',
          value: '',
          validation: {
            required: true,
            isNumeric: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        justificacion_credito: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..justificación'
          },
          label: 'Justificación',
          value: '',
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        comentarios_promotor: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            placeholder: '..',
            maxlength: '100'
          },
          label: 'Comentarios',
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          hide: false
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
    for (let formElementIdentifier in this.state.solicitudForm) {
      formData[formElementIdentifier] = this.state.solicitudForm[formElementIdentifier].value
    }

    //// TODO: eliminate estatus data with working workflow
    const solicitud = {
        ...formData,
        estatus_ej_credito: 'RV',
        estatus_evaluacion: 'RV',
        estatus_solicitud: 'RV'
    }

    // if (this.props.new) {
      this.props.onCreateNewSolicitud(solicitud, this.props.token)
    // } else {
    //   this.props.onEditSocio(socio, this.props.selSocio.clave_socio, this.props.token)
    // }
  }

  inputChangedHandler = (event, inputIdentifier) => {

    const updatedFormElement = updateObject(this.state.solicitudForm[inputIdentifier], {
        value: this.state.solicitudForm[inputIdentifier].elementType === 'checkbox' ? event.target.checked : event.target.value,
        valid: checkValidity(event.target.value, this.state.solicitudForm[inputIdentifier].validation),
        touched: true
    })

    let updatedForm = updateObject(this.state.solicitudForm, {
        [inputIdentifier]: updatedFormElement
    })

    //Hide/Show Other option
    if (inputIdentifier === 'mot_credito') {
      updatedForm = updateObject(updatedForm, {
          mot_credito_otro: updateObject(updatedForm.mot_credito_otro, {
              hide: event.target.value !== 'OT'
          })
      })
    } else if (inputIdentifier === 'act_productiva'  ) {
      updatedForm = updateObject(updatedForm, {
          act_productiva_otro: updateObject(updatedForm.act_productiva_otro, {
              hide: event.target.value !== 'OT'
          })
      })
    }

    let formIsValid = true
    for (let inputIds in updatedForm) {
        formIsValid = updatedForm[inputIds].valid && formIsValid
    }

    console.log(updatedForm);
    this.setState({solicitudForm: updatedForm, formIsValid: formIsValid})
  }

  onStartEditing = () => {
    this.setState({editing: true})
  }

  render () {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const sociosFormOrder = ["clave_socio", "fecha_solicitud", "tipo_credito", "act_productiva", "act_productiva_otro", "mot_credito", "mot_credito_otro", "emergencia_medica", "monto_solicitado", "plazo_de_pago_solicitado", "comentarios_promotor"]
    const formElementsArray = []
    let supportData
    let formElements = <Spinner/>

    sociosFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.solicitudForm[key]
      })
    })

    if (!this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        if (formElement.id === "clave_socio") {
          supportData = (
            <div className={classes.SupportData}>
              <p>...el nombre del socio automatizado...</p>
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
                hide={formElement.config.hide}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                {supportData}
            </div>
            )
      })
    }

    return (
      <>
        <div className={classes.Header}>
          <h1><FormattedMessage id="solicitudForm.title"/></h1>
        </div>
        <form onSubmit={this.onSubmitForm}>
          <div className={classes.Form}>
          {formElements}
          </div>
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}>
            <FormattedMessage id="solicitudForm.saveButton"/>
          </Button>
        </form>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token
      // new: state.socios.newSocio
    }
}

const mapDispatchToProps = dispatch => {
    return {
      //onEditSocio: (socioData, id, token) => dispatch(actions.updateSocio(socioData, id, token)),
      onCreateNewSolicitud: (solData, token) => dispatch(actions.createNewSolicitud(solData, token)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SolicitudForm))
