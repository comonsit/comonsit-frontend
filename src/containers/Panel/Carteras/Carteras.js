import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Card from '../../../components/UI/Card/Card';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Title from '../../../components/UI/Title/Title';
import TotalCarteras from './TotalCarteras/TotalCarteras'
import CreditoListCont from '../Creditos/CreditoListCont/CreditoListCont';
import classes from './Carteras.module.css'
import { updateObject } from '../../../store/reducers/utility'
import { checkValidity } from '../../../utilities/validity'
// import * as actions from '../../../store/actions'
import axios from '../../../store/axios-be.js'

class Carteras extends Component {
  state = {
    creditos_vigentes: [],
    creditos_vencidos: [],
    total_vigentes: null,
    total_vencidos: null,
    count_vigentes: null,
    count_vencidos: null,
    formIsValid: false,
    loading: true,
    loadingSaldos: true,
    pendingConcils: 0,
    form: {
      initialDate: {
        elementType: 'input',
        elementConfig: {
          type: 'date'
        },
        label: (<><FormattedMessage id="banco.initialDate"/>*</>),
        value: '',
        validation: {
          required: false
        },
        valid: false,
        touched: false,
        hide: false
      },
    }
  }

  componentDidMount () {
    this.onGetCarteras()
  }

  onGetCarteras () {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    let stDate = ''
    if (this.state.form.initialDate.value) {
      const tmpStartDate = new Date(this.state.form.initialDate.value)
      stDate = `date=${tmpStartDate.toISOString().substring(0, 10)}`
    }

    axios.get('/contratos/carteras/?detail=1&'+stDate , authData)
      .then(response => {
        this.setState({
          total_vigentes: response.data.vigentes_total,
          total_vencidos: response.data.vencidos_total,
          count_vigentes: response.data.vigentes_count,
          count_vencidos: response.data.vencidos_count,
          creditos_vigentes: response.data.vigentes,
          creditos_vencidos: response.data.vencidos,
          loading: false,
        })
      })
      .catch(error => {
        this.setState({
          total_vigentes: 'N/D',
          total_vencidos: 'N/D',
          count_vigentes: 'N/D',
          count_vencidos: 'N/D',
          creditos_vigentes: [],
          creditos_vencidos: [],
          loading: false,
        })
        // TODO: FALTA!!
      })

  }

  onSubmitForm = (event) => {
    event.preventDefault();
    this.onGetCarteras()
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

  render () {

    let carterasTotales, creditosVigentesTable, creditosVencidosTable = <Spinner/>
    if (!this.state.loading) {
      carterasTotales = (
        <TotalCarteras
          vigentes={this.state.total_vigentes}
          vencidos={this.state.total_vencidos}
          vigentes_count={this.state.count_vigentes}
          vencidos_count={this.state.count_vencidos}

        />
      )
      creditosVigentesTable = <CreditoListCont data={this.state.creditos_vigentes}/>
      creditosVencidosTable = <CreditoListCont data={this.state.creditos_vencidos}/>
    }

    return (
      <>
        <div className={classes.Container}>
          <Title
            titleName="carteras.title"/>
          <div className={classes.CardsContainer}>
            <div>
              <Card title={"carteras.fechas"}>
                <div label="movimientos.buscarSocio">
                  <form className={classes.Form} onSubmit={this.onSubmitForm}>
                    <div className={classes.Inputs}>
                      <Input
                        label={this.state.form.initialDate.label}
                        key= {'bancoFormInput1'}
                        elementType={this.state.form.initialDate.elementType}
                        elementConfig={this.state.form.initialDate.elementConfig}
                        value={this.state.form.initialDate.value}
                        shouldValidate={this.state.form.initialDate.validation}
                        invalid={!this.state.form.initialDate.valid}
                        touched={this.state.form.initialDate.touched}
                        disabled={this.props.loading}
                        hide={this.state.form.initialDate.hide}
                        changed={(event) => this.inputChangedHandler(event, 'initialDate')}
                        focused
                        />
                    </div>
                    <Button
                      btnType="Success">
                      <FormattedMessage id="buscar"/>
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
            <div>
              <Card title={"carteras.totales"}>
                {carterasTotales}
              </Card>
            </div>
            <div className={classes.longCard}>
              <Card title={"carteras.vigentes"}>
                {creditosVigentesTable}
              </Card>
            </div>
            <div className={classes.longCard}>
              <Card title={"carteras.vencidos"}>
                {creditosVencidosTable}
              </Card>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      role: state.generalData.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carteras)
