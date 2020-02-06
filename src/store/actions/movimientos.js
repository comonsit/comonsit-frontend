import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';


export const setMovimientos = (movimientos) => {
  return {
    type: actionTypes.SET_MOVIMIENTOS,
    movimientos: movimientos
  }
}

export const initMovimientos = (token, socioId) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/movimientos/?clave_socio=' + socioId, authData)
      .then(response => {
        dispatch(setMovimientos(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchAcopioesFailed())
      })
  }
}
