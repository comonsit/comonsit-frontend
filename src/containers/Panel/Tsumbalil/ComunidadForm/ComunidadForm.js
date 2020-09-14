import React, { Component } from 'react'
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'
import axios from '../../../../store/axios-be.js'

import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Title from '../../../../components/UI/Title/Title';
import classes from './ComunidadForm.module.scss'
import * as actions from '../../../../store/actions'
import { updateObject } from '../../../../store/reducers/utility'
import { checkValidity } from '../../../../utilities/validity'


class ComunidadForm extends Component {
  constructor(props) {
    super(props);
    //// TODO: this.props.map here should be done???
    this.state = {
      editing: this.props.new,
      formIsValid: !this.props.new,
      comunidadForm: {
        nombre_de_comunidad: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '..nombre comunidad'
          },
          label: (<><FormattedMessage id="comunidadForm.nombre_de_comunidad"/>*</>),
          value: this.props.selComunidad.nombre_de_comunidad,
          validation: {
            required: true
          },
          valid: !this.props.new,
          touched: false,
        },
        region: {
          elementType: 'select',
          elementConfig: {
            options: this.props.regiones.map(r => ({"value": r.id, "displayValue": r.id +' - ' +r.nombre_de_region}))
          },
          label: (<><FormattedMessage id="tsumbalil.nombre_region"/>*</>),
          value: this.props.selComunidad.region,
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        }
      }
    }
  }


  onSubmitForm = (event) => {
    event.preventDefault();
    this.setState({editing: false})


    const formData = {}
    for (let formElementIdentifier in this.state.comunidadForm) {
      formData[formElementIdentifier] = this.state.comunidadForm[formElementIdentifier].value
    }

    const comunidad = {
        ...formData
    }

    if (this.props.new) {
      this.props.onCreateNewComunidad(comunidad, this.props.token)
    } else {
      this.props.onEditComunidad(comunidad, this.props.selComunidad.id, this.props.token)
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {

    let updatedFormElement

      updatedFormElement = updateObject(this.state.comunidadForm[inputIdentifier], {
          value: event.target.value,
          valid: checkValidity(event.target.value, this.state.comunidadForm[inputIdentifier].validation),
          touched: true
      })

    const updatedForm = updateObject(this.state.comunidadForm, {
        [inputIdentifier]: updatedFormElement
    })

    let formIsValid = true
    for (let inputIds in updatedForm) {
        formIsValid = updatedForm[inputIds].valid && formIsValid
    }

    this.setState({comunidadForm: updatedForm, formIsValid: formIsValid})
  }

  onStartEditing = () => {
    this.setState({editing: true})
  }

  render () {
    // SINGLE SOCIO
    // TODO: done to keep order in Safari. improvement?
    const formOrder = ["nombre_de_comunidad", "region"]
    const formElementsArray = []
    let formElements = <Spinner/>
    let submitButton, editButton

    formOrder.forEach(key => {
      formElementsArray.push({
        id: key,
        config: this.state.comunidadForm[key]
      })
    })

    if (this.props.selComunidad && ! this.props.loading) {
      formElements = formElementsArray.map(formElement => {

        return (
            <div
              className={classes.Inputs}
              key= {formElement.id}>
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            </div>
            )
      })
    }

    if (this.state.editing || this.props.new) {
      submitButton = <Button btnType="Success" disabled={!this.state.formIsValid}><FormattedMessage id="saveButton"/></Button>
      editButton = null
    }else {
      submitButton = null
      editButton = <Button clicked={this.onStartEditing} disabled={this.state.editing}><FormattedMessage id="editButton"/></Button>
    }

    return (
      <>
        <Title
          titleName="comunidadForm.title"
          titleNameEx={": " + this.state.comunidadForm.nombre_de_comunidad.value}
          >
          {editButton}
        </Title>
        <form onSubmit={this.onSubmitForm}>
          <div className={classes.Form}>
          {formElements}
          </div>
          {submitButton}
        </form>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    selComunidad: state.generalData.selectedComunidad,
    loading: state.generalData.loading,
    token: state.auth.token,
    regiones: state.generalData.regiones,
    comunidades: state.generalData.comunidades,
    new: state.generalData.newComunidad
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onEditComunidad: (comunidadData, id, token) => dispatch(actions.updateComunidad(comunidadData, id, token)),
      onCreateNewComunidad: (comunidadData, token) => dispatch(actions.createNewComunidad(comunidadData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ComunidadForm, axios))
