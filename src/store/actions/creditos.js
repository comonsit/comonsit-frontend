import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';


export const setCreditos = creditos => {
  return {
    type: actionTypes.SET_CREDITOS,
    creditos: creditos
  }
}

export const initCreditos = (token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/contratos.json', authData)
      .then(response => {
        dispatch(setCreditos(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchCreditosFailed())
      })
  }
}

export const fetchSelContrato = (token, id) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get(`/contratos/${id}.json`, authData)
      .then(response => {
        dispatch(setSelContrato(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchFailed())
      })
  }
}

export const setSelContrato = selectedContrato => {
  return {
    type: actionTypes.SET_SEL_CONTRATO,
    selectedContrato: selectedContrato
  }
}

export const unSelectContrato = () => {
  return {
    type: actionTypes.UNSELECT_CONTRATO
  }
}
