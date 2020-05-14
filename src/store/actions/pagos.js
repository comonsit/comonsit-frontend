import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';


export const setPagos = pagos => {
  return {
    type: actionTypes.SET_PAGOS,
    pagos: pagos
  }
}

export const initPagos = (token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/pagos.json', authData)
      .then(response => {
        dispatch(setPagos(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchPagosFailed())
      })
  }
}

export const fetchSelPago = (token, pagoId) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get(`/pagos/${pagoId}.json`, authData)
      .then(response => {
        dispatch(setSelPagos(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchPagosFailed())
      })
  }
}

export const setSelPagos = (selectedPago) => {
  return {
    type: actionTypes.SET_SEL_PAGO,
    selectedPago: selectedPago
  }
}

export const unSelectPago = () => {
  return {
    type: actionTypes.UNSELECT_PAGO
  }
}
