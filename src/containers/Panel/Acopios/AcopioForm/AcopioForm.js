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
import classes from './AcopioForm.module.css'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


class AcopioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      searchingOpen: false,
      acopioForm: {
        clave_socio: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="clave"/>*</>),
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        fecha: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="fecha"/>*</>),
          value: '',
          validation: {
            required: true,
            todayOrOlder: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        tipo_de_producto: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'CF', displayValue: 'Cafe'},
              {value: 'MI', displayValue: 'Miel'},
              {value: 'JA', displayValue: 'Jabon'},
              {value: 'SL', displayValue: 'Salarios'}
            ]
          },
          label: (<><FormattedMessage id="acopioForm.tipo_de_producto"/>*</>),
          value: 'CF',
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        kilos_de_producto: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '9999999',
            min: '0'
          },
          label:  (<><FormattedMessage id="acopioForm.kilos_de_producto"/>*</>),
          value: '',
          validation: {
            required: true,
            isNumeric: true
          },
          valid: false,
          touched: false,
          hide: false
        },
        ingreso: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            max: '9999999',
            min: '0'
          },
          label:  (<><FormattedMessage id="acopioForm.ingreso"/>*</>),
          value: '',
          validation: {
            required: true,
            isNumeric: true
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

    const formData = {}
    for (let formElementIdentifier in this.state.acopioForm) {
      formData[formElementIdentifier] = this.state.acopioForm[formElementIdentifier].value
    }


    // if (this.props.new) {
      this.props.onCreateNewAcopio(formData, this.props.token)
    // } else {
    //   this.props.onEditAcopio(acopio, this.props.selAcopio.id, this.props.token)
    // }
  }

  inputChangedHandler = (event, inputIdentifier) => {


    // TODO: checkbox check unnecesary
    const updatedFormElement = updateObject(this.state.acopioForm[inputIdentifier], {
        value: this.state.acopioForm[inputIdentifier].elementType === 'checkbox' ? event.target.checked : event.target.value,
        valid: checkValidity(event.target.value, this.state.acopioForm[inputIdentifier].validation),
        touched: true
    })

    let updatedForm = updateObject(this.state.acopioForm, {
        [inputIdentifier]: updatedFormElement
    })

    let formIsValid = true
    for (let inputIds in updatedForm) {
        formIsValid = updatedForm[inputIds].valid && formIsValid
    }

    this.setState({acopioForm: updatedForm, formIsValid: formIsValid})
  }

  onSearchSocio = (event, element) => {
    event.preventDefault();
    this.setState({searchingOpen: true})
  }

  cancelSearch =() => {
    this.setState({searchingOpen: false})
    this.props.unSelSocio()
  }

  selectSocio =(id) => {

    const updatedForm = updateObject(this.state.acopioForm, {
        clave_socio: updateObject(this.state.acopioForm.clave_socio, {
            value: id,
            valid: true,
            touched: true
        })
    })
    this.setState({
      searchingOpen: false,
      acopioForm: updatedForm
    });
    this.props.onFetchSelSocios(this.props.token, id)
  }

  render () {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const acopioFormOrder = ["clave_socio", "fecha",  "tipo_de_producto", "kilos_de_producto", "ingreso"]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let supportData, supportButton
    let formElements, sociosLista = <Spinner/>

    acopioFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.acopioForm[key]
      })
    })

    if (!this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        if (formElement.id === "clave_socio") {
          if (this.props.selSocio && this.props.selSocio.clave_socio === this.state.acopioForm[formElement.id].value) {
            supportData = (
              <div className={classes.SupportData}>
                <p>{this.props.selSocio.nombres} {this.props.selSocio.apellidos} de región {this.props.selSocio.region}</p>
              </div>)
          }
          supportButton = (<Button btnType="Short" clicked={(event) => this.onSearchSocio(event, formElement.id)}><FormattedMessage id="searchSocio"/></Button>)
        } else if (formElement.id === "kilos_de_producto" && this.state.acopioForm.kilos_de_producto.value > 0 && this.state.acopioForm.ingreso.value > 0) {
          supportData = (
            <div className={classes.SupportData}>
              <p><FormattedMessage id="acopioForm.avg_price"/>: {Math.round(this.state.acopioForm.ingreso.value / this.state.acopioForm.kilos_de_producto.value)}</p>
            </div>)
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

     // TODO: SHOULD NOT RE-RENDER all list each time
     if (this.state.searchingOpen && this.props.listaSocios) {
       sociosLista = (<SociosList
                       listaSocios={this.props.listaSocios}
                       onClick={row => this.selectSocio(row.values.clave_socio)}
                       />)
     }


    const updatedRedirect = (this.props.updated) ? <Redirect to="/acopios"/> : null

    return (
      <>
        <Modal
          show={this.state.searchingOpen}
          modalClosed={this.cancelSearch}>
          <h3><FormattedMessage id="selectSocio"/></h3>
          <div
            className={classes.TableContainer}>
            {sociosLista}
          </div>
        </Modal>
        <Title
          titleName="acopioForm.title"/>
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
      loading: state.acopios.loading,
      updated: state.acopios.updated,
      listaSocios: state.socios.socios,
      selSocio: state.socios.selectedSocio,
      // new: state.acopios.newAcopio
    }
}

const mapDispatchToProps = dispatch => {
    return {
      //onEditSocio: (socioData, id, token) => dispatch(actions.updateSocio(socioData, id, token)),
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
      onCreateNewAcopio: (solData, token) => dispatch(actions.createNewAcopio(solData, token)),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
      unSelSocio: () => dispatch(actions.unSelectSocio())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(AcopioForm, axios))
