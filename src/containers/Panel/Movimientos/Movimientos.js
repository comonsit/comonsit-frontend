import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './Movimientos.module.scss'
import { connect } from 'react-redux';

import MovimientosSearch from './MovimientosSearch/MovimientosSearch'
import MovimientosListConc from './MovimientosListConc/MovimientosListConc'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Title from '../../../components/UI/Title/Title'
import TextElement from '../../../components/UI/TextElement/TextElement';
import Tabs from '../../../components/UI/Tabs/Tabs';
import Currency from '../../../components/UI/Formatting/Currency';
import FrmtedDate from '../../../components/UI/Formatting/FrmtedDate';
import ProcessSelector from '../../../components/UI/ProcessSelector/ProcessSelector';
import SociosList from '../Socios/SociosList/SociosList';
import { updateObject } from '../../../store/reducers/utility'
import { checkValidity } from '../../../utilities/validity'
import * as actions from '../../../store/actions'
import axios from '../../../store/axios-be.js'


const status = {
  'CF': 'estatus_cafe',
  'MI': 'estatus_miel',
  'JA': 'estatus_yip',
  'SL': 'estatus_trabajador'
}

class Movimientos extends Component {
  state = {
    movimientoSelected: false,
    searchingOpen: false,
    selSocio: '',
    selTab: "movimientos.buscarSocio",
    saldo: null,
    emptyMessage: false,
    formIsValid: false,
    loading: false,
    processOptions: {
          CF: 'NP',
          MI: 'NP',
          JA: 'NP',
          SL: 'NP'
    },
    form: {
      clave_socio: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '..'
        },
        label: (<><FormattedMessage id="clave"/></>),
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

  componentDidMount () {
    this.props.onInitSocios(this.props.token)
  }

  componentWillUnmount() {
    this.props.unSelSocio()
    this.props.unSetMov()
  }


  componentDidUpdate(prevProps) {
    if(this.props.selSocio && (!prevProps.selSocio || this.props.selSocio.clave_socio !== prevProps.selSocio.clave_socio)) {

      const newProcessValues = this.state.processOptions

      for (let id in status) {
        newProcessValues[id] = this.props.selSocio[status[id]] === 'AC' ? "SEL" : this.props.selSocio[status[id]]
      }

      this.setState({
        processOptions: newProcessValues,
        selSocio: this.props.selSocio.nombres + ' ' + this.props.selSocio.apellido_paterno + ' ' + this.props.selSocio.apellido_materno
      });
    }
  }


// // TODO: CLEAN-UP or avoid this if null empties!
//   componentDidUpdate(prevProps) {
//     if(this.props.selSocio !== prevProps.selSocio) {
//       if (this.props.selSocio) {
//         this.setState({selSocio: this.props.selSocio.nombres + ' ' + this.props.selSocio.apellido_paterno + ' ' + this.props.selSocio.apellido_materno });
//       } else {
//         this.setState({selSocio: ''});
//       }
//     }
//   }

  onSubmitForm = (event) => {
    event.preventDefault();
    this.updateData(this.state.form.clave_socio.value)
  }

  updateData = id => {
    this.props.onInitMovimientos(this.props.token, id)
    this.getSaldo(id)
    this.props.onFetchSelSocios(this.props.token, id)
  }

  inputChangedHandler = (event, inputIdentifier) => {

    const updatedFormElement = updateObject(this.state.form[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.form[inputIdentifier].validation),
        touched: true
    })

    let updatedForm = updateObject(this.state.form, {
        [inputIdentifier]: updatedFormElement
    })

    let formIsValid = true
    for (let inputIds in updatedForm) {
        formIsValid = updatedForm[inputIds].valid && formIsValid
    }

    this.setState({form: updatedForm, formIsValid: formIsValid})
  }

