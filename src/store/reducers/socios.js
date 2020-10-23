import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  socios: [{}],
  selectedSocio: null,
  loading: false,
  updated: false,
  newSocio: false
}

const setSocios = (state, action) => {
  return updateObject(state, {
    socios: action.socios,
  })
}

const setSelSocios = (state, action) => {
  return updateObject(state, {
    selectedSocio: action.selectedSocio,
    updated: false,
    newSocio: false
  })
}

const unSelSocios = (state) => {
  return updateObject(state, {
    selectedSocio: null,
  })
}

const updateSocioStart = (state) => {
  return updateObject(state, {loading: true})
}

const updateSocioSuccess = (state) => {
  return updateObject(state, {
    loading: false,
    updated: true,
    selectedSocio: null
  })
}

const updateSocioFailed = (state) => {
  return updateObject(state, {loading: false})
}

const newSocio = (state) => {
  return updateObject(state, {
    newSocio: true,
    updated: false,
    selectedSocio: {
    "clave_socio": "NUEVO",
    "region": 1,
    "nombres": "",
    "apellido_paterno": "",
    "apellido_materno": "",
    "curp": "",
    "telefono": "",
    "fecha_nacimiento": "",
    "fecha_ingr_yomol_atel": "",
    "fecha_ingr_programa": "",
    "clave_anterior": "",
    "genero": "MA",
    "estatus_cafe": "NP",
    "estatus_miel": "NP",
    "estatus_yip": "NP",
    "estatus_trabajador": "NP",
    "estatus_comonSit": "NP",
    "doc_curp": false,
    "doc_act_nac": false,
    "doc_ine": false,
    "doc_rfc": false,
    "doc_domicilio": false,
    "comunidad": 1,
    "cargo_coop": []
    }
  })
}

const newSocioStart = (state) => {
  return updateObject(state, {loading: true})
}

const newSocioSuccess = (state) => {
  return updateObject(state, {
    loading: false,
    updated: true,
    selectedSocio: null
  })
}

const newSocioFailed = (state) => {
  return updateObject(state, {loading: false})
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_SOCIOS: return setSocios(state, action)
    case actionTypes.SET_SEL_SOCIO: return setSelSocios(state, action)
    case actionTypes.UNSELECT_SOCIO: return unSelSocios(state)
    case actionTypes.UPDATE_SOCIO_START: return updateSocioStart(state)
    case actionTypes.UPDATE_SOCIO_SUCCESS: return updateSocioSuccess(state)
    case actionTypes.UPDATE_SOCIO_FAILED: return updateSocioFailed(state)
    case actionTypes.NEW_SOCIO: return newSocio(state)
    case actionTypes.NEW_SOCIO_START: return newSocioStart(state)
    case actionTypes.NEW_SOCIO_SUCCESS: return newSocioSuccess(state)
    case actionTypes.NEW_SOCIO_FAILED: return newSocioFailed(state)
    //case actionTypes.FETCH_SOCIOS_FAILED: return updateObject(state, {error: true})
    default:
      return state
  }
}

export default reducer
