import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  regiones: null,
  comunidades: [{}],
  user: null,
  selectedComunidad: null,
  cargos: null,
  cargosCoop: null,
  empresas: null,
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

const setCargosCoop = (state, action) => {
  return updateObject(state, {
    cargosCoop: action.cargosCoop,
  })
}

const setEmpresas = (state, action) => {
  return updateObject(state, {
    empresas: action.empresas,
  })
}

const setUser = (state, action) => {
  return updateObject(state, {
    user: action.user,
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

const newComunidad = (state) => {
  return updateObject(state, {
    newComunidad: true,
    updated: false,
    selectedComunidad: {
      nombre_de_comunidad: "",
      region: 1
    }
  })
}

const newComunidadStart = (state) => {
  return updateObject(state, {loading: true})
}

const newComunidadSuccess = (state) => {
  return updateObject(state, {
    loading: false,
    updated: true
  })
}

const newComunidadFailed = (state) => {
  return updateObject(state, {loading: false})
}

const reducer = (state=initialState , action) => {
  switch(action.type) {
    case actionTypes.SET_REGIONES: return setRegiones(state, action)
    case actionTypes.SET_COMUNIDADES: return setComunidades(state, action)
    case actionTypes.SET_CARGOS: return setCargos(state, action)
    case actionTypes.SET_CARGOS_COOP: return setCargosCoop(state, action)
    case actionTypes.SET_EMPRESAS: return setEmpresas(state, action)
    case actionTypes.SET_USER: return setUser(state, action)
    case actionTypes.UPDATE_COMUNIDAD_START: return updateComunidadStart(state)
    case actionTypes.UPDATE_COMUNIDAD_SUCCESS: return updateComunidadSuccess(state)
    case actionTypes.UPDATE_COMUNIDAD_FAILED: return updateComunidadFailed(state)
    case actionTypes.SET_SEL_COMUNIDAD: return setSelComunidad(state, action)
    case actionTypes.UNSELECT_COMUNIDAD: return unSelComunidad(state)
    case actionTypes.NEW_COMUNIDAD: return newComunidad(state)
    case actionTypes.NEW_COMUNIDAD_START: return newComunidadStart(state)
    case actionTypes.NEW_COMUNIDAD_SUCCESS: return newComunidadSuccess(state)
    case actionTypes.NEW_COMUNIDAD_FAILED: return newComunidadFailed(state)
    default: return state
  }
}

export default reducer
