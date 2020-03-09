import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import axios from '../../../../store/axios-be.js'

import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Title from '../../../../components/UI/Title/Title';
import classes from './MesaControl.module.css'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


class MesaControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      mesaControlForm: {
        pregunta_0: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label:  (<FormattedMessage id="mesaControl.pregunta_0"/>),
          longLabel: true,
          value: false,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        pregunta_1: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label:  (<><FormattedMessage id="mesaControl.pregunta_1"/>*</>),
          longLabel: true,
          value: false,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        pregunta_2: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label:  (<><FormattedMessage id="mesaControl.pregunta_2"/>*</>),
          longLabel: true,
          value: false,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        pregunta_3: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label:  (<><FormattedMessage id="mesaControl.pregunta_3"/>*</>),
          longLabel: true,
          value: false,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        pregunta_4: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label:  (<><FormattedMessage id="mesaControl.pregunta_4"/>*</>),
          longLabel: true,
          value: false,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        comentarios_coordinador: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            placeholder: '..',
            maxLength: '100'
          },
          label:  (<FormattedMessage id="mesaControl.comentarios_coordinador"/>),
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

  componentWillUnmount() {
  }

  onApproveForm = event => {
    event.preventDefault();
    this.onSubmitForm('AP')
  }
  onDisapproveForm = event => {
    event.preventDefault();
    if (!this.state.mesaControlForm.comentarios_coordinador.value) {
      alert('Por favor agrega algún comentario del porqué estás rechazando')
    } else {
      this.onSubmitForm('RE')
    }
  }

  onSubmitForm = status => {
    const form = {
        comentarios_coordinador: this.state.mesaControlForm.comentarios_coordinador.value,
        estatus_solicitud: status
    }

    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    // TODO: implement loading view
    // this.setState({loading: true})

    axios.patch('/solic-creditos/'+this.props.selectedSol.folio_solicitud+'.json', form, authData)
      .then(response => {
        // this.setState({loading: false})
        // this.props.updateUser(response.data)
        if (status === 'AP') {
          alert('Solicitud de Crédito aprobado correctamente')
        } else {
          alert('Solicitud de Crédito rechazada y enviada a promotor')
        }
        // push or pop back to history?
        this.props.history.push('solicitudes');
        //dispatch update user data
      })
      .catch(error => {
        this.setState({loading: true})
      })
    // this.props.onApproveSolForm(this.props.token)
  }

  inputChangedHandler = (event, inputIdentifier) => {


    const updatedFormElement = updateObject(this.state.mesaControlForm[inputIdentifier], {
        value: this.state.mesaControlForm[inputIdentifier].elementType === 'checkbox' ? event.target.checked : event.target.value,
        valid: checkValidity(event.target.value, this.state.mesaControlForm[inputIdentifier].validation),
        touched: true
    })

    let updatedForm = updateObject(this.state.mesaControlForm, {
        [inputIdentifier]: updatedFormElement
    })

    let formIsValid = true
    for (let inputIds in updatedForm) {
      // Verify all questions are checked
      if (updatedForm[inputIds].elementType === 'checkbox') {
        formIsValid = updatedForm[inputIds].value && formIsValid
      }
      formIsValid = updatedForm[inputIds].valid && formIsValid
    }

    this.setState({mesaControlForm: updatedForm, formIsValid: formIsValid})
  }

  render () {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const mesaControlFormOrder = ["pregunta_0", "pregunta_1", "pregunta_2", "pregunta_3", "pregunta_4", "comentarios_coordinador"]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let formElements, solicitudInfo = <Spinner/>

    mesaControlFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.mesaControlForm[key]
      })
    })

    if (!this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        return (
          <div
            key= {formElement.id}
            >
            <div className={classes.Inputs}>
              <Input
                label={formElement.config.label}
                labelLong={formElement.config.longLabel}
                key= {formElement.id}
                elementType={formElement.config.elementType }
                elementConfig={formElement.config.elementConfig }
                value={formElement.config.value}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                disabled={this.props.loading}
                hide={formElement.config.hide}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            </div>
          </div>
            )
      })
    }

    formClasses.push(classes.noScroll)



    const updatedRedirect = (this.props.updated) ? <Redirect to="/solicitudes"/> : null

    if (this.props.selectedSol) {
      solicitudInfo = (
        <div className={classes.infoDiv}>
          <h2><FormattedMessage id="mesaControl.solicitud"/></h2>
          <h3><FormattedMessage id="mesaControl.datos"/></h3>
          <p><b><FormattedMessage id="nombre_productor"/>:</b> {this.props.selectedSol.nombre_productor}</p>
          <p><b><FormattedMessage id="clave"/>:</b> {this.props.selectedSol.clave_socio}</p>
          <p><b><FormattedMessage id="comunidad"/>:</b> {this.props.selectedSol.comunidad}</p>
          <p><b><FormattedMessage id="region"/>:</b> {this.props.selectedSol.region}</p>
          <p><b><FormattedMessage id="folio"/>:</b> {this.props.selectedSol.folio_solicitud}</p>
          <p><b><FormattedMessage id="area_proceso"/>:</b> ¿¿??</p>

          <h3><FormattedMessage id="mesaControl.descripcion"/></h3>
          <p><b><FormattedMessage id="monto"/>:</b> ${this.props.selectedSol.monto_solicitado}</p>
          <p><b><FormattedMessage id="tipo_credito"/>:</b> {this.props.selectedSol.tipo_credito}</p>
          <p><b><FormattedMessage id="interes_mensual"/>:</b> 4% (¿automático?)</p>
          <p><b><FormattedMessage id="forma_pago"/>:</b> Efectivo (¿automático?)</p>
          <p><b><FormattedMessage id="mesaControl.ingresos_de_cooperativa"/>:</b> ¿¿ingresos coop??</p>
          <p><b><FormattedMessage id="prestamo_sobre_ingresos"/>:</b> {this.props.selectedSol.monto_solicitado} / ingresos_cooperativa *100%</p>
          <p><b><FormattedMessage id="mesaControl.tiempoSolicitud"/>:</b> {this.props.selectedSol.plazo_de_pago_solicitado}</p>
          <br/>
          ¡GRAFIQUITA AQUÍ!

          <p><b><FormattedMessage id="aval"/>:</b> {this.props.selectedSol.aval_nombre}</p>
          <p><b><FormattedMessage id="justificacion"/>:</b> ¿¿comentarios promotor?? {this.props.selectedSol.comentarios_promotor} </p>

          <h3><FormattedMessage id="mesaControl.observaciones"/></h3>
          <p><b><FormattedMessage id="mesaControl.promotResponsable"/>:</b> {this.props.selectedSol.promotor}</p>
          <p><b><FormattedMessage id="cargo"/>:</b> {this.props.selectedSol.cargo}</p>
          <p><b><FormattedMessage id="cargo_coop"/>:</b> {this.props.selectedSol.cargo_coop}</p>
          <p><b><FormattedMessage id="cargo_mision"/>:</b> ¿¿cargo misión??</p>
          <p><b><FormattedMessage id="ingreso_a_YA"/>:</b> {this.props.selectedSol.fecha_ingr_yomol_atel}</p>
          <p><b><FormattedMessage id="mesaControl.porc_acopio_por_anio"/>:</b> ¿¿??</p>
          <br/>
          <p><b><FormattedMessage id="mesaControl.familiaresYA"/>:</b> ¿¿??</p>
        </div>
      )
    }

    return (
      <>
        <Title
          titleName="mesaControl.title"/>
        {solicitudInfo}
        <hr/>
        <form
          onSubmit={this.onApproveForm.bind(this)}
          className={classes.FormDiv}
          >
          <h2><FormattedMessage id="mesaControl.revisionCoord"/></h2>
          <div className={formClasses.join(' ')}>
          {formElements}
          </div>
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}>
            <FormattedMessage id="approveButton"/>
          </Button>
          <Button
            btnType="Danger"
            clicked={this.onDisapproveForm.bind(this)}
            >
            <FormattedMessage id="disapproveButton"/>
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
      selectedSol: state.solicitudes.selectedSolicitud,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      // onApproveSolForm: (token) => dispatch(actions.approveSolForm(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MesaControl, axios))
