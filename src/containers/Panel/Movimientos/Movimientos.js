import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import classes from './Movimientos.module.css'
import { connect } from 'react-redux';

import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import RTable from '../../../components/UI/RTable/RTable';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SociosList from '../Socios/SociosList/SociosList';
import { updateObject } from '../../../store/reducers/utility'
import { checkValidity } from '../../../utilities/validity'
// import SelectColumnFilter from '../../../components/UI/RTable/Filters/SelectColumnFilter';
import * as actions from '../../../store/actions'


class Movimientos extends Component {
  state = {
    movimientoSelected: false,
    searchingOpen: false,
    selSocio: {
      nombres: '',
      apellidos: '',
      region: ''
    },
    formIsValid: false,
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
  }


// TODO: CLEAN-UP or avoid this if null empties!
  componentDidUpdate(prevProps) {
    if(this.props.selSocio !== prevProps.selSocio) {
      if (this.props.selSocio) {
        this.setState({selSocio: {
          nombres: this.props.selSocio.nombres,
          apellidos: this.props.selSocio.apellidos,
          region: this.props.selSocio.region,
        }});
      } else {
        this.setState({selSocio: {
          nombres: '',
          apellidos: '',
          region: '',
        }});
      }
    }
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    this.updateData(this.state.form.clave_socio.value)
  }

  updateData = id => {
    console.log('el socio es: ' + id)
    this.props.onFetchSelSocios(this.props.token, id)
    this.props.onInitMovimientos(this.props.token, id)
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
    // this.props.history.push('movimiento-formato');
    // this.props.onNewMovimiento()
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
    const columns = [
      {
        Header: <FormattedMessage id="movimientos.aportacion_retiro"/>,
        accessor: 'aportacion',
        // Filter: SelectColumnFilter,
        // filter: 'includes',
      },
      {
        Header: <FormattedMessage id="fecha"/>,
        accessor: 'fecha_entrega'
      },
      {
        Header: <FormattedMessage id="movimientos.monto"/>,
        accessor: 'monto'
      },
      {
        Header: <FormattedMessage id="movimientos.fecha_banco"/>,
        accessor: 'fecha_banco'
      },
      {
        Header: <FormattedMessage id="movimientos.tipo"/>,
        accessor: 'tipo_de_movimiento',
        // Filter: SelectColumnFilter,
        // filter: 'includes',
      },
      {
        Header: <FormattedMessage id="movimientos.empresa"/>,
        accessor: 'empresa',
        // Filter: SelectColumnFilter,
        // filter: 'includes',
      }
    ]

    if (this.props.listaSocios && this.state.searchingOpen) {
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
            <h3><FormattedMessage id="selectSocio"/></h3>
            <div
              className={classes.TableContainer}>
            {sociosBusqueda}
            </div>
          </Modal>

        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1><FormattedMessage id="movimientos.title"/></h1>
            <div className={classes.ButtonContainer}>
              <Button
                clicked={this.onNewMovimiento}
                ><FormattedMessage id="movimientos.newMovimiento"/></Button>
            </div>
          </div>
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
                />
              <Button btnType="Short" clicked={(event) => this.onSearchSocio(event)}><FormattedMessage id="searchSocio"/></Button>
            </div>
            <Button
              btnType="Success"
              disabled={!this.state.formIsValid}>
              <FormattedMessage id="movimientos.actualizar"/>
            </Button>
          </form>
          <div>
            <p>{this.state.selSocio.nombres} {this.state.selSocio.apellidos} {this.state.selSocio.nombres ? 'de región' : ''} {this.state.selSocio.region}</p>
          </div>
          <RTable
            columns={columns}
            data={this.props.listaMovimientos}
            onRowClick={row => this.showMovimiento(row.values.id)}
            />
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
      token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
      onInitMovimientos: (token, socioId) => dispatch(actions.initMovimientos(token, socioId)),
      // onNewMovimiento: () => dispatch(actions.newMovimiento()),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
      unSelSocio: () => dispatch(actions.unSelectSocio())
      // onFetchSelMovimiento: (token, solId) => dispatch(actions.fetchSelMovimiento(token, movimientoId)),
      // unSelMovimiento: () => dispatch(actions.unSelectMovimiento())
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(Movimientos)