  getSaldo = id => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    this.setState({
      loading: true
    })
    axios.get('/movimientos/saldo/?clave_socio='+id, authData)
      .then(response => {
        if ("saldo" in response.data) {
          this.setState({saldo: response.data.saldo, emptyMessage: false, loading: false})
        } else if ("message" in response.data && response.data.message === "No hay información disponible") {
          this.setState({emptyMessage: true, saldo: null, loading: false})
        }

      })
  }

  showMovimiento =(id) => {
    this.setState({movimientoSelected: true});
    // this.props.selectMovimiento(id)
  }
  //
  // cancelSelected = () => {
  //   this.setState({ movimientoSelected: false});
  //   // this.props.unSelMovimiento()
  // }

  onSearchSocio = (event) => {
    event.preventDefault();
    this.setState({searchingOpen: true})
  }

  cancelSearch =() => {
    this.setState({searchingOpen: false, socioSeleccionado: null})
    this.props.unSelSocio()
  }

  onNewMovimiento = () => {
    this.setState({ acopioSelected: true});
    this.props.history.push('movimiento-formato');
    this.props.onNewMov()
  }

  selectSocio =(id) => {

    const updatedForm = updateObject(this.state.form, {
        clave_socio: updateObject(this.state.form.clave_socio, {
            value: id,
            valid: true,
            touched: true
        })
    })
    this.setState({
      searchingOpen: false,
      form: updatedForm,
      formIsValid: true
    });
    this.updateData(id)
  }

  render () {

    let sociosBusqueda = <Spinner/>
    let movimientosResults = null

    if (this.props.listaSocios && this.state.searchingOpen) {
      sociosBusqueda = (
        <SociosList
            listaSocios={this.props.listaSocios}
            onClick={row => this.selectSocio(row.values.clave_socio)}
            />
      )
    }

    const today = new Date()
    if (this.state.loading) {
      movimientosResults = <Spinner/>
    } else if (this.props.listaMovimientos && this.state.saldo !== null) {
      movimientosResults = (
        <div className={classes.TabContainer}>
          <div className={classes.SocioName}>
            <TextElement
              label="nombres"
              content={this.state.selSocio}
            />
            <TextElement
              label="fecha"
              content={<FrmtedDate value={today.toString()}/>}
            />
            <TextElement
              label="movimientos.saldo"
              content={this.state.saldo}
              isNum
            />
            <ProcessSelector
              label={'procesos'}
              processes={this.state.processOptions}
              clicked={() => {}}
            />
          </div>
          <h4><FormattedMessage id="detalle.aportaciones"/></h4>
          <MovimientosListConc
            data={this.props.listaMovimientos}
            onClick={(row) => this.showMovimiento(row.original.id)}
          />
        </div>
      )
    } else if (this.state.emptyMessage && this.state.selSocio) {
      movimientosResults = (
        <div className={classes.SocioName}>
          <TextElement
            label="nombres"
            content={this.state.selSocio}
            />
          <TextElement
            label="fecha"
            content={<FrmtedDate value={today.toString()}/>}
          />
          <ProcessSelector
            label={'proceso'}
            processes={this.state.processOptions}
            clicked={() => {}}
          />
          <p><FormattedMessage id="movimientos.vacio"/></p>
        </div>
        )
    } else {
      movimientosResults = null
    }

    let socioClasses = [classes.porSocio]
    let comunidadClasses = [classes.porComunidad]
    if (true) {
      socioClasses.push(classes.porSocioActive)
      comunidadClasses.push(classes.porComunidadInactive)
    } else {
      // socioClasses.push(classes.porSocioInactive)
      // comunidadClasses.push(classes.porComunidadActive)
    }

    return (
      <>
          <Modal
            show={this.state.searchingOpen}
            modalClosed={this.cancelSearch}>
            <h3><FormattedMessage id="selectSocio"/></h3>
            <div
              className={classes.TableContainer}>
            {sociosBusqueda}
            </div>
          </Modal>

        <div className={classes.Container}>
          <Title
            titleName="movimientos.title">
            <Button
              clicked={this.onNewMovimiento}
              ><FormattedMessage id="movimientos.newMovimiento"/></Button>
          </Title>
          <div className={classes.FormsContainer}>
            <Tabs
              onSelectTab={(activeTab) => this.setState({selTab: activeTab})}
              >
              <div label="movimientos.buscarSocio">
                <form className={classes.Form} onSubmit={this.onSubmitForm}>
                  <div className={classes.Inputs}>
                    <Input
                      label={this.state.form.clave_socio.label}
                      key= {'movimientoSocio1'}
                      elementType={this.state.form.clave_socio.elementType}
                      elementConfig={this.state.form.clave_socio.elementConfig}
                      value={this.state.form.clave_socio.value}
                      shouldValidate={this.state.form.clave_socio.validation}
                      invalid={!this.state.form.clave_socio.valid}
                      touched={this.state.form.clave_socio.touched}
                      disabled={this.props.loading}
                      hide={this.state.form.clave_socio.hide}
                      changed={(event) => this.inputChangedHandler(event, 'clave_socio')}
                      focused
                      />
                  </div>
                  <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}>
                    <FormattedMessage id="movimientos.actualizar"/>
                  </Button>
                </form>
                <div className={classes.supportButton}>
                  <Button btnType="Short" clicked={(event) => this.onSearchSocio(event)}><FormattedMessage id="searchSocio"/></Button>
                </div>
                {movimientosResults}
              </div>
              <div label="movimientos.buscarGrupo">
                <MovimientosSearch/>
              </div>
            </Tabs>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      selSocio: state.socios.selectedSocio,
      listaMovimientos: state.movimientos.movimientos,
      listaSocios: state.socios.socios,
      token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
      onInitMovimientos: (token, socioId) => dispatch(actions.initMovimientos(token, socioId)),
      onNewMov: () => dispatch(actions.newMovimiento()),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
      unSelSocio: () => dispatch(actions.unSelectSocio()),
      unSetMov: () => dispatch(actions.unSetMovimientos())
      // onFetchSelMovimiento: (token, solId) => dispatch(actions.fetchSelMovimiento(token, movimientoId)),
      // unSelMovimiento: () => dispatch(actions.unSelectMovimiento())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Movimientos, axios))
