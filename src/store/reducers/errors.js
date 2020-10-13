import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  errors: null
}

const setError = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
  })
}

const clearError = (state) => {
  return updateObject(state, {
    errors: null,
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.ERROR_RECEIVED: return setError(state, action)
    case actionTypes.ERROR_CLEAR: return clearError(state)
    default:
      return state
  }
}

export default reducer
