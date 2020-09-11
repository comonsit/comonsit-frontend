import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  movimientos: [],
  loading: false,
  updated: false,
  selectedMov: null,
  loadingPatch: false,
  updatedPatch: false
}

const setMovimientos = (state, action) => {
  return updateObject(state, {
    movimientos: action.movimientos,
  })
}

const newMovimiento = (state) => {
  return updateObject(state, {
    loading: false,
    updated: false
  })
}

const newMovimientoStart = (state) => {
  return updateObject(state, {
    loading: true,
    updated: false
  })
}

const newMovimientoSuccess = (state) => {
  return updateObject(state, {
    loading: false,
    updated: true
  })
}

const newMovimientoFailed = (state) => {
  return updateObject(state, {
    loading: false,
    updated: false
  })
}

const unSetMovimientos = (state) => {
  return updateObject(state, {
    movimientos: []
  })
}

const setSelMov = (state, action) => {
  return updateObject(state, {
    selectedMov: action.selectedMov,
  })
}

const unSelMov = (state) => {
  return updateObject(state, {
    selectedMov: null,
    loadingPatch: false,
    updatedPatch: false,
    loading: false,
    updated: false
  })
}

const updateMovimientoStart = (state) => {
  return updateObject(state, {loadingPatch: true})
}

const updateMovimientoSuccess = (state) => {
  return updateObject(state, {
    loadingPatch: false,
    updatedPatch: true
  })
}

const updateMovimientoFailed = (state) => {
  return updateObject(state, {loadingPatch: false})
}



const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_MOVIMIENTOS: return setMovimientos(state, action)
    case actionTypes.UNSET_MOVIMIENTOS: return unSetMovimientos(state)
    case actionTypes.NEW_MOVIMIENTO: return newMovimiento(state)
    case actionTypes.NEW_MOVIMIENTO_START: return newMovimientoStart(state)
    case actionTypes.NEW_MOVIMIENTO_SUCCESS: return newMovimientoSuccess(state)
    case actionTypes.NEW_MOVIMIENTO_FAILED: return newMovimientoFailed(state)
    case actionTypes.SET_SEL_MOV: return setSelMov(state, action)
    case actionTypes.UNSELECT_MOV: return unSelMov(state)
    case actionTypes.UPDATE_MOVIMIENTO_START: return updateMovimientoStart(state)
    case actionTypes.UPDATE_MOVIMIENTO_SUCCESS: return updateMovimientoSuccess(state)
    case actionTypes.UPDATE_MOVIMIENTO_FAILED: return updateMovimientoFailed(state)
    default:
      return state
  }
}

export default reducer
