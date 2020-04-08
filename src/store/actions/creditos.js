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
