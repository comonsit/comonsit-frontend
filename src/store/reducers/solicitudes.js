import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  solicitudes: null,
  loading: false,
  updated: false
}

const setSocios = (state, action) => {
  return updateObject(state, {
    solicitudes: action.solicitudes,
  })
}

const newSolicitudStart = (state) => {
  return updateObject(state, {
    loading: true,
    updated: false
  })
}

const newSolicitudSuccess = (state) => {
  return updateObject(state, {
    loading: false,
    updated: true
  })
}

const newSolicitudFailed = (state) => {
  return updateObject(state, {
    loading: false,
    updated: false
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_SOLICITUDES: return setSocios(state, action)
    //case actionTypes.FETCH_SOCIOS_FAILED: return updateObject(state, {error: true})
    case actionTypes.NEW_SOLICITUD_START: return newSolicitudStart(state)
    case actionTypes.NEW_SOLICITUD_SUCCESS: return newSolicitudSuccess(state)
    case actionTypes.NEW_SOLICITUD_FAILED: return newSolicitudFailed(state)
    default:
      return state
  }
}

export default reducer
