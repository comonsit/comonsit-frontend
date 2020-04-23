import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  pagos: [{}]
}

const setPagos = (state, action) => {
  return updateObject(state, {
    pagos: action.pagos,
  })
}


const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_PAGOS: return setPagos(state, action)
    default:
      return state
  }
}

export default reducer
