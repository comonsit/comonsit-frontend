import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import SolicitudDetail from './SolicitudDetail/SolicitudDetail';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import RTable from '../../../components/Tables/RTable/RTable';
import Input from '../../../components/UI/Input/Input';
import SwitchToggle from '../../../components/UI/SwitchToggle/SwitchToggle'
import SelectColumnFilter from '../../../components/Tables/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../components/Tables/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../components/Tables/RTable/Filters/FilterGreaterThan';
import Button from '../../../components/UI/Button/Button';
import Title from '../../../components/UI/Title/Title';
import Currency from '../../../components/UI/Formatting/Currency';
import classes from './Solicitudes.module.scss'
import * as actions from '../../../store/actions'
import { isGerencia } from '../../../store/roles'
import { updateObject } from '../../../store/reducers/utility'
import { checkValidity } from '../../../utilities/validity'
import axios from '../../../store/axios-be.js'

class Solicitudes extends Component {
  state = {
    showSolicitudModal: false,
    selectedSol: null,
    saldos: null,
    formIsValid: false,
    oldSolicitudes: false,
    negociacionForm: {
      comentarios_promotor: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: '..',
          maxLength: '100'
        },
        label:  (<FormattedMessage id="comentariosPromotor"/>),
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

  componentDidMount () {
    this.props.unSelSol()
    this.props.onInitSolicitudes(this.props.token, this.state.oldSolicitudes)
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedSol !== prevProps.selectedSol) {
      this.setState({selectedSol: this.props.selectedSol})
    } else if(this.props.saldo !== prevProps.saldo) {
      this.setState({saldos: this.props.saldo})
    }
  }

  showSolicitud = (id, socio) => {
    this.setState({
      showSolicitudModal: true
    });
    this.props.onFetchSelSol(this.props.token, id)
    this.props.onGetSocioSaldo(this.props.token, socio)
  }

  cancelSelected =() => {
    this.setState({
      showSolicitudModal: false,
      selectedSol: null,
      saldos: null
    });
  }

  onNewSolicitud = () => {
    this.props.history.push('solicitud-formato');
    this.props.onNewSol()
  }

  renderStatus = cellInfo => {
    const colors = {
      "AP": "#2bc71b",
      "RV": "#d1df2c",
      "RE": "#c23f3f",
      "NE": "#235ee4",
      "CA": "#868a86"
    }

     return (
       <div
        style={{
          borderRadius: "2rem",
          width: "2rem",
          height: "2rem",
          backgroundColor: colors[cellInfo.cell.value] }}
       />
     )
 }

 onSubmitForm = event => {
   event.preventDefault();
   const formData = {
     estatus_evaluacion: 'RV',
     chat: [{'comentario': this.state.negociacionForm.comentarios_promotor.value}]
   }

   const authData = {
     headers: { 'Authorization': `Bearer ${this.props.token}` }
   }
   // TODO: implement loading view
   // this.setState({loading: true})

   axios.patch('/solic-creditos/' +this.props.selectedSol.folio_solicitud+'.json', formData, authData)
     .then(response => {
      // this.setState({loading: false})
      alert('Renegociación enviada correctamente.')
       // push or pop back to history?
       this.setState({
         showSolicitudModal: false,
         selectedSol: null,
         saldos: null
       });
       this.props.onInitSolicitudes(this.props.token)
       //dispatch update user data
     })
     .catch(error => {
       // alert('ALGO FALLÓ!')
     })
 }

 inputChangedHandler = (event, inputIdentifier) => {

   const updatedFormElement = updateObject(this.state.negociacionForm[inputIdentifier], {
       value: event.target.value,
       valid: checkValidity(event.target.value, this.state.negociacionForm[inputIdentifier].validation),
       touched: true
   })

   let updatedForm = updateObject(this.state.negociacionForm, {
       [inputIdentifier]: updatedFormElement
   })

   let formIsValid = true
   for (let inputIds in updatedForm) {
     formIsValid = updatedForm[inputIds].valid && formIsValid
   }

   this.setState({negociacionForm: updatedForm, formIsValid: formIsValid})
 }

  onToggleFilter = () => {
    this.props.onInitSolicitudes(this.props.token, !this.state.oldSolicitudes)
    this.setState(prevState => ({
      oldSolicitudes: !prevState.oldSolicitudes
    }));
  }

