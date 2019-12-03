import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';

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
      console.log("5 MINUTE LOGOUT")
      dispatch(logout())
    }, expirationTime)
  }
}

export const auth = (username, password, isSignUp) => {
  return dispatch =>  {
      dispatch (authStart())
      const authData = {
          username: username,
          password: password,
      }

      let url = '/token/'
      // if (isSignUp) {
      //     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCY-xEqGegh-QwupLT-_OTkv5uTFSt_Ky0'
      // }

      axios.post(url , authData)
          .then(response => {
              // console.log(response);
              localStorage.setItem('token', response.data.access)
              // hacemos un cálculo de cuál será la fecha en la que expirará
              const fiveMinutes = 5 * 60 * 1000
              const expirationDate = new Date(new Date().getTime() + fiveMinutes)
              // TODO: CHANGE FOR USE REFRESH!? response.data.refresh
              // const expirationRefreshDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
              localStorage.setItem('expirationDate', expirationDate)
              localStorage.setItem('userId', response.data.localId)
              dispatch(authSuccess(response.data.access, response.data.localId))
              dispatch(fetchGralData(response.data.access, response.data.localId))
              dispatch (checkAuthTimeout(fiveMinutes))
          })
          .catch(err=> {
              //console.log(err)
              dispatch(authFail(err.response.data.error))
          })
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
      dispatch(logout())
    } else {
      // TODO: METER LÓGICA REFRESH
      const expirationDate = new Date( localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch (checkAuthTimeout(expirationDate - new Date().getTime()))
        dispatch(fetchGralData(token, userId))
      }
    }
  }
}


export const fetchGralData = (token, userId) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/comunidades.json', authData)
      .then(response => {
        dispatch(setComunidades(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchSociosFailed())
      })
    axios.get('/regiones.json', authData)
      .then(response => {
        dispatch(setRegiones(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchSociosFailed())
      })
    axios.get('/cargos.json', authData)
      .then(response => {
        dispatch(setCargos(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchSociosFailed())
      })
  }
}

export const setRegiones = (regiones) => {
  return {
    type: actionTypes.SET_REGIONES,
    regiones: regiones
  }
}


export const setComunidades = (comunidades) => {
  return {
    type: actionTypes.SET_COMUNIDADES,
    comunidades: comunidades
  }
}


export const setCargos = (cargos) => {
  return {
    type: actionTypes.SET_CARGOS,
    cargos: cargos
  }
}
