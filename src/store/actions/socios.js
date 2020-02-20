import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';


export const setSocios = (socios) => {
  return {
    type: actionTypes.SET_SOCIOS,
    socios: socios
  }
}

export const setSelSocios = (selectedSocio) => {
  return {
    type: actionTypes.SET_SEL_SOCIO,
    selectedSocio: selectedSocio
  }
}

export const unSelectSocio = () => {
  return {
    type: actionTypes.UNSELECT_SOCIO
  }
}

export const newSocio = () => {
  return {
    type: actionTypes.NEW_SOCIO
  }
}

export const initSocios = (token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/socios.json', authData)
      .then(response => {
        dispatch(setSocios(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchSociosFailed())
      })
  }
}

export const fetchSelSocio = (token, socioId) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get(`/socios/${socioId}.json`, authData)
      .then(response => {
        dispatch(setSelSocios(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchSociosFailed())
      })
  }
}

export const updateSocioSuccess = (id, orderData) => {
  return {
    type: actionTypes.UPDATE_SOCIO_SUCCESS
  }
}

export const updateSocioFailed = (error) => {
  return {
    type: actionTypes.UPDATE_SOCIO_FAILED,
    error: error
  }
}

export const updateSocioStart = () => {
  return {
    type: actionTypes.UPDATE_SOCIO_START
  }
}

export const updateSocio = (socioData, socioId, token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` },
      clave_socio: socioId,
      ...socioData
    }
    dispatch(updateSocioStart())
    axios.put(`/socios/${socioId}.json`, authData)
      .then(response => {
        dispatch(updateSocioSuccess(response.data.name, socioData ))
        alert('Socio ' + response.data.clave_socio + ' editado correctamente')
      })
      .catch(error => {
        dispatch(updateSocioFailed(error))
      })
  }
}

export const createNewSocio = (socioData, token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    dispatch(newSocioStart())
    axios.post(`/socios/`, socioData, authData)
      .then(response => {
        dispatch(newSocioSuccess(response.data.name, socioData ))
        alert('Socio ' + response.data.clave_socio + ' creado correctamente')
      })
      .catch(error => {
        dispatch(newSocioFailed(error))
      })
  }
}

export const newSocioSuccess = (id, orderData) => {
  return {
    type: actionTypes.NEW_SOCIO_SUCCESS
  }
}

export const newSocioFailed = (error) => {
  return {
    type: actionTypes.NEW_SOCIO_FAILED,
    error: error
  }
}

export const newSocioStart = () => {
  return {
    type: actionTypes.NEW_SOCIO_START
  }
}
