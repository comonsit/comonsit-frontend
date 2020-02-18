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
        empresa: {
          elementType: 'select',
          elementConfig: {
            options: this.props.empresas.map(r => ({"value": r.id, "displayValue": r.nombre_empresa}))
          },
          label: (<><FormattedMessage id="empresa"/>*</>),
          value: 1,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        },
        fecha_banco: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="movimientosForm.fecha_banco"/>*</>),
          value: '',
          validation: {
            required: true,
            todayOrOlder: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        aportacion: {
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox'
          },
          label: (<FormattedMessage id="movimientos.aportacion_retiro"/>),
          value: true,
          validation: {
            required: false,
            // pairedWith: 'trabajador'
          },
          valid: true,
          touched: false,
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

    const formData = {}
    for (let formElementIdentifier in this.state.movimientoForm) {
      formData[formElementIdentifier] = this.state.movimientoForm[formElementIdentifier].value
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

  render () {
    const movimientoFormOrder = ["clave_socio", "fecha_entrega", "monto", "empresa", "fecha_banco", "aportacion", "tipo_de_movimiento"]
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
                <p>{this.props.selSocio.nombres} {this.props.selSocio.apellidos} de región {this.props.selSocio.region}</p>
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
        <div className={classes.Header}>
          <h1><FormattedMessage id="movimientosForm.title"/></h1>
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
