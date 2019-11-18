import * as actionTypes from './actionTypes'
// import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    // aquí borramos los datos guardados localmente
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

// checamos si no ha caducado nuestro token
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            //dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch =>  {
        dispatch (authStart())
        // const authData = {
        //     email: email,
        //     password: password,
        //     // esto lo requiere firebase, siempre verdadero
        //     returnSecureToken: true
        // }

        // let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCY-xEqGegh-QwupLT-_OTkv5uTFSt_Ky0'
        // if (! isSignUp) {
        //     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCY-xEqGegh-QwupLT-_OTkv5uTFSt_Ky0'
        // }
        //habilitamos usuarios en firebase y lo sacamos de aquí:
        // https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
        // axios.post(url , authData)
        //     .then(response => {
        //         //console.log(response);
        //         // esto es de Javascript y va a guardar los datos!!
        //         // ¿como una cookie?
        //         // COOOL!
        //         localStorage.setItem('token', response.data.idToken)
        //         // hacemos un cálculo de cuál será la fecha en la que expirará
        //         const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        //         localStorage.setItem('expirationDate', expirationDate)
        //         localStorage.setItem('userId', response.data.localId)
        //         dispatch(authSuccess(response.data.idToken, response.data.localId))
        //         dispatch (checkAuthTimeout(response.data.expiresIn))
        //     })
        //     .catch(err=> {
        //         //console.log(err)
        //         dispatch(authFail(err.response.data.error))
        //     })

        // TEMPORAL!!!
        if (email === "xmary@comonsit.com" && password === "clave123") {
          localStorage.setItem('token', 'idTokn55')
          // hacemos un cálculo de cuál será la fecha en la que expirará
          const expirationDate = new Date(new Date().getTime() + 300000 * 1000)  // TODO: cuánto de expiración?
          localStorage.setItem('expirationDate', expirationDate)
          localStorage.setItem('userId', "theLOCALid")
          dispatch(authSuccess('idTokn55', "theLOCALid"))
          dispatch (checkAuthTimeout(expirationDate))
        }
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

// aquí al iniciar (en app) cargamos los datos
// ... de la sesión anterior, token y expiration date
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            // por qué este logout
            dispatch(logout())
        } else {
            const expirationDate = new Date( localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                // pasamos la resta de segundos que quedan
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
