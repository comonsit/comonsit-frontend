import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  selList: []
}

const setSList = (state, action) => {
  return updateObject(state, {
    selList: action.selList,
  })
}

const clearList = (state) => {
  return updateObject(state, {
    selList: []
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_SEL_LIST: return setSList(state, action)
    case actionTypes.CLEAR_SEL_LIST: return clearList(state)
    default:
      return state
  }
}

export default reducer
