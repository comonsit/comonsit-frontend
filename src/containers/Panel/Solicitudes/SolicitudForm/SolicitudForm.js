import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';
import axios from '../../../../store/axios-be.js'
import _ from 'lodash';

import classes from './SolicitudForm.module.scss';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../components/UI/Modal/Modal';
import Title from '../../../../components/UI/Title/Title';
import ProcessSelector from '../../../../components/UI/ProcessSelector/ProcessSelector';
import SociosList from '../../Socios/SociosList/SociosList';
import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../store/reducers/utility';
import { checkValidity } from '../../../../utilities/validity';


const status = {
  'CF': 'estatus_cafe',
  'MI': 'estatus_miel',
  'JA': 'estatus_yip',
  'SL': 'estatus_trabajador'
}


class SolicitudForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      searchingOpen: false,
      selectingFor: null,
      processOptions: {
            CF: 'NP',
            MI: 'NP',
            JA: 'NP',
            SL: 'NP'
      },
      solicitudForm: {
        clave_socio: {
          elementType: 'input',
          elementConfig: {
            type: 'nomber',
            placeholder: '..clave del socio'
          },
          label: (<><FormattedMessage id="clave_socio"/>*</>),
          value: '',
          validation: {
            required: true,
            isNumeric: true,
            minNumValue: 1
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false,
          supportData: null,
          supportActions: {
            supportButton: (event) => this.onSearchSocio(event, 'clave_socio'),
            loseFocus: () => this.searchByFocus('clave_socio'),
            suppButtLabelID: "searchSocio"
          }
        },
        fecha_solicitud: {
          elementType: 'input',
          elementConfig: {
            type: 'date'
          },
          label: (<><FormattedMessage id="solicitudForm.fecha_solicitud"/>*</>),
          value: '',
          validation: {
            required: true,
            todayOrOlder: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
        proceso: {
          elementType: 'icons',
          value: null,
          validation: {
            required: true
          },
          valid: false,
          errorMessage: "",
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
          label: (<><FormattedMessage id="solicitudForm.tipo_credito"/>*</>),
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
          label: (<><FormattedMessage id="solicitudForm.act_productiva"/>*</>),
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
          label: (<FormattedMessage id="solicitudForm.other"/>),
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
          label: (<><FormattedMessage id="solicitudForm.motivo_credito"/>*</>),
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
          label: (<FormattedMessage id="solicitudForm.other"/>),
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
          label:  (<FormattedMessage id="solicitudForm.emergencia_medica"/>),
          value: false,
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          hide: true
        },
        monto_solicitado: {
          elementType: 'input',
          elementConfig: {
            type: 'number'
          },
          label:  (<><FormattedMessage id="solicitudForm.monto_solicitado"/>*</>),
          value: '',
          validation: {
            required: true,
            isDecimal: true,
            minNumValue: .01,
            maxNumValue: 9999999,
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
        plazo_de_pago_solicitado: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: '..# meses'
          },
          label:  (<><FormattedMessage id="solicitudForm.plazo_de_pago_solicitado"/>*</>),
          value: '',
          validation: {
            required: true,
            isNumeric: true,
            minNumValue: 1,
            maxNumValue: 100,
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
        justificacion_credito: {
          elementType: 'input',
          elementConfig: {
            type: 'textarea',
          },
          label:  (<><FormattedMessage id="solicitudForm.justificacion_credito"/>*</>),
          value: '',
          validation: {
            required: true,
            maxLength: 100
          },
          helpMessage: <FormattedMessage id="solicitudForm.justificacion_credito_placeholder" />,
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
        comentarios_promotor: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            placeholder: '..',
            maxLength: '100'
          },
          label:  (<FormattedMessage id="solicitudForm.comentarios_promotor"/>),
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          hide: false
        },
        aval: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..clave del socio aval'
          },
          label: (<><FormattedMessage id="solicitudForm.aval"/>*</>),
          value: '',
          validation: {
            required: true,
            isNumeric: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false,
          supportData: null,
          supportActions: {
            supportButton: (event) => this.onSearchSocio(event, 'aval'),
            loseFocus: () => this.searchByFocus('aval'),
            suppButtLabelID: "searchSocioAval"
          }
        },
        familiar_responsable: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            placeholder: '..',
            maxLength: '100'
          },
          label:  (<><FormattedMessage id="solicitudForm.familiar_responsable"/>*</>),
          value: '',
          validation: {
            required: true
          },
          valid: false,
          errorMessage: "",
          touched: false,
          hide: false
        },
      }
    }
  }

  componentDidUpdate(prevProps) {
    // update if previous was null or clave_socio changed
    if(
      this.props.selSocio
      && (!prevProps.selSocio
        || this.props.selSocio.clave_socio !== prevProps.selSocio.clave_socio)
    ) {
      let newProceso = this.state.solicitudForm.proceso
      const newProcessValues = this.state.processOptions

      if (this.state.selectingFor === 'clave_socio') {
        for (let id in status) {
          newProcessValues[id] = this.props.selSocio[status[id]]
        }
        newProceso = updateObject(this.state.solicitudForm.proceso, {
          value: null,
          valid: false,
          errorMessage: "",
          touched: false
        })
      }

      const nombres = this.props.selSocio.nombres + ' ' + this.props.selSocio.apellido_paterno + ' ' + this.props.selSocio.apellido_materno
      const comunidadNombre = this.props.comunidades.find(x => x.id === this.props.selSocio.comunidad).nombre_de_comunidad
      const updatedForm = updateObject(this.state.solicitudForm, {
          proceso: newProceso,
          [this.state.selectingFor]: updateObject(this.state.solicitudForm[this.state.selectingFor], {
            supportData: nombres + ' de ' + comunidadNombre
          })
      })

      this.setState({
        processOptions: newProcessValues,
        solicitudForm: updatedForm,
        formIsValid: this.checkIfFormIsValid(updatedForm)
      });
    }
  }

  componentDidMount() {
    this.props.onInitSocios(this.props.token)
  }

  componentWillUnmount() {
    this.props.unSelSocio()
    this.props.onClearError()
  }

  onSubmitForm = event => {
    event.preventDefault();

    const formData = {}
    for (let formElementIdentifier in this.state.solicitudForm) {
      formData[formElementIdentifier] = this.state.solicitudForm[formElementIdentifier].value
    }

    //// TODO: eliminate estatus data with working workflow
    let solicitud = {...formData}

    if (this.state.solicitudForm.tipo_credito.value === 'CP') {
      solicitud = updateObject(solicitud, {
        mot_credito: 'TR',
        mot_credito_otro: null
      })
    }

    const currentComment = solicitud.comentarios_promotor
    solicitud = updateObject(solicitud, {
      chat: [{'comentario': currentComment}],
      emergencia_medica: (solicitud.mot_credito === 'SA')
        ? this.state.solicitudForm.emergencia_medica.value
        : false
    })

    // if (this.props.new) {
      this.props.onCreateNewSolicitud(solicitud, this.props.token)
    // } else {
    //   this.props.onEditSocio(socio, this.props.selSocio.clave_socio, this.props.token)
    // }
  }

  inputChangedHandler = (event, inputIdentifier) => {

    const validation = checkValidity(event.target.value, this.state.solicitudForm[inputIdentifier].validation, true)
    const value = this.state.solicitudForm[inputIdentifier].elementType === 'checkbox'
      ? event.target.checked
      : event.target.value

    const updatedFormElement = updateObject(this.state.solicitudForm[inputIdentifier], {
      value: value,
      valid: validation.valid,
      errorMessage: validation.errorMessage,
      touched: true
    })

    let updatedForm = updateObject(this.state.solicitudForm, {
      [inputIdentifier]: updatedFormElement
    })

    // TODO: Improve process
    if (inputIdentifier === 'tipo_credito') {
      const hideIfTR = event.target.value === 'CP'
    updatedForm = updateObject(updatedForm, {
        mot_credito: updateObject(updatedForm.mot_credito, {
          hide: hideIfTR
        }),
        mot_credito_otro: updateObject(updatedForm.mot_credito_otro, {
          hide: hideIfTR || this.state.solicitudForm.mot_credito.value !== 'OT'
        }),
        emergencia_medica: updateObject(updatedForm.emergencia_medica, {
          hide: hideIfTR || this.state.solicitudForm.mot_credito.value !== 'SA'
        }),
        act_productiva: updateObject(updatedForm.act_productiva, {
          hide: !hideIfTR && this.state.solicitudForm.mot_credito.value !== 'TR'
        }),
        act_productiva_otro: updateObject(updatedForm.act_productiva_otro, {
          hide: (!hideIfTR && this.state.solicitudForm.mot_credito.value !== 'TR') || this.state.solicitudForm.act_productiva.value !== 'OT'
        }),
      })
    } else if (inputIdentifier === 'mot_credito') {
      const hideOther = event.target.value !== 'OT'
      const hideSalud = event.target.value !== 'SA'
      const hideActProd = event.target.value !== 'TR'
      updatedForm = updateObject(updatedForm, {
        mot_credito_otro: updateObject(updatedForm.mot_credito_otro, {
          hide: hideOther,
          valid: hideOther,
          validation: {
            required: !hideOther
          }
        }),
        emergencia_medica: updateObject(updatedForm.emergencia_medica, {
          hide: hideSalud
        }),
        act_productiva: updateObject(updatedForm.act_productiva, {
          hide: hideActProd,
          valid: hideActProd,
          validation: {
            required: !hideActProd
          }
        }),
        act_productiva_otro: updateObject(updatedForm.act_productiva_otro, {
          hide: hideActProd || this.state.solicitudForm.act_productiva.value !== 'OT',
          valid: hideActProd,
          validation: {
            required: !hideActProd
          }
        })
      })
    } else if (inputIdentifier === 'act_productiva'  ) {
      const hideOther = event.target.value !== 'OT'
      updatedForm = updateObject(updatedForm, {
        act_productiva_otro: updateObject(updatedForm.act_productiva_otro, {
          hide: hideOther,
          valid: hideOther,
          validation: {
            required: !hideOther
          }
        })
      })
    }

    this.setState({solicitudForm: updatedForm, formIsValid: this.checkIfFormIsValid(updatedForm)})

    if (this.props.formError && inputIdentifier in this.props.formError) {
      this.props.onClearError()
    }
  }

  checkIfFormIsValid = form => {
    let formIsValid = true
    for (let inputIds in form) {
      formIsValid = form[inputIds].valid && formIsValid
    }
    return formIsValid
  }

  onSearchSocio = (event, element) => {
    event.preventDefault();
    this.setState({searchingOpen: true, selectingFor: element})
  }

  cancelSearch = () => {
    this.setState({searchingOpen: false})
    this.props.unSelSocio()
  }

  selectSocio = id => {
    const updatedForm = updateObject(this.state.solicitudForm, {
      [this.state.selectingFor]: updateObject(this.state.solicitudForm[this.state.selectingFor], {
        value: id,
        valid: true,
        touched: true,
        errorMessage: ""
      })
    })
    this.setState({
      searchingOpen: false,
      solicitudForm: updatedForm
    });
    this.props.onFetchSelSocios(this.props.token, id)
  }

  searchByFocus = inputIdentifier => {
    const value = this.state.solicitudForm[inputIdentifier].value
    // TODO: validation of socio to search
    if (value && !isNaN(value)) {
      this.setState({ selectingFor: inputIdentifier })
      this.props.onFetchSelSocios(this.props.token, value)
    }
  }

  OnChooseProcess = current => {
    // event.preventDefault();
    const previous = this.state.solicitudForm.proceso.value
    if (
      previous !== current
      && this.props.selSocio
      && this.props.selSocio[status[current]] === 'AC'
    ) {
      const newProcesses = updateObject(this.state.processOptions, {
        [previous]: this.props.selSocio[status[previous]],
        [current]: 'SEL'
      })
      const updatedForm = updateObject(this.state.solicitudForm, {
        proceso: updateObject(this.state.solicitudForm.proceso, {
            value: current,
            valid: true,
            touched: true,
            errorMessage: ""
        })
      })
      this.setState({
        processOptions: newProcesses,
        solicitudForm: updatedForm,
        formIsValid: this.checkIfFormIsValid(updatedForm)
      });
    }
  }

  render() {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const solicitudFormOrder = [
      "clave_socio",
      "fecha_solicitud",
      "proceso",
      "tipo_credito",
      "mot_credito",
      "mot_credito_otro",
      "act_productiva",
      "act_productiva_otro",
      "emergencia_medica",
      "monto_solicitado",
      "plazo_de_pago_solicitado",
      "justificacion_credito",
      "aval",
      "familiar_responsable",
      "comentarios_promotor"
    ]
    const formElementsArray = []
    const formClasses = [classes.Form]
    let sociosBusqueda = <Spinner/>
    let formElements = <Spinner/>
    const updatedRedirect = (this.props.updated) ? <Redirect to="/solicitudes"/> : null

    solicitudFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.solicitudForm[key]
      })
    })

    if (!this.props.loading) {
      formElements = formElementsArray.map(formElement => {
        const serverErrorMessage = _.get(this.props.formError, formElement.id, "")
        if (formElement.id === "proceso" ) {
          return (
            <div
              key= {formElement.id}
              className={classes.Inputs}
            >
              <ProcessSelector
                label={formElement.id+'_nombre'}
                processes={this.state.processOptions}
                clicked={this.OnChooseProcess}
              />
            </div>
          )
        } else {
          return (
            <div
              key= {formElement.id}
              className={classes.Inputs}
            >
              <Input
                label={formElement.config.label}
                key= {formElement.id}
                elementType={formElement.config.elementType }
                elementConfig={formElement.config.elementConfig }
                value={formElement.config.value}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid || serverErrorMessage !== ""}
                errorMessage={formElement.config.errorMessage + serverErrorMessage}
                touched={formElement.config.touched}
                disabled={this.props.loading}
                hide={formElement.config.hide}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                supportData={formElement.config.supportData}
                supportActions={formElement.config.supportActions}
                helpMessage={formElement.config.helpMessage}
              />
            </div>
          )
        }
      })
    }

    formClasses.push(classes.noScroll)


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
          <h3><FormattedMessage id="solicitudForm.elige"/></h3>
          <div className={classes.TableContainer}>
            {sociosBusqueda}
          </div>
        </Modal>
        <div className={classes.FormContainer}>
          <Title titleName="solicitudForm.title"/>
          <form onSubmit={this.onSubmitForm}>
            <div className={formClasses.join(' ')}>
              {formElements}
            </div>
            <div className={classes.Form_Submit}>
              <Button
                btnType="Success"
                disabled={!this.state.formIsValid}
              >
                <FormattedMessage id="saveButton"/>
              </Button>
            </div>
            {updatedRedirect}
          </form>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.solicitudes.loading,
    updated: state.solicitudes.updated,
    formError: state.errors.errors,
    listaSocios: state.socios.socios,
    selSocio: state.socios.selectedSocio,
    comunidades: state.generalData.comunidades
    // new: state.solicitudes.newSolicitud
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //onEditSocio: (socioData, id, token) => dispatch(actions.updateSocio(socioData, id, token)),
    onInitSocios: (token) => dispatch(actions.initSocios(token)),
    onCreateNewSolicitud: (solData, token) => dispatch(actions.createNewSolicitud(solData, token)),
    onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
    unSelSocio: () => dispatch(actions.unSelectSocio()),
    onClearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SolicitudForm, axios))
