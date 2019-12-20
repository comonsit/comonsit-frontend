import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';
import { fetchGralData } from './generalData'

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
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshExpirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const startTokenTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(refreshToken())
    }, expirationTime)
  }
}

export const startRefreshTokenTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      console.log("TIMEOUT LOGOUT")
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

      axios.post(url , authData)
          .then(response => {
              localStorage.setItem('token', response.data.access)
              localStorage.setItem('refreshToken', response.data.refresh)
              // hacemos un cálculo de cuál será la fecha en la que expirará
              const fiveMinutes = 5 * 60 * 1000
              const twentyFourHours = 24 * 60 * 60 * 1000
              const refreshExpirationDate = new Date(new Date().getTime() + twentyFourHours)
              // TODO: CHANGE FOR USE REFRESH!? response.data.refresh
              // const expirationRefreshDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
              localStorage.setItem('refreshExpirationDate', refreshExpirationDate)
              localStorage.setItem('userId', response.data.localId)
              dispatch(authSuccess(response.data.access, response.data.localId))
              dispatch(fetchGralData(response.data.access))
              dispatch(startTokenTimeout(fiveMinutes))
              dispatch(startRefreshTokenTimeout(twentyFourHours))
          })
          .catch(error => {
            if (error.response) {
              dispatch(authFail(error.response.data.detail))
            } else if (error.request) {
              console.log(error.request);
              dispatch(authFail('Servidor No Responde'))
            }

          })
  }
}


export const refreshToken = () => {
  return dispatch => {
    const rToken = {
        refresh: localStorage.getItem('refreshToken')
    }
    axios.post('/token/refresh/' , rToken)
      .then(response => {
        console.log('REFRESHING TOKEN')
        localStorage.setItem('token', response.data.access)
        const fiveMinutes = 5 * 60 * 1000
        const refreshExpirationDate = new Date(new Date().getTime() + fiveMinutes)
        localStorage.setItem('refreshExpirationDate', refreshExpirationDate)
        dispatch(authSuccess(response.data.access, response.data.localId))
        dispatch (startTokenTimeout(fiveMinutes, false))
      })
      .catch(err=> {
        console.log('FAILED TO REFRESH')
        console.log(err.response.data);
        dispatch(authFail(err.response.data.detail))
      })
  }
}



export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      // TODO: METER LÓGICA REFRESH
      const refreshExpirationDate = new Date( localStorage.getItem('refreshExpirationDate'))
      if (refreshExpirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(refreshToken())
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(startRefreshTokenTimeout(refreshExpirationDate - new Date().getTime()))
        dispatch(fetchGralData(token))
      }
    }
  }
}
