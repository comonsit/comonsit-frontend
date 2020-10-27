import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Subcuentas.module.scss'
import BancosSaldos from '../BancosSaldos/BancosSaldos'
import Card from '../../../../components/UI/Card/Card';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Title from '../../../../components/UI/Title/Title';
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'
// import * as actions from '../../../store/actions'
import axios from '../../../../store/axios-be.js'

class Subcuentas extends Component {
  state = {
    saldos: [],
    formIsValid: false,
    loadingSaldos: true,
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
      finalDate: {
        elementType: 'input',
        elementConfig: {
          type: 'date'
        },
        label: (<><FormattedMessage id="banco.finalDate"/>*</>),
        value: '',  //.toISOString().substring(0, 10),
        validation: {
          required: false
        },
        valid: false,
        touched: false,
        hide: false
      },
    }
  }

  componentDidMount() {
    this.onGetRegistros()
  }

  // TODO: duplicated with bancos
  getFormattedQueryDates = () => {
    let stDate = ''
    if (this.state.form.initialDate.value) {
      const tmpStartDate = new Date(this.state.form.initialDate.value)
      stDate = `initialDate=${tmpStartDate.toISOString().substring(0, 10)}`
    }
    let endDate = ''
    if (this.state.form.finalDate.value) {
      const tmpEndDate = new Date(this.state.form.finalDate.value)
      endDate = `finalDate=${tmpEndDate.toISOString().substring(0, 10)}`
    }
    return [stDate, endDate]
  }

  onGetRegistros = () => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    const [stDate, endDate] = this.getFormattedQueryDates()

    this.setState({ loadingSaldos: true })

    axios.get('/subcuentas/saldos/?'+stDate+'&'+endDate, authData)
      .then(response => {
        this.setState({
          saldos: response.data,
          loadingSaldos: false
        })
      })
      .catch(error => {
        this.setState({
          saldos: [],
          loadingSaldos: false,
        })
        // TODO: FALTA!!
      })
  }

  onSubmitForm = event => {
    event.preventDefault();
    this.onGetRegistros()
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

  render() {
    let saldosTable = <Spinner/>

    if (!this.state.loadingSaldos) {
      saldosTable = (
        <BancosSaldos
          data={this.state.saldos}
          onClick={() => {}}
        />
      )
    }

    return (
      <>
        <div className={classes.Container}>
          <Title
            titleName="subcuentas.title">
          </Title>
          <div className={classes.CardsContainer}>
            <div>
              <Card title={"banco.fechas"}>
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
                      <Input
                        label={this.state.form.finalDate.label}
                        key= {'bancoFormInput2'}
                        elementType={this.state.form.finalDate.elementType}
                        elementConfig={this.state.form.finalDate.elementConfig}
                        value={this.state.form.finalDate.value}
                        shouldValidate={this.state.form.finalDate.validation}
                        invalid={!this.state.form.finalDate.valid}
                        touched={this.state.form.finalDate.touched}
                        disabled={this.props.loading}
                        hide={this.state.form.finalDate.hide}
                        changed={(event) => this.inputChangedHandler(event, 'finalDate')}
                        />
                    </div>
                    <Button
                      btnType="Success">
                      <FormattedMessage id="banco.buscar"/>
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
            <div>
              <Card table title={"banco.totales"}>
                {saldosTable}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subcuentas))
