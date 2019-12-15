import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';


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
