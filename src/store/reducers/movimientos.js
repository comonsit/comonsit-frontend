import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  movimientos: [],
  // loading: false,
  // updated: false,
}

const setMovimientos = (state, action) => {
  return updateObject(state, {
    movimientos: action.movimientos,
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
    default:
      return state
  }
}

export default reducer
