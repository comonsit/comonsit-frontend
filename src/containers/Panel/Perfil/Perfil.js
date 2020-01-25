import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import classes from './Perfil.module.css'
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { updateObject } from '../../../store/reducers/utility'
import { checkValidity } from '../../../utilities/validity'
import axios from '../../../store/axios-be.js';
import * as actions from '../../../store/actions'


class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      formIsValid: false,
      form: {
        first_name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..nombres'
          },
          label: (<FormattedMessage id="nombres"/>),
          value: this.props.user.first_name,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        last_name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..nombres'
          },
          label: (<FormattedMessage id="apellidos"/>),
          value: this.props.user.last_name,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          hide: false
        },
        phone: {
          elementType: 'input',
          elementConfig: {
            type: 'tel',
            placeholder: '..teléfono'
          },
          label: (<FormattedMessage id="telefono"/>),
          value: this.props.user.phone,
          validation: {
            required: false,
            minLength: 10,
            maxLength: 10,
            isNumeric: true
          },
          valid: true,
          touched: false,
        },
      }
    }
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    this.setState({editing: false})

    const formData = {}
    for (let formElementIdentifier in this.state.form) {
      if (this.state.form[formElementIdentifier].touched) {
        formData[formElementIdentifier] = this.state.form[formElementIdentifier].value
      }
    }

    this.setState({loading: true})
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    axios.patch('/users/me.json', formData, authData)
      .then(response => {
        this.setState({loading: false})
        this.props.updateUser(response.data)
        //dispatch update user data
      })
      .catch(error => {
        this.setState({loading: true})
      })
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

  onStartEditing = () => {
    this.setState({editing: true})
  }

  render () {
    const formOrder = ["first_name", "last_name", "phone"]
    const formElementsArray = []
    let submitButton, editButton

    formOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      })
    })

    const formElements = formElementsArray.map(formElement => {
      return (
        <div
          key= {formElement.id}
          >
          <div className={classes.Inputs}>
            <Input
              label={formElement.config.label}
              key= {formElement.id}
              elementType={formElement.config.elementType }
              elementConfig={formElement.config.elementConfig }
              value={formElement.config.value}
              shouldValidate={formElement.config.validation}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              disabled={!this.state.editing}
              hide={formElement.config.hide}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
          </div>
        </div>
      )
    })

    if (this.state.editing || this.props.new) {
      submitButton = <Button btnType="Success" disabled={!this.state.formIsValid}><FormattedMessage id="saveButton"/></Button>
      editButton = null
    }else {
      submitButton = null
      editButton = <Button clicked={this.onStartEditing} disabled={this.state.editing}><FormattedMessage id="editButton"/></Button>
    }

    return (
      <>
      <div className={classes.Container}>
        <div className={classes.HeaderContainer}>
          <h1><FormattedMessage id="perfil.title"/></h1>
          {editButton}
        </div>
        <form onSubmit={this.onSubmitForm}>
          <div className={classes.Form}>
          {formElements}
          </div>
          {submitButton}
        </form>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      user: state.generalData.user,
      token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      updateUser: (userData) => dispatch(actions.setUser(userData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Perfil, axios))
