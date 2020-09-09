import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './MovimientosSearch.module.css'
import { connect } from 'react-redux';

import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import MovimientosListConc from '../MovimientosListConc/MovimientosListConc'
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { updateObject } from '../../../../store/reducers/utility'
// import { checkValidity } from '../../../utilities/validity'
// import * as actions from '../../../store/actions'
import axios from '../../../../store/axios-be.js'


class MovimientosSearch extends Component {
  state = {
    formIsValid: false,
    loading: false,
    movs: [],
    form: {
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

  inputChangedHandler = (event, inputIdentifier) => {

    const updatedForm = {}

    for (const key in this.state.form) {
      updatedForm[key] = updateObject(this.state.form[key], {
          value: (key === inputIdentifier) ? event.target.value : "",
      })
    }

    this.setState({form: updatedForm, formIsValid: true})
  }

  updateData = event => {
    event.preventDefault();
    let query = ''
    if (this.state.form.region.value) {
      query = '?region='+this.state.form.region.value
    } else if (this.state.form.comunidad.value) {
      query = '?comunidad='+this.state.form.comunidad.value
    }

    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
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
      return (<p style={{color: "#2bc71b"}}>A</p>)
    } else {
      return (<p style={{color: "#ec573c"}}>R</p>)
    }
 }

  render () {

    let form = <Spinner/>
    if (this.props.comunidades.length > 0 && this.props.regiones.length > 0) {
      form = (<form className={classes.Form} onSubmit={this.updateData}>
        <div className={classes.Inputs}>
          <Input
            label={this.state.form.comunidad.label}
            key= {'aportacionSearchFormComunidad2'}
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
            key= {'aportacionSearchFormRegion3'}
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

    let movList = this.state.loading ? <Spinner/> : null
    if (this.state.movs && !this.state.loading) {
      movList = <MovimientosListConc data={this.state.movs} onClick={() => {}}/>
    }

    return (
      <div className={classes.Container}>
        {form}
        {movList}
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      regiones: state.generalData.regiones,
      comunidades: state.generalData.comunidades,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MovimientosSearch, axios))
