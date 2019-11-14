import React, { Component } from 'react'
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux'

// import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import classes from './Acceso.module.css'
import * as actions from '../../../store/actions'
// import { updateObject } from '../../../store/reducers/utility'
// import {checkValidity } from '../../../utilities/validity'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Usuario'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
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
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
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
        // const updatedControls = updateObject(this.state.controls, {
        //     [controlName]: updateObject(this.state.controls[controlName], {
        //         value: event.target.value,
        //         valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        //         touched: true
        //     })
        // })
        // this.setState({controls: updatedControls})
    }

    submitHandler = (event, ) => {
        // event.preventDefault()
        // this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            // esto hace un toggle del estado
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render () {
        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType }
                elementConfig={formElement.config.elementConfig }
                value={formElement.config.value }
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))

        // if (this.props.loading) {
        //     form = <Spinner />
        // }

        // let errorMessage = null
        //
        // if (this.props.error) {
        //     errorMessage = (
        //         <p>{this.props.error.message}</p>
        //     )
        // }

        // let authRedirect = null
        // if (this.props.isAuthenticated) {
        //     authRedirect = <Redirect to={this.props.authRedirectPath}/>
        // }

        return (
            <div className={classes.AccesoContainer}>
              <div className={classes.Acceso}>
                <form onSubmit={this.submitHandler}>
                  {form}
                  <NavLink to="/" exact>Olvidé mi contraseña</NavLink>
                  <Button btnType="Success">Submit</Button>
                </form>
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
        // buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        // si venimos de aquí siempre reenviaremos a casa!!!
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
