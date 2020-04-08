import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  creditos: [{}],
}

const setCreditos = (state, action) => {
  return updateObject(state, {
    creditos: action.creditos,
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_CREDITOS: return setCreditos(state, action)
    default:
      return state
  }
}

export default reducer
