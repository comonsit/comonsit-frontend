import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';
import { setError, clearError } from './errors'

export const setCreditos = creditos => {
  return {
    type: actionTypes.SET_CREDITOS,
    creditos: creditos
  }
}

export const initCreditos = (token, fetchAll) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    const all = fetchAll ? '/all/' : '.json'
    axios.get('/contratos' + all, authData)
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

export const updateCredito = (creditoData, id, token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    dispatch(updateCreditoStart())
    axios.patch(`/contratos/${id}.json`, creditoData, authData)
      .then(response => {
        dispatch(updateCreditoSuccess(response.data.name, creditoData ))
        alert('Credito ' + response.data.id + ' actualizado correctamente')
        dispatch(clearError())
      })
      .catch(error => {
        dispatch(updateCreditoFailed())
        dispatch(setError(error.response.data))
      })
  }
}

export const updateCreditoSuccess = () => {
  return {
    type: actionTypes.UPDATE_CREDITO_SUCCESS
  }
}

export const updateCreditoFailed = () => {
  return {
    type: actionTypes.UPDATE_CREDITO_FAILED,
  }
}

export const updateCreditoStart = () => {
  return {
    type: actionTypes.UPDATE_CREDITO_START
  }
}
