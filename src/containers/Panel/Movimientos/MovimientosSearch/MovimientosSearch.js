import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import FileSaver from 'file-saver';
import { connect } from 'react-redux';

import classes from './MovimientosSearch.module.scss';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import MovimientosListConc from '../MovimientosListConc/MovimientosListConc';
import MovimientoDetail from '../MovimientoDetail/MovimientoDetail';
import MovimientoBankForm from '../MovimientoBankForm/MovimientoBankForm';
import Button from '../../../../components/UI/Button/Button';
import Modal from '../../../../components/UI/Modal/Modal';
import XLSButton from '../../../../components/UI/XLSButton/XLSButton';
import Input from '../../../../components/UI/Input/Input';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { updateObject } from '../../../../store/reducers/utility'
// import { checkValidity } from '../../../utilities/validity'
import * as actions from '../../../../store/actions';
import axios from '../../../../store/axios-be.js';


const procesos_values = [
  {
    "value": "CF",
    "displayValue": "Café"
  },
  {
    "value": "MI",
    "displayValue": "Miel"
  },
  {
    "value": "JA",
    "displayValue": "Jabón"
  },
  {
    "value": "SL",
    "displayValue": "Sueldos"
  }
]

class MovimientosSearch extends Component {
  state = {
    formIsValid: false,
    loading: false,
    movs: [],
    showMovimientoModal: false,
    editBankData: false,
    form: {
      comunidad: {
        elementType: 'select',
        elementConfig: {
          options: this.props.comunidades.map(r => ({
            "value": r.id,
            "displayValue": r.nombre_de_comunidad+' - '+r.nombre_region
          })),
          optionBlank: true
        },
        label: (<><FormattedMessage id="comunidad"/></>),
        value: "",
        valid: true,
        touched: false,
      },
      region: {
        elementType: 'select',
        elementConfig: {
          options: this.props.regiones.map(r => ({
            "value": r.id,
            "displayValue": r.id +': ' + r.nombre_de_region
          })),
          optionBlank: true
        },
        label: (<><FormattedMessage id="region"/></>),
        value: "",
        valid: false,
        touched: false,
      },
      empresa: {
        elementType: 'select',
        elementConfig: {
          options: this.props.empresas.map(r => ({
            "value": r.id,
            "displayValue": r.id +': ' + r.nombre_empresa
          })),
          optionBlank: true
        },
        label: (<><FormattedMessage id="empresa"/></>),
        value: "",
        valid: false,
        touched: false,
      },
      fuente: {
        elementType: 'select',
        elementConfig: {
          options: this.props.fuentes.map(r => ({
            "value": r.id,
            "displayValue": r.id +': ' + r.fuente
          })),
          optionBlank: true
        },
        label: (<><FormattedMessage id="fuente"/></>),
        value: "",
        valid: false,
        touched: false,
      },
      proceso: {
        elementType: 'select',
        elementConfig: {
          options: procesos_values,
          optionBlank: true
        },
        label: (<><FormattedMessage id="proceso"/></>),
        value: "",
        valid: false,
        touched: false,
      },
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.updatedPatch
      && this.props.updatedPatch !== prevProps.updatedPatch
    ) {
      this.updateData()
      this.setState({
        showMovimientoModal: false,
        editBankData: false
      });
      this.props.unSelMov()
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {}

    for (const key in this.state.form) {
      updatedForm[key] = updateObject(this.state.form[key], {
        value: (key === inputIdentifier) ? event.target.value : "",
      })
    }

    this.setState({form: updatedForm, formIsValid: true})
  }

  getQuery = () => {
    let query = ''
    if (this.state.form.region.value) {
      query = '?region='+this.state.form.region.value
    } else if (this.state.form.comunidad.value) {
      query = '?comunidad='+this.state.form.comunidad.value
    } else if (this.state.form.empresa.value) {
      query = '?empresa='+this.state.form.empresa.value
    } else if (this.state.form.fuente.value) {
      query = '?fuente='+this.state.form.fuente.value
    }else if (this.state.form.proceso.value) {
      query = '?proceso='+this.state.form.proceso.value
    }
    return query
  }

  updateData = event => {
    if (event) {
      event.preventDefault();
    }

    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    const query = this.getQuery()
    this.setState({
      loading: true
    })
    axios.get('/movimientos/'+query, authData)
      .then(response => {
        this.setState({
          movs: response.data,
          loading: false
        })
      })
  }

  // TODO: duplicated code. create separate component
  renderType = cellInfo => {
    if (cellInfo.cell.value) {
      return <p style={{color: "#2bc71b"}}>A</p>
    } else {
      return <p style={{color: "#ec573c"}}>R</p>
    }
  }

  getXLSX = type => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` },
      responseType: 'blob',
    }
    const query = this.getQuery()

    axios.get('/movimientos-conc-xlsx/'+query, authData)
      .then(response => {
        FileSaver.saveAs(response.data, `aportaciones_retiros${query}.xlsx`)
      })
      .catch(error => {
        // TODO:
      })
  }

  showMovimiento = id => {
    this.setState({
      showMovimientoModal: true,
    })

    this.props.onFetchSelMovimiento(this.props.token, id)
  }

  cancelSelected =() => {
    this.setState({
      showMovimientoModal: false,
      editBankData: false
    });
    this.props.unSelMov()
  }

  render () {
    const movimientoFormOrder = [
      "comunidad",
      "region",
      "empresa",
      "fuente",
      "proceso"
    ]
    const formElementsArray = []

    movimientoFormOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      })
    })

    let form = <Spinner/>
    if (this.props.comunidades.length > 0 && this.props.regiones.length > 0) {
      form = (
        <form className={classes.Form} onSubmit={this.updateData}>
          <div className={classes.Inputs}>
            {formElementsArray.map(formElement => {
              return (
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
                />
              )
            })}
          </div>
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}
          >
            <FormattedMessage id="actualizarDatos"/>
          </Button>
        </form>
      )
    }

    let movList = this.state.loading ? <Spinner/> : null
    if (this.state.movs && !this.state.loading) {
      movList = (
        <div className={classes.Table}>
          <XLSButton
            clicked={this.getXLSX}
            labelID={"aportacionesRetirosXLS"}
          />
          <MovimientosListConc
            data={this.state.movs}
            onClick={(row) => this.showMovimiento(row.original.id)}
          />
        </div>
      )
    }

    const movDetail = (this.props.selMov)
      ? <MovimientoDetail pago={this.props.selMov}/>
      : <Spinner/>

    let editMovButton = null
    if (
      !this.state.editBankData
      && this.props.selMov
      && this.props.selMov.fecha_banco === null
    ) {
      editMovButton = (
        <Button
          btnType="Success"
          clicked={() => this.setState({editBankData: true})}
        >
          <FormattedMessage id="editarDatosBancarios"/>
        </Button>
      )
    }

    const movEditBankData = this.state.editBankData
      ? (
          <MovimientoBankForm
            selectedMov={this.props.selMov ? this.props.selMov.id : ''}
          />
        )
      : null

    let selectedMovTitle = null
    if (this.props.selMov) {
      if (this.props.selMov.aportacion) {
        selectedMovTitle = (
          <p>
            <span style={{color: classes.intenseGreen}}>&#x25CF; </span>
            <FormattedMessage id={"movimientos.aportacion"}/>
            &nbsp;#{this.props.selMov ? this.props.selMov.id : ''}
          </p>
        )
      } else {
        selectedMovTitle = (
          <p>
            <span style={{color: classes.secLightRed}}>&#x25CF; </span>
            <FormattedMessage id={"movimientos.retiro"}/>
            &nbsp;#{this.props.selMov ? this.props.selMov.id : ''}
          </p>
        )
      }


    }

    const modalContent = this.props.loadingPatch
      ? <Spinner/>
      : (
          <div className={classes.Container}>
            <div className={classes.SubTitle}>
              <h3>{selectedMovTitle}</h3>
              {editMovButton}
            </div>
            <div className={classes.ContentContainer}>
              {movDetail}
              {movEditBankData}
            </div>
          </div>
        )

    return (
      <>
        <Modal
          show={this.state.showMovimientoModal}
          modalClosed={this.cancelSelected}
        >
          {modalContent}
        </Modal>
        <div className={classes.Container}>
          {form}
          {movList}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    regiones: state.generalData.regiones,
    comunidades: state.generalData.comunidades,
    empresas: state.generalData.empresas,
    fuentes: state.generalData.fuentes,
    selMov: state.movimientos.selectedMov,
    loadingPatch: state.movimientos.loadingPatch,
    updatedPatch: state.movimientos.updatedPatch
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchSelMovimiento: (token, movId) => dispatch(actions.fetchSelMov(token, movId)),
    unSelMov: () => dispatch(actions.unSelectMov())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MovimientosSearch, axios))
