import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';
import { setError, clearError } from './errors'

export const setAcopios = (acopios) => {
  return {
    type: actionTypes.SET_ACOPIOS,
    acopios: acopios
  }
}

export const initAcopios = (token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/acopios.json', authData)
      .then(response => {
        dispatch(setAcopios(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchAcopioesFailed())
      })
  }
}

export const createNewAcopio = (acopioData, token) => {
    return dispatch => {
      const authData = {
        headers: { 'Authorization': `Bearer ${token}` },
      }
      dispatch(newAcopioStart())
      axios.post(`/acopios/`, acopioData, authData)
          .then(response => {
            dispatch(newAcopioSuccess(response.data.id, acopioData ))
            alert('Acopio ' + response.data.id + ' creado correctamente')
            dispatch(clearError())
          })
          .catch(error => {
            dispatch(newAcopioFailed())
            dispatch(setError(error.response.data))
          })
    }
}

export const newAcopio = () => {
  return {
    type: actionTypes.NEW_ACOPIO
  }
}

export const newAcopioSuccess = (id) => {
  return {
    type: actionTypes.NEW_ACOPIO_SUCCESS
  }
}

export const newAcopioFailed = () => {
  return {
    type: actionTypes.NEW_ACOPIO_FAILED
  }
}

export const newAcopioStart = () => {
  return {
    type: actionTypes.NEW_ACOPIO_START
  }
}

export const getSocioSaldo = (token, socio) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/acopios/year_sum/?clave_socio='+socio, authData)
      .then(response => {
        dispatch(setSocioSaldo(response.data, socio))
      })
      .catch(error => {
        console.log('GOT AN ERROR AT  SALDO')
        dispatch(getSocioSaldoFailed())
      })
  }
}

export const setSocioSaldo = (saldo, socio) => {
  return {
    type: actionTypes.SET_SOCIO_SALDO,
    socioSaldo: saldo,
    selSocio: socio
  }
}

export const getSocioSaldoFailed = error => {
  return {
    type: actionTypes.GET_SOCIO_SALDO_FAILED,
    error: error
  }
}

export const clearSocioSaldo = () => {
  return {
    type: actionTypes.CLEAR_SOCIO_SALDO
  }
}
