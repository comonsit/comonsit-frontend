import React, { Component } from 'react'
import {NavLink, Redirect} from "react-router-dom";
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux'
import _ from 'lodash';

// import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './Acceso.module.scss'
import * as actions from '../../../store/actions'
import { updateObject } from '../../../store/reducers/utility'
import {checkValidity } from '../../../utilities/validity'


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Usuario'
                },
                value: '',
                validation: {
                    required: true,
                    // minLength: 3,
                    isAlphaNumeric: true
                },
                valid: false,
                errorMessage: "",
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Contraseña'
                },
                value: '',
                validation: {
                    required: true,
                    // minLength: 6
                },
                valid: false,
                errorMessage: "",
                touched: false
            }
        },
        isSignUp: true
    }

    componentWillUnmount() {
      this.props.onClearError()
    }

    // componentDidMount() {
    //     // aquí nos aseguramos que si no estabamos haciendo una burgerReducer
    //     // .. o  venimos del auth
    //     // que el redirect sea al '/'
    //     if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
    //         this.props.onSetAuthRedirectPath()
    //     }
    // }

    // para estar revisando cada vez que el texto se modifica
    inputChangedHandler  = (event, controlName) => {

        const validation = checkValidity(event.target.value, this.state.controls[controlName].validation, true)

        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: validation.valid,
                errorMessage: validation.errorMessage,
                touched: true
            })
        })
        this.setState({controls: updatedControls})
        if (this.props.formError && controlName in this.props.formError) {
          this.props.onClearError()
        }
    }

    submitHandler = (event, ) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            // esto hace un toggle del estado
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render () {
      const keysOrder = ["email", "password"]
      const formElementsArray = []
      keysOrder.forEach(key => {
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        })
      })

        let form = formElementsArray.map(formElement => {
          const serverErrorMessage = _.get(this.props.formError, formElement.id, "")
          return (
             <Input
                 key={formElement.id}
                 elementType={formElement.config.elementType }
                 elementConfig={formElement.config.elementConfig }
                 value={formElement.config.value }
                 shouldValidate={formElement.config.validation}
                 invalid={!formElement.config.valid || serverErrorMessage !== ""}
                 errorMessage={formElement.config.errorMessage + serverErrorMessage}
                 touched={formElement.config.touched}
                 changed={(event) => this.inputChangedHandler(event, formElement.id)}
               />
          )
        })

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null

        if (this.props.error) {
            errorMessage = (
                <p className={classes.ErrorMessage}>{this.props.error}</p>
            )
        }

        let authRedirect = null  // TODO: usar: this.props.authRedirectPath
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={"/inicio"}/>
        }

        // TODO: hacer Olvidé mi contraseña NavLink GENÉRICO!
        return (
            <div className={classes.AccesoContainer}>
              {authRedirect}
              <div className={classes.Acceso}>
                <form onSubmit={this.submitHandler}>
                  {form}
                  <NavLink to="/" exact><FormattedMessage id="acceder.pswd-help"/></NavLink>
                  <Button btnType="Success"><FormattedMessage id="acceder.submit"/></Button>
                </form>
                {errorMessage}
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        formError: state.errors.errors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        // si venimos de aquí siempre reenviaremos a casa!!!
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/publicaciones')),  // TODO: CHECK!!
        onClearError: () => dispatch(actions.clearError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
