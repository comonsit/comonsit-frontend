import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  creditos: [{}],
  selectedContrato: {
    id: null,
    fecha_inicio: null,
    tipo_tasa: null,
    estatus_ejecucion: null,
    fecha_banco: null,
    referencia_banco: null,
    fondo_comun: null 
  }
}

const setCreditos = (state, action) => {
  return updateObject(state, {
    creditos: action.creditos,
  })
}

const setSelContrato = (state, action) => {
  return updateObject(state, {
    selectedContrato: action.selectedContrato
  })
}

const unSelContrato = (state) => {
  return updateObject(state, {
    selectedContrato: null,
    loading: false,
    updated: false,
  })
}

const updateCreditoStart = (state) => {
  return updateObject(state, {loading: true})
}

const updateCreditoSuccess = (state) => {
  return updateObject(state, {
    loading: false,
    updated: true
  })
}

const updateCreditoFailed = (state) => {
  return updateObject(state, {loading: false})
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_CREDITOS: return setCreditos(state, action)
    case actionTypes.SET_SEL_CONTRATO: return setSelContrato(state, action)
    case actionTypes.UNSELECT_CONTRATO: return unSelContrato(state)
    case actionTypes.UPDATE_CREDITO_START: return updateCreditoStart(state)
    case actionTypes.UPDATE_CREDITO_SUCCESS: return updateCreditoSuccess(state)
    case actionTypes.UPDATE_CREDITO_FAILED: return updateCreditoFailed(state)
    default:
      return state
  }
}

export default reducer
