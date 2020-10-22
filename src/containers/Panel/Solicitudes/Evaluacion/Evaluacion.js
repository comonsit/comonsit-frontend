import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import axios from '../../../../store/axios-be.js'

import classes from './Evaluacion.module.scss';
import SolicitudDetail from '../SolicitudDetail/SolicitudDetail';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Currency from '../../../../components/UI/Formatting/Currency';
import Percent from '../../../../components/UI/Formatting/Percent';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import TextElement from '../../../../components/UI/TextElement/TextElement';
import Title from '../../../../components/UI/Title/Title';
import { updateObject } from '../../../../store/reducers/utility';
import { checkValidity } from '../../../../utilities/validity';


class Evaluacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      selectedSol: this.props.selectedSol,
      saldosAcopios: this.props.saldosAcopios,
      saldoAportaciones: null,
      evaluacionForm: {
        monto_aprobado: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '9999999',
            min: '0',
            step: '.01',
            placeholder: '$__.__'
          },
          label:  (<><FormattedMessage id="evaluacion.montoAprobado"/>*</>),
          value: "",
          validation: {
            required: true,
            isDecimal: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        plazo_aprobado: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: '# meses'
          },
          label:  (<><FormattedMessage id="evaluacion.plazoPagoAprobado"/>*</>),
          value: "",
          validation: {
            required: true,
            isNumeric: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        tasa_aprobada: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '100',
            min: '1',
            step: '.0001',
            placeholder: '4.00%'
          },
          label:  (<><FormattedMessage id="evaluacion.tasa_aprobada"/>*</>),
          value: "",
          validation: {
            required: true,
            isDecimalExact: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        tasa_mor_aprobada: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '100',
            min: '1',
            step: '.0001',
            placeholder: '1.00%'
          },
          label:  (<><FormattedMessage id="evaluacion.tasa_mor_aprobada"/>*</>),
          value: "",
          validation: {
            required: true,
            isDecimalExact: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        comentarios_gerente: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            placeholder: '..',
            maxLength: '100'
          },
          label:  (<FormattedMessage id="evaluacion.comentariosGerente"/>),
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
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    axios.get('/movimientos/saldo/?clave_socio='+this.props.selSocioSaldo, authData)
      .then(response => {
        this.setState({saldoAportaciones: response.data.saldo})
      })
      .catch(error => {
        // TODO:
      })
  }

  onApproveForm = event => {
    event.preventDefault();
    this.onSubmitForm('AP')
  }

  onNegotiateForm = event => {
    event.preventDefault();
    if (!this.state.evaluacionForm.comentarios_gerente.value) {
      alert('Por favor agrega algún comentario para enviar a Negociación')
    } else {
      this.onSubmitForm('NE')
    }
  }

  onDisapproveForm = event => {
    event.preventDefault();
    if (!this.state.evaluacionForm.comentarios_gerente.value) {
      alert('Por favor agrega algún comentario del porqué estás rechazando')
    } else {
      this.onSubmitForm('CA')
    }
  }

  onSubmitForm = status => {
    let formData = {}
    if (status === 'AP') {
      for (let formElementIdentifier in this.state.evaluacionForm) {
        formData[formElementIdentifier] = this.state.evaluacionForm[formElementIdentifier].value
      }
    }

    //// TODO: eliminate estatus data with working workflow
    formData = {
      ...formData,
      estatus_evaluacion: status,
      chat: [{'comentario': this.state.evaluacionForm.comentarios_gerente.value}]
    }


    const authData = {
      headers: {'Authorization': `Bearer ${this.props.token}`}
    }
    // TODO: implement loading view
    // this.setState({loading: true})

    // TODO: check
    axios.patch('/solic-creditos/' +this.props.selectedSol.folio_solicitud+'.json', formData, authData)
      .then(response => {
        // this.setState({loading: false})
        // this.props.updateUser(response.data)
        // console.log('CAMBIAR STATUS === AP POR:')
        if (status === 'AP') {
          alert('Solicitud de Crédito aprobado correctamente. Contrato: ' + response.data.contrato + ' creado.')
        } else if (status === 'NE') {
          alert('Solicitud de Crédito enviada a negociación')
        } else {
          alert('Solicitud de Crédito rechazada permanentemente')
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
    const updatedFormElement = updateObject(this.state.evaluacionForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.evaluacionForm[inputIdentifier].validation),
      touched: true
    })

    let updatedForm = updateObject(this.state.evaluacionForm, {
      [inputIdentifier]: updatedFormElement
    })

    let formIsValid = true
    for (let inputIds in updatedForm) {
      formIsValid = updatedForm[inputIds].valid && formIsValid
    }

    this.setState({evaluacionForm: updatedForm, formIsValid: formIsValid})
  }

  render () {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const evaluacionFormOrder = [
      "monto_aprobado",
      "plazo_aprobado",
      "tasa_aprobada",
      "tasa_mor_aprobada",
      "comentarios_gerente"
    ]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let formElements, solicitudInfo = <Spinner/>

    evaluacionFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.evaluacionForm[key]
      })
    })

    if (!this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        return (
          <div key= {formElement.id}>
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
              />
            </div>
          </div>
        )
      })
    }

    formClasses.push(classes.noScroll)

    const updatedRedirect = (this.props.updated) ? <Redirect to="/solicitudes"/> : null

    // TODO: improve code!!
    const processes = ['cf', 'ja', 'mi', 'sl']
    let thisYearTotBal = 0
    let lastYearTotBal = 0
    let solvencia = 0

    if (this.state.selectedSol && this.state.saldosAcopios) {
      if  (this.state.selectedSol.clave_socio === this.props.selSocioSaldo) {
        solicitudInfo = (
          <SolicitudDetail
            saldos={this.state.saldosAcopios}
            solicitud={this.props.selectedSol}
          />
        )
        const currentYear = new Date().getFullYear()
        const thisYear = this.state.saldosAcopios.find(bal => bal.fecha__year === currentYear)
        const lastYear = this.state.saldosAcopios.find(bal => bal.fecha__year === (currentYear-1))

        thisYearTotBal = thisYear ? processes.reduce((acc, pr) => acc + thisYear['year_sum_'+pr], 0) : 0
        lastYearTotBal = lastYear ? processes.reduce((acc, pr) => acc + lastYear['year_sum_'+pr], 0) : 0

        solvencia = (thisYearTotBal > 0) ? this.props.selectedSol.monto_solicitado / thisYearTotBal : 'NA'

      } else {
        // TODO: Unnecessary alert?
        alert('Algo falló!!!!! Revisar con Mauricio')
      }
    }

    let sugerido = <Spinner/>
    // TODO: permanent spinner if socio has no aportaciones
    if (this.state.saldoAportaciones) {
      sugerido = (
        <div>
          <p><FormattedMessage id="evaluacion.30saldo"/><Currency value={this.state.saldoAportaciones*.3}/></p>
          <p><FormattedMessage id="evaluacion.50saldo"/><Currency value={this.state.saldoAportaciones*.5}/></p>
        </div>
      )
    }

    return (
      <div className={classes.FormContainer}>
        <Title titleName="mesaControl.title"/>
        <div className={classes.FormContainer_extra}>
          <div className={classes.FormContainer_extraInfo}>
            <h3><FormattedMessage id="evaluacion.infoDeSoporte" /></h3>
            <div className={classes.FormContainer_extraInfoData}>
              {solicitudInfo}
              <div className={classes.InfoContainer}>
                <div className={classes.SubSection}>
                  <div className={classes.SubTitle}>
                    <h3><FormattedMessage id="evaluacion.solvencia"/></h3>
                  </div>
                  <TextElement
                    label={"evaluacion.volumenIngresosPresente"}
                    content={<Currency value={thisYearTotBal}/>}
                  />
                  <TextElement
                    label={"evaluacion.volumenIngresosAnterior"}
                    content={<Currency value={lastYearTotBal}/>}
                  />
                  <TextElement
                    label={"evaluacion.nivelSolvencia"}
                    content={<Percent value={solvencia}/>}
                  />
                </div>
                <div className={classes.SubSection}>
                  <div className={classes.SubTitle}>
                    <h3><FormattedMessage id="evaluacion.ultimoCredito"/></h3>
                  </div>
                  <TextElement
                    label={"evaluacion.UltimoCreditoMonto"}
                    content={"-------"}
                  />
                  <TextElement
                    label={"evaluacion.UltimoCreditoEstatus"}
                    content={"-------"}
                  />
                  <TextElement
                    label={"evaluacion.UltimoCreditoVida"}
                    content={"-------"}
                  />
                  <TextElement
                    label={"evaluacion.UltimoCreditoTotal"}
                    content={"-------"}
                  />
                </div>
                <div className={classes.SubSection}>
                  <div className={classes.SubTitle}>
                    <h3><FormattedMessage id="evaluacion.morosidad"/></h3>
                  </div>
                  <TextElement
                    label={"evaluacion.morosidadSocio"}
                    content={"-------"}
                  />
                  <TextElement
                    label={"evaluacion.morosidadComunidad"}
                    content={"-------"}
                  />
                  <TextElement
                    label={"evaluacion.morosidadRegion"}
                    content={"-------"}
                  />
                </div>
                <div className={classes.SubSection}>
                  <div className={classes.SubTitle}>
                    <h3><FormattedMessage id="evaluacion.posibleCredito"/></h3>
                  </div>
                  <TextElement
                    label={"evaluacion.nivelRiesgo"}
                    content={"-------"}
                  />
                  <TextElement
                    label={"evaluacion.montoSugerido"}
                    content={sugerido}
                  />
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={this.onApproveForm.bind(this)}
            className={classes.FormDiv}
            >
            <h2><FormattedMessage id="mesaControl.evaluacion"/></h2>
            <div className={formClasses.join(' ')}>
              {formElements}
            </div>
            <div className={classes.Form_Submit}>
              <Button
                btnType="Success"
                disabled={!this.state.formIsValid}>
                <FormattedMessage id="approveButton"/>
              </Button>
              <Button
                btnType="Success"
                clicked={this.onNegotiateForm.bind(this)}
              >
                <FormattedMessage id="negotiateButton"/>
              </Button>
              <Button
                btnType="Danger"
                clicked={this.onDisapproveForm.bind(this)}
                >
                <FormattedMessage id="disapproveButton"/>
              </Button>
            </div>
            {updatedRedirect}
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.solicitudes.loading,
    updated: state.solicitudes.updated,
    selectedSol: state.solicitudes.selectedSolicitud,
    saldosAcopios: state.acopios.socioSaldo,
    selSocioSaldo: state.acopios.selSocio,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onApproveSolForm: (token) => dispatch(actions.approveSolForm(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Evaluacion, axios))
