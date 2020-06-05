import React from 'react';
import { FormattedMessage } from 'react-intl';
import { sayTseltal }from '@mauricioinaz/say-tseltal'
import classes from './Numbers.module.css'

import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tseltalNumber: false,
      form: {
        number: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..'
          },
          label: (<><FormattedMessage id="inicio.numero"/></>),
          value: '',
          validation: {
            required: true,
            isNumeric: true,
            minNumValue: 0,
            maxNumValue: 60800000
          },
          valid: true,
          touched: true,
          hide: false
        }
      }
    }
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    this.setState({tseltalNumber: sayTseltal(this.state.form.number.value)})
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


    return (
      <div className={classes.Container}>
        <div>
          <form className={classes.Form} onSubmit={this.onSubmitForm}>
            <div className={classes.Inputs}>
              <Input
                label={this.state.form.number.label}
                key= {'numberTseltal1'}
                elementType={this.state.form.number.elementType}
                elementConfig={this.state.form.number.elementConfig}
                value={this.state.form.number.value}
                shouldValidate={this.state.form.number.validation}
                invalid={!this.state.form.number.valid}
                touched={this.state.form.number.touched}
                disabled={this.props.loading}
                hide={this.state.form.number.hide}
                changed={(event) => this.inputChangedHandler(event, 'number')}
                focused
                />
            </div>
            <Button
              btnType="Short"
              disabled={!this.state.formIsValid}>
              <FormattedMessage id="inicio.numeroTradcurir"/>
            </Button>
          </form>
        </div>
        <div className={classes.ResultsContainer}>
          <strong>{this.state.tseltalNumber}</strong>
        </div>
      </div>
    )
  }
}

export default Weather;
