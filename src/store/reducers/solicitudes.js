import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  solicitudes: [{}],
  loading: false,
  updated: false,
  selectedSolicitud: null
}

const setSocios = (state, action) => {
  return updateObject(state, {
    solicitudes: action.solicitudes,
  })
}

const newSolicitud = (state) => {
  return updateObject(state, {
    loading: false,
    updated: false
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

const setSelSolicitud = (state, action) => {
  return updateObject(state, {
    selectedSolicitud: action.selectedSolicitud
  })
}

const unSetSelSolicitud = (state) => {
  return updateObject(state, {
    selectedSocio: null,
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_SOLICITUDES: return setSocios(state, action)
    //case actionTypes.FETCH_SOCIOS_FAILED: return updateObject(state, {error: true})
    case actionTypes.NEW_SOLICITUD: return newSolicitud(state)
    case actionTypes.NEW_SOLICITUD_START: return newSolicitudStart(state)
    case actionTypes.NEW_SOLICITUD_SUCCESS: return newSolicitudSuccess(state)
    case actionTypes.NEW_SOLICITUD_FAILED: return newSolicitudFailed(state)
    case actionTypes.SET_SEL_SOLICITUD: return setSelSolicitud(state, action)
    case actionTypes.UNSELECT_SOLICITUD: return unSetSelSolicitud(state)
    default:
      return state
  }
}

export default reducer
