import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  regiones: null,
  comunidades: null,
  selectedComunidad: null,
  cargos: null,
  loading: false,
  updated: false,
  newComunidad: false
}


const setRegiones = (state, action) => {
  return updateObject(state, {
    regiones: action.regiones,
  })
}

const setComunidades = (state, action) => {
  return updateObject(state, {
    comunidades: action.comunidades,
  })
}

const setCargos = (state, action) => {
  return updateObject(state, {
    cargos: action.cargos,
  })
}

const updateComunidadStart = (state) => {
  return updateObject(state, {loading: true})
}

const updateComunidadSuccess = (state) => {
  return updateObject(state, {
    loading: false,
    updated: true
  })
}

const updateComunidadFailed = (state) => {
  return updateObject(state, {loading: false})
}

const setSelComunidad = (state, action) => {
  return updateObject(state, {
    selectedComunidad: state.comunidades.find(item => item.id === action.id),
    updated: false,
    newComunidad: false
  })
}

const unSelComunidad = (state) => {
  return updateObject(state, {
    selectedComunidad: null,
  })
}


const reducer = (state=initialState , action) => {
  switch(action.type) {
    case actionTypes.SET_REGIONES: return setRegiones(state, action)
    case actionTypes.SET_COMUNIDADES: return setComunidades(state, action)
    case actionTypes.SET_CARGOS: return setCargos(state, action)
    case actionTypes.UPDATE_COMUNIDAD_START: return updateComunidadStart(state)
    case actionTypes.UPDATE_COMUNIDAD_SUCCESS: return updateComunidadSuccess(state)
    case actionTypes.UPDATE_COMUNIDAD_FAILED: return updateComunidadFailed(state)
    case actionTypes.SET_SEL_COMUNIDAD: return setSelComunidad(state, action)
    case actionTypes.UNSELECT_COMUNIDAD: return unSelComunidad(state)
    default: return state
  }
}

export default reducer
