import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './AcopiosGraphs.module.scss'
import { connect } from 'react-redux';

import AcopioGraph from '../../../../components/Graphs/AcopioGraph/AcopioGraph';

import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import axios from '../../../../store/axios-be.js'


class AcopiosGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hintCF: null,
      hintMI: null,
      hintJA: null,
      hintSA: null,
      formIsValid: false,
      loading: false,
      form: {
        clave_socio: {
          elementType: 'select',
          elementConfig: {
            options: this.props.listaSocios.map(r => ({"value": r.clave_socio, "displayValue": r.clave_socio + ': ' + r.nombres+' '+r.apellido_paterno+' '+r.apellido_materno})),
            optionBlank: true
          },
          label: (<><FormattedMessage id="clave"/></>),
          value: "",
          valid: false,
          touched: false,
        },
        comunidad: {
          elementType: 'select',
          elementConfig: {
            options: this.props.comunidades.map(r => ({"value": r.id, "displayValue": r.nombre_de_comunidad+' - '+r.nombre_region})),
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
            options: this.props.regiones.map(r => ({"value": r.id, "displayValue": r.id +': ' + r.nombre_de_region})),
            optionBlank: true
          },
          label: (<><FormattedMessage id="region"/></>),
          value: "",
          valid: false,
          touched: false,
        },
      }
    }

  }

  componentDidMount () {
    this.getYearSum('')
    this.props.onInitSocios(this.props.token)
  }

  componentDidUpdate(prevProps) {
    // should be done for all options?
    if(this.props.listaSocios !== prevProps.listaSocios) {
      const updatedForm = updateObject(this.state.form, {
          clave_socio: updateObject(this.state.form.clave_socio, {
            elementConfig: {
              options: this.props.listaSocios.map(r => ({"value": r.clave_socio, "displayValue": r.clave_socio + ': ' + r.nombres+' '+r.apellido_paterno+' '+r.apellido_materno})),
              optionBlank: true
            },
          })
      })
      this.setState({ form: updatedForm});
    }
  }

  getYearSum = query => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    axios.get('/acopios/year_sum/'+query, authData)
      .then(response => {
        this.populateYearSum(response.data)
      })
      .catch(error => {
        // TODO:
      })
  }

  populateYearSum = data => {
    const cData = []
    const hData = []
    const soData = []
    const saData = []

    for (let yearData of data) {
      cData.push({x: yearData.fecha__year, y: yearData.year_sum_cf})
      hData.push({x: yearData.fecha__year, y: yearData.year_sum_mi})
      soData.push({x: yearData.fecha__year, y: yearData.year_sum_ja})
      saData.push({x: yearData.fecha__year, y: yearData.year_sum_sl})
    }

    this.setState({
      coffeeData: cData,
      honeyData: hData,
      soapData: soData,
      salarioData: saData,
    })
  }

  _forgetValues = () => {
    this.setState({
      hintCF: null,
      hintMI: null,
      hintJA: null,
      hintSA: null
    });
  };

  _rememberValueCF = value => {
    this.setState({hintCF: value});
  };

  _rememberValueMI = value => {
    this.setState({hintMI: value});
  };

  _rememberValueJA = value => {
    this.setState({hintJA: value});
  };

  _rememberValueSA = value => {
    this.setState({hintSA: value});
  };

  inputChangedHandler = (event, inputIdentifier) => {

    const updatedForm = {}

    for (const key in this.state.form) {
      updatedForm[key] = updateObject(this.state.form[key], {
          value: (key === inputIdentifier) ? event.target.value : "",
      })
    }

    this.setState({form: updatedForm, formIsValid: true})
  }

  onRefreshData = event => {
    event.preventDefault();
    let query = ''
    if (this.state.form.clave_socio.value) {
      query = '?clave_socio='+this.state.form.clave_socio.value
    } else if (this.state.form.region.value) {
      query = '?region='+this.state.form.region.value
    } else if (this.state.form.comunidad.value) {
      query = '?comunidad='+this.state.form.comunidad.value
    }
    this.getYearSum(query)
  }

  render () {

    let form = <Spinner/>
    if (this.props.comunidades.length > 0 && this.props.listaSocios.length > 0 && this.props.regiones.length > 0) {
      form = (<form className={classes.Form} onSubmit={this.onRefreshData}>
        <div className={classes.Inputs}>
          <Input
            label={this.state.form.clave_socio.label}
            key= {'acopioFormClaveSocio1'}
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
          <Input
            label={this.state.form.comunidad.label}
            key= {'acopioFormComunidad2'}
            elementType={this.state.form.comunidad.elementType}
            elementConfig={this.state.form.comunidad.elementConfig}
            value={this.state.form.comunidad.value}
            shouldValidate={this.state.form.comunidad.validation}
            invalid={!this.state.form.comunidad.valid}
            touched={this.state.form.comunidad.touched}
            disabled={this.props.loading}
            hide={this.state.form.comunidad.hide}
            changed={(event) => this.inputChangedHandler(event, 'comunidad')}
            focused
          />
          <Input
            label={this.state.form.region.label}
            key= {'acopioFormRegion3'}
            elementType={this.state.form.region.elementType}
            elementConfig={this.state.form.region.elementConfig}
            value={this.state.form.region.value}
            shouldValidate={this.state.form.region.validation}
            invalid={!this.state.form.region.valid}
            touched={this.state.form.region.touched}
            disabled={this.props.loading}
            hide={this.state.form.region.hide}
            changed={(event) => this.inputChangedHandler(event, 'region')}
            focused
          />
        </div>
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}>
          <FormattedMessage id="actualizarDatos"/>
        </Button>
      </form>)
    }

    return (
      <>
        <div className={classes.FormContainer}>
          {form}
        </div>
        <AcopioGraph
          data={this.state.coffeeData}
          label="cafe"
          color="#92c3c0"
          mouseOver={this._rememberValueCF}
          mouseOut={this._forgetValues}
          hint={this.state.hintCF}
          />
        <AcopioGraph
          data={this.state.honeyData}
          label="miel"
          color="#D5B49E"
          mouseOver={this._rememberValueMI}
          mouseOut={this._forgetValues}
          hint={this.state.hintMI}
          />
        <AcopioGraph
          data={this.state.soapData}
          label="jabon"
          color="#ac92c3"
          mouseOver={this._rememberValueJA}
          mouseOut={this._forgetValues}
          hint={this.state.hintJA}
          />
        <AcopioGraph
          data={this.state.salarioData}
          label="salarios"
          color="#BBC392"
          mouseOver={this._rememberValueSA}
          mouseOut={this._forgetValues}
          hint={this.state.hintSA}
          />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    listaSocios: state.socios.socios,
    regiones: state.generalData.regiones,
    comunidades: state.generalData.comunidades,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitSocios: (token) => dispatch(actions.initSocios(token))
  }
}


export default  connect(mapStateToProps, mapDispatchToProps)(AcopiosGraphs)
