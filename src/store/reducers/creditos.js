import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  creditos: [{}],
  selectedContrato: null
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
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_CREDITOS: return setCreditos(state, action)
    case actionTypes.SET_SEL_CONTRATO: return setSelContrato(state, action)
    case actionTypes.UNSELECT_CONTRATO: return unSelContrato(state)
    default:
      return state
  }
}

export default reducer