  render () {
    const columns = [
      {
        Header: <FormattedMessage id="solicitudes.folio_solicitud"/>,
        accessor: 'folio_solicitud',
        Filter: '',
        filter: ''
      },
      {
        Header: <FormattedMessage id="solicitudes.fecha_solicitud"/>,
        accessor: 'fecha_solicitud'
      },
      {
        Header: <FormattedMessage id="clave_socio"/>,
        accessor: 'clave_socio'
      },
      {
        Header: <FormattedMessage id="solicitudes.tipo_credito"/>,
        accessor: 'tipo_credito',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: <FormattedMessage id="solicitudes.monto_solicitado"/>,
        accessor: 'monto_solicitado',
        Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="plazo_de_pago_solicitado"/>,
        accessor: 'plazo_de_pago_solicitado',
        Filter: SliderColumnFilter,
        filter: 'equals'
      },
      {
        Header: <FormattedMessage id="solicitudes.estatus_solicitud"/>,
        accessor: 'estatus_solicitud',
        Cell: this.renderStatus,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: <FormattedMessage id="solicitudes.estatus_evaluacion"/>,
      accessor: 'estatus_evaluacion',
        Cell: this.renderStatus,
        Filter: SelectColumnFilter,
        filter: 'includes',
      }
    ]

    let mesaControlButton, evaluacionButton, form = null
    let solicitudInfo = <Spinner/>

    if (this.state.selectedSol && this.state.saldos) {
      solicitudInfo = (
        <div>
          <SolicitudDetail
            solicitud={this.state.selectedSol}
            saldos={this.state.saldos}
          />
        </div>
      )

      if (this.state.selectedSol.estatus_solicitud === 'RV' && isGerencia(this.props.role)) {
        mesaControlButton = <Button
          clicked={() => this.props.history.push('mesa-control')}
          btnType="Success"
          ><FormattedMessage id="solicitudes.goToMesaControl"/></Button>
      } else if (this.state.selectedSol.estatus_solicitud === 'AP' && this.state.selectedSol.estatus_evaluacion === 'RV' && this.props.role === 'Gerente') {
        evaluacionButton = <Button
          clicked={() => this.props.history.push('evaluacion')}
          btnType="Success"
          ><FormattedMessage id="solicitudes.goToEvaluacion"/></Button>
      } else if (this.state.selectedSol.estatus_solicitud === 'AP' && this.state.selectedSol.estatus_evaluacion === 'NE') {
        form = (
          <form onSubmit={this.onSubmitForm}>
            <div className={classes.Form}>
              <div
                key= {"comentarios_promotor"}
                >
                <div className={classes.Inputs}>
                  <Input
                    label={this.state.negociacionForm.comentarios_promotor.label}
                    labelLong={this.state.negociacionForm.comentarios_promotor.longLabel}
                    key= {"comentarios_promotor"}
                    elementType={this.state.negociacionForm.comentarios_promotor.elementType }
                    elementConfig={this.state.negociacionForm.comentarios_promotor.elementConfig }
                    value={this.state.negociacionForm.comentarios_promotor.value}
                    shouldValidate={this.state.negociacionForm.comentarios_promotor.validation}
                    invalid={!this.state.negociacionForm.comentarios_promotor.valid}
                    touched={this.state.negociacionForm.comentarios_promotor.touched}
                    disabled={this.props.loading}
                    hide={this.state.negociacionForm.comentarios_promotor.hide}
                    changed={(event) => this.inputChangedHandler(event, "comentarios_promotor")}/>
                </div>
              </div>
            </div>
            <Button
              btnType="Success"
              disabled={!this.state.formIsValid}>
              <FormattedMessage id="reNegotiateButton"/>
            </Button>
          </form>
        )
      }
    }

    const oldSolMessId = this.state.oldSolicitudes ? 'solicitudes.allCreditsTrue' : 'solicitudes.allCreditsFalse'
    const toggleButton = (
      <div>
        <div className={classes.ToggleContainer}>
          <SwitchToggle clicked={this.onToggleFilter}/>
          <p><FormattedMessage id={oldSolMessId}/></p>
        </div>
      </div>)

    return (
      <>
        <Modal
          show={this.state.showSolicitudModal}
          modalClosed={this.cancelSelected}>
          <div className={classes.Container}>
            <div className={classes.InfoContainer}>
              {solicitudInfo}
            </div>
            {mesaControlButton}
            {evaluacionButton}
            {form}
          </div>
        </Modal>
        <div className={classes.Container}>
          <Title
            titleName="solicitudes.title">
            <Button
              clicked={this.onNewSolicitud}
              ><FormattedMessage id="solicitudes.new"/></Button>
          </Title>
          {toggleButton}
          <RTable
            columns={columns}
            data={this.props.listaSolicitudes}
            onRowClick={(row, socio) => this.showSolicitud(row.values.folio_solicitud, row.values.clave_socio)}
            />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      listaSolicitudes: state.solicitudes.solicitudes,
      selectedSol: state.solicitudes.selectedSolicitud,
      token: state.auth.token,
      role: state.generalData.role,
      saldo: state.acopios.socioSaldo
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSolicitudes: (token, all) => dispatch(actions.initSolicitudes(token, all)),
      onNewSol: () => dispatch(actions.newSolicitud()),
      onFetchSelSol: (token, solId) => dispatch(actions.fetchSelSolicitud(token, solId)),
      unSelSol: () => dispatch(actions.unSelectSolicitud()),
      onGetSocioSaldo: (token, socioId) => dispatch(actions.getSocioSaldo(token, socioId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Solicitudes, axios)))
