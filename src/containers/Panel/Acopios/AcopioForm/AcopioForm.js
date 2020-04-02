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
import ProcessSelector from '../../../../components/UI/ProcessSelector/ProcessSelector';
import SociosList from '../../Socios/SociosList/SociosList';
import classes from './AcopioForm.module.css'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


const status = {
  'CF': 'estatus_cafe',
  'MI': 'estatus_miel',
  'JA': 'estatus_yip',
  'SL': 'estatus_trabajador'
}

class AcopioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      searchingOpen: false,
      processOptions: {
            CF: 'NP',
            MI: 'NP',
            JA: 'NP',
            SL: 'NP'
      },
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
          hide: false,
          socioSupport: {
            supportButton: (event) => this.onSearchSocio(event),
            loseFocus: () => this.searchByFocus('clave_socio')
          }
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
          elementType: 'icons',
          value: null,
          validation: {
            required: true
          },
          valid: false,
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
            required: false,
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

  componentDidUpdate(prevProps) {
    if(this.props.selSocio && (!prevProps.selSocio || this.props.selSocio.clave_socio !== prevProps.selSocio.clave_socio)) {
      let newProceso = this.state.acopioForm.tipo_de_producto
      const newProcessValues = this.state.processOptions

      for (let id in status) {
        newProcessValues[id] = this.props.selSocio[status[id]]
      }
      newProceso = updateObject(this.state.acopioForm.tipo_de_producto, {
          value: null,
          valid: false,
          touched: false
      })

      const updatedForm = updateObject(this.state.acopioForm, {
        tipo_de_producto: newProceso,
        clave_socio: updateObject(this.state.acopioForm.clave_socio, {
          supportData: this.props.selSocio.nombres + ' ' + this.props.selSocio.apellido_paterno + ' ' + this.props.selSocio.apellido_materno + ' de ' + this.props.comunidades.find(x => x.id === this.props.selSocio.comunidad).nombre_de_comunidad
        })
      })

      this.setState({
        processOptions: newProcessValues,
        acopioForm: updatedForm,
        formIsValid: this.checkIfFormIsValid(updatedForm)
      });
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

    // Hide Kilos option if not applicable
    if (inputIdentifier === 'tipo_de_producto') {
      const hideKilos = !(event.target.value === 'CF' || event.target.value === 'MI')
      updatedForm = updateObject(updatedForm, {
          kilos_de_producto: updateObject(updatedForm.kilos_de_producto, {
              hide: hideKilos,
              valid: hideKilos,
              value: null,
              validation: {
                required: hideKilos
              }
          })
      })
    }

    this.setState({acopioForm: updatedForm, formIsValid: this.checkIfFormIsValid(updatedForm)})
  }

  checkIfFormIsValid = (form) => {
    let formIsValid = true
    for (let inputIds in form) {
        formIsValid = form[inputIds].valid && formIsValid
    }
    return formIsValid
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

  searchByFocus = inputIdentifier => {
    const value = this.state.acopioForm.clave_socio.value
    // TODO: validation of socio to search
    if (value && !isNaN(value)) {
      this.props.onFetchSelSocios(this.props.token, value)
    }
  }

  OnChooseProcess = current => {
    // event.preventDefault();
    const previous = this.state.acopioForm.tipo_de_producto.value
    if (previous !== current && this.props.selSocio && this.props.selSocio[status[current]] === 'AC') {
      const newProcesses = updateObject(this.state.processOptions, {
        [previous]: this.props.selSocio[status[previous]],
        [current]: 'SEL'
      })
      const updatedForm = updateObject(this.state.acopioForm, {
          tipo_de_producto: updateObject(this.state.acopioForm.tipo_de_producto, {
              value: current,
              valid: true,
              touched: true
          })
      })
      this.setState({
        processOptions: newProcesses,
        acopioForm: updatedForm,
        formIsValid: this.checkIfFormIsValid(updatedForm)
      });
    }
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
        if (formElement.id === "tipo_de_producto" ) {
          return (
            <div className={classes.Inputs}>
              <ProcessSelector label={formElement.id} processes={this.state.processOptions} clicked={this.OnChooseProcess}/>
            </div>
              )
        } else {
          if (formElement.id === "kilos_de_producto" && this.state.acopioForm.kilos_de_producto.value > 0 && this.state.acopioForm.ingreso.value > 0) {
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
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  supportData={formElement.config.supportData}
                  socioSupport={formElement.config.socioSupport}
                  />
                {supportButton}
              </div>
              {supportData}
            </div>
              )
        }
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
      comunidades: state.generalData.comunidades
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
