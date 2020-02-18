import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  movimientos: [],
  loading: false,
  updated: false,
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


const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_MOVIMIENTOS: return setMovimientos(state, action)
    case actionTypes.UNSET_MOVIMIENTOS: return unSetMovimientos(state)
    case actionTypes.NEW_MOVIMIENTO: return newMovimiento(state)
    case actionTypes.NEW_MOVIMIENTO_START: return newMovimientoStart(state)
    case actionTypes.NEW_MOVIMIENTO_SUCCESS: return newMovimientoSuccess(state)
    case actionTypes.NEW_MOVIMIENTO_FAILED: return newMovimientoFailed(state)
    default:
      return state
  }
}

export default reducer
