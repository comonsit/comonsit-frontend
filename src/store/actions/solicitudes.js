import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';


export const setSolicitudes = (solicitudes) => {
  return {
    type: actionTypes.SET_SOLICITUDES,
    solicitudes: solicitudes
  }
}

export const initSolicitudes = (token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/solic-creditos.json', authData)
      .then(response => {
        dispatch(setSolicitudes(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchSolicitudesFailed())
      })
  }
}

export const createNewSolicitud = (solData, token) => {
    return dispatch => {
      const authData = {
        headers: { 'Authorization': `Bearer ${token}` },
      }
      dispatch(newSolicitudStart())
      axios.post(`/solic-creditos/`, solData, authData)
          .then(response => {
            dispatch(newSolicitudSuccess(response.data.folio_solicitud, solData ))
          })
          .catch(error => {
            dispatch(newSolicitudFailed())
          })
    }
}

export const newSolicitud = () => {
    return {
        type: actionTypes.NEW_SOLICITUD
    }
}

export const newSolicitudSuccess = (id) => {
    return {
        type: actionTypes.NEW_SOLICITUD_SUCCESS
    }
}

export const newSolicitudFailed = (error) => {
    return {
        type: actionTypes.NEW_SOLICITUD_FAILED,
        error: error
    }
}

export const newSolicitudStart = () => {
    return {
        type: actionTypes.NEW_SOLICITUD_START
    }
}

export const fetchSelSolicitud = (token, solId) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get(`/solic-creditos/${solId}.json`, authData)
      .then(response => {
        dispatch(setSelSolicitud(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchSociosFailed())
      })
  }
}

export const setSelSolicitud = (selectedSolicitud) => {
    return {
        type: actionTypes.SET_SEL_SOLICITUD,
        selectedSolicitud: selectedSolicitud
    }
}


export const unSelectSolicitud = () => {
  return {
    type: actionTypes.UNSELECT_SOLICITUD
  }
}
