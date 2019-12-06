import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'

import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../components/UI/Modal/Modal';
import Table from '../../../../components/UI/Table/Table'
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
      searchingOpen: false,
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
      // this.setState({editing: false})
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

  // onStartEditing = () => {
  //   this.setState({editing: true})
  // }

  onSearchSocio = () => {
    this.setState({searchingOpen: true})
  }

  cancelSearch =() => {
    this.setState({searchingOpen: false, socioSeleccionado: null})
    this.props.unSelSocio()
  }

  //// TODO: código duplicado de socios!!! eliminar y llamar de otro lado! o arreglar en backend
  getComunidad = (id) => {
    const index = this.props.comunidades.findIndex(x => x.id === id)
    return this.props.comunidades[index].nombre_de_comunidad
  }

  selectSocio =(id) => {
    const updatedForm = updateObject(this.state.solicitudForm, {
        clave_socio: updateObject(this.state.solicitudForm.clave_socio, {
            value: id
        })
    })
    this.setState({
      socioSeleccionado: {
        clave_socio: id,
      },
      searchingOpen: false,
      solicitudForm: updatedForm
    });
    this.props.onFetchSelSocios(this.props.token, id)
  }

  render () {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const sociosFormOrder = ["clave_socio", "fecha_solicitud", "tipo_credito", "act_productiva", "act_productiva_otro", "mot_credito", "mot_credito_otro", "emergencia_medica", "monto_solicitado", "plazo_de_pago_solicitado", "comentarios_promotor"]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let supportData, supportButton
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
          if (this.props.selSocio && this.state.solicitudForm.clave_socio.value) {
            supportData = (
              <div className={classes.SupportData}>
                <p>{this.props.selSocio.nombres} {this.props.selSocio.apellidos} de región {this.props.selSocio.region}</p>
              </div>)
          }
          supportButton = (<Button btnType="Short" clicked={this.onSearchSocio}><FormattedMessage id="solicitudForm.searchSocio"/></Button>)
        } else {
          supportData = null
          supportButton = null
        }
        return (
          <div>
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
              {supportButton}
            </div>
            {supportData}
          </div>
            )
      })
    }

     //////////////
     // Move to Socios or to separate container for listaSocios
     const sociosHeaders = ["socios.nombre", "socios.clave", "socios.comunidad", "socios.region", "socios.ingreso-ya", "socios.cafe", "socios.miel", "socios.jabon", "socios.general"]
     const colors = {
       'AC': "Green",
       'BA': "Red",
       'NP': "Gray"
     }
     const coloredColumns = {
       "socios.cafe": colors,
       "socios.miel": colors,
       "socios.jabon": colors,
       "socios.general": colors
     }
     let socioTableData
     formClasses.push(classes.noScroll)

     // TODO: Si el fetch de listasocios no está hecho va a tronar!!!
     // hacer fetch en inicialización, o mover a su propio container, o hacer fetch!!!
     if (this.props.listaSocios && this.props.comunidades) {

       socioTableData = this.props.listaSocios.map((s, i) => {
         return {
           "socios.nombre": s.nombres +' '+ s.apellidos,
           "socios.clave": s.clave_socio,
           "socios.comunidad": s.comunidad ? this.getComunidad(s.comunidad) : "",
           "socios.region": s.region ? s.region : "",
           "socios.ingreso-ya": s.fecha_ingr_yomol_atel,
           "socios.cafe": s.estatus_cafe,
           "socios.miel": s.estatus_miel,
           "socios.jabon": s.estatus_yip ,
           "socios.general": s.estatus_gral
         }
       })
     }



    const updatedRedirect = (this.props.updated && !this.state.editing) ? <Redirect to="/solicitudes"/> : null

    return (
      <>
        <Modal
          show={this.state.searchingOpen}
          modalClosed={this.cancelSearch}>
          <h3>Búsqueda de Socios...pendiente</h3>
          <div
            className={classes.TableContainer}>
            <Table
              headers={sociosHeaders}
              data={socioTableData}
              clicked={this.selectSocio}
              clickId={"socios.clave"}
              colors={coloredColumns}
              />
          </div>
        </Modal>
        <div className={classes.Header}>
          <h1><FormattedMessage id="solicitudForm.title"/></h1>
        </div>
        <form onSubmit={this.onSubmitForm}>
          <div className={formClasses.join(' ')}>
          {formElements}
          </div>
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}>
            <FormattedMessage id="solicitudForm.saveButton"/>
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
      loading: state.solicitudes.loading,
      updated: state.solicitudes.updated,
      listaSocios: state.socios.socios,
      selSocio: state.socios.selectedSocio,
      comunidades: state.auth.comunidades
      // new: state.solicitudes.newSolicitud
    }
}

const mapDispatchToProps = dispatch => {
    return {
      //onEditSocio: (socioData, id, token) => dispatch(actions.updateSocio(socioData, id, token)),
      onCreateNewSolicitud: (solData, token) => dispatch(actions.createNewSolicitud(solData, token)),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
      unSelSocio: () => dispatch(actions.unSelectSocio())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SolicitudForm)
