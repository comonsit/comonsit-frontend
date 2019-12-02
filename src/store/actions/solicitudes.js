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
        console.log("FETCHING SOLICITUDES");
        // console.log(response.data)
        dispatch(setSolicitudes(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchSolicitudesFailed())
      })
  }
}
