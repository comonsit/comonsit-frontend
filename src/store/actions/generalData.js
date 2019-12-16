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
        //dispatch(fetchComunidadsFailed())
      })
    axios.get('/regiones.json', authData)
      .then(response => {
        dispatch(setRegiones(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchComunidadsFailed())
      })
    axios.get('/cargos.json', authData)
      .then(response => {
        dispatch(setCargos(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchComunidadsFailed())
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


export const updateComunidadSuccess = (id, data) => {
  return {
    type: actionTypes.UPDATE_COMUNIDAD_SUCCESS
  }
}

export const updateComunidadFailed = (error) => {
  return {
    type: actionTypes.UPDATE_COMUNIDAD_FAILED,
    error: error
  }
}

export const updateComunidadStart = () => {
  return {
    type: actionTypes.UPDATE_COMUNIDAD_START
  }
}

export const updateComunidad = (data, id, token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` },
      id: id,
      ...data
    }
    dispatch(updateComunidadStart())
    axios.put(`/comunidades/${id}.json`, authData)
      .then(response => {
        dispatch(updateComunidadSuccess(response.data.name, data ))
      })
      .catch(error => {
        dispatch(updateComunidadFailed(error))
      })
  }
}

export const selectComunidad = (id) => {
  return {
    type: actionTypes.SET_SEL_COMUNIDAD,
    id: id
  }
}

export const unSelectComunidad = () => {
  return {
    type: actionTypes.UNSELECT_COMUNIDAD
  }
}
