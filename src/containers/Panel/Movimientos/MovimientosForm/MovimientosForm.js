import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'
import axios from '../../../../store/axios-be.js'

import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../components/UI/Modal/Modal';
import Title from '../../../../components/UI/Title/Title';
import SociosList from '../../Socios/SociosList/SociosList';
import classes from './MovimientosForm.module.css'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


class MovimientosForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      searchingOpen: false,
      selectingFor: null,
      movimientoForm: {
        clave_socio: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..clave del socio'
          },
          label: (<><FormattedMessage id="clave_socio"/>*</>),
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        fecha_entrega: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="movimientosForm.fecha_entrega"/>*</>),
          value: '',
          validation: {
            required: true,
            todayOrOlder: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        monto: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '9999999',
            min: '0'
          },
          label:  (<><FormattedMessage id="movimientosForm.monto"/>*</>),
          value: '',
          validation: {
            required: true,
            isNumeric: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        proceso: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'CF', displayValue: 'Café'},
              {value: 'MI', displayValue: 'Miel'},
              {value: 'JA', displayValue: 'Jabón'},
              {value: 'SL', displayValue: 'Salarios'},
            ]
          },
          label: (<><FormattedMessage id="movimientosForm.proceso"/>*</>),
          value: 'CF',
          validation: {
            required: true
          },
          valid: true,
          touched: true,
        },
        aportacion: {
          value: true,
          valid: true
        },
        tipo_de_movimiento: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'EF', displayValue: 'Efectivo'},
              {value: 'BA', displayValue: 'Banco'},
              {value: 'TR', displayValue: 'Transferencia'},
            ]
          },
          label: (<><FormattedMessage id="movimientos.tipo"/>*</>),
          value: 'BA',
          validation: {
            required: true
          },
          valid: true,
          touched: true,
        },
        responsable_entrega: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="movimientosForm.responsable_entrega"/>*</>),
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          hide: false
        },
        fecha_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="movimientosForm.fecha_banco"/>*</>),
          value: null,
          validation: {
            required: true,
            todayOrOlder: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        referencia_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="movimientosForm.referencia_banco"/>*</>),
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          hide: false
        }
      }
    }
  }


  componentDidMount () {
    this.props.onInitSocios(this.props.token)
  }

  componentWillUnmount() {
    this.props.unSelSocio()
  }

  onSubmitForm = (event) => {
    event.preventDefault();

    let formData = {}
    for (let formElementIdentifier in this.state.movimientoForm) {
      formData[formElementIdentifier] = this.state.movimientoForm[formElementIdentifier].value
    }

    // If data was hidden, values will not be sent to avoid confusion.
    if (this.state.movimientoForm.tipo_de_movimiento.value === 'EF') {
      formData = updateObject(formData, {
        fecha_banco: null,
        referencia_banco: null
      })
    }

    // if (this.props.new) {
      this.props.onCreateNewMovimiento(formData, this.props.token)
    // } else {
    //   this.props.onEditSocio(socio, this.props.selSocio.clave_socio, this.props.token)
    // }
  }

  inputChangedHandler = (event, inputIdentifier) => {


    const updatedFormElement = updateObject(this.state.movimientoForm[inputIdentifier], {
        value: this.state.movimientoForm[inputIdentifier].elementType === 'checkbox' ? event.target.checked : event.target.value,
        valid: checkValidity(event.target.value, this.state.movimientoForm[inputIdentifier].validation),
        touched: true
    })

    let updatedForm = updateObject(this.state.movimientoForm, {
        [inputIdentifier]: updatedFormElement
    })

    // TODO: Improve
    // Logic to hide or show Bank information
    const hide = {
        hide: true,
        valid: true,
        validation: {
          required: false
        }
    }

    const show = {
        hide: false,
        validation: {
          required: true
        }
    }

    if (inputIdentifier === 'tipo_de_movimiento') {
      if(event.target.value === 'EF') {
        updatedForm = updateObject(updatedForm, {
            fecha_banco: updateObject(updatedForm.fecha_banco, hide),
            referencia_banco: updateObject(updatedForm.referencia_banco, hide),
        })
      } else {
        updatedForm = updateObject(updatedForm, {
            fecha_banco: updateObject(updatedForm.fecha_banco, show),
            referencia_banco: updateObject(updatedForm.referencia_banco, show),
        })
      }
    }

    let formIsValid = true
    for (let inputIds in updatedForm) {
        formIsValid = updatedForm[inputIds].valid && formIsValid
    }

    this.setState({movimientoForm: updatedForm, formIsValid: formIsValid})
  }

  onSearchSocio = (event, element) => {
    event.preventDefault();
    this.setState({searchingOpen: true, selectingFor: element})
  }

  cancelSearch =() => {
    this.setState({searchingOpen: false})
    this.props.unSelSocio()
  }

  selectSocio =(id) => {
    const updatedForm = updateObject(this.state.movimientoForm, {
        clave_socio: updateObject(this.state.movimientoForm.clave_socio, {
            value: id,
            valid: true,
            touched: true
        })
    })
    this.setState({
      searchingOpen: false,
      movimientoForm: updatedForm
    });
    this.props.onFetchSelSocios(this.props.token, id)
  }

  onToggleType = result => {
    const updatedForm = updateObject(this.state.movimientoForm, {aportacion: {value: result, valid: true}})
    this.setState({movimientoForm: updatedForm });
  }

  render () {
    const movimientoFormOrder = ["clave_socio", "fecha_entrega", "monto", "proceso", "responsable_entrega", "tipo_de_movimiento", "fecha_banco", "referencia_banco"]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let sociosBusqueda = <Spinner/>
    let supportData, supportButton
    let formElements = <Spinner/>

    movimientoFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.movimientoForm[key]
      })
    })

    if (!this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        if (formElement.id === "clave_socio") {
          if (this.props.selSocio && this.props.selSocio.clave_socio === this.state.movimientoForm[formElement.id].value) {
            supportData = (
              <div className={classes.SupportData}>
                <p>{this.props.selSocio.nombres} {this.props.selSocio.apellido_paterno} {this.props.selSocio.apellido_materno} de {this.props.selSocio.comunidad}</p>
              </div>)
          }
          supportButton = (<Button btnType="Short" clicked={(event) => this.onSearchSocio(event, formElement.id)}><FormattedMessage id="searchSocio"/></Button>)
        } else {
          supportData = null
          supportButton = null
        }
        return (
          <div
            key= {formElement.id}
            >
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
                disabled={this.props.loading}
                hide={formElement.config.hide}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
              {supportButton}
            </div>
            {supportData}
          </div>
            )
      })
    }

     formClasses.push(classes.noScroll)



    const updatedRedirect = (this.props.updated) ? <Redirect to="/movimientos"/> : null

    if (this.state.searchingOpen && this.props.listaSocios) {
      sociosBusqueda = (
        <SociosList
          listaSocios={this.props.listaSocios}
          onClick={row => this.selectSocio(row.values.clave_socio)}
          />
      )
    }

    let aportacionClasses = [classes.Aportacion]
    let retiroClasses = [classes.Retiro]
    if (this.state.movimientoForm.aportacion.value) {
      aportacionClasses.push(classes.AportacionActive)
      retiroClasses.push(classes.RetiroInactive)
    } else {
      aportacionClasses.push(classes.AportacionInactive)
      retiroClasses.push(classes.RetiroActive)
    }

    return (
      <>
        <Modal
          show={this.state.searchingOpen}
          modalClosed={this.cancelSearch}>
          <h3>Búsqueda de Socios...pendiente</h3>
          <div
            className={classes.TableContainer}>
            {sociosBusqueda}
          </div>
        </Modal>
        <Title
          titleName="movimientosForm.title"/>
        <div className={classes.ToggleContainer}>
          <div
            onClick={() => this.onToggleType(true)}
            className={aportacionClasses.join(' ')}>
            <p>APORTACIÓN</p>
          </div>
          <div
            onClick={() => this.onToggleType(false)}
            className={retiroClasses.join(' ')}>
            <p>RETIRO</p>
          </div>
        </div>
        <form onSubmit={this.onSubmitForm}>
          <div className={formClasses.join(' ')}>
          {formElements}
          </div>
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}>
            <FormattedMessage id="saveButton"/>
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
      empresas: state.generalData.empresas,
      loading: state.movimientos.loading,
      updated: state.movimientos.updated,
      listaSocios: state.socios.socios,
      selSocio: state.socios.selectedSocio
    }
}

const mapDispatchToProps = dispatch => {
    return {
      //onEditSocio: (socioData, id, token) => dispatch(actions.updateSocio(socioData, id, token)),
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
      onCreateNewMovimiento: (solData, token) => dispatch(actions.createNewMovimiento(solData, token)),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
      unSelSocio: () => dispatch(actions.unSelectSocio())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MovimientosForm, axios))
