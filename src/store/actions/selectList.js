import * as actionTypes from './actionTypes'


export const setSelList = (selList) => {
  return {
    type: actionTypes.SET_SEL_LIST,
    selList: selList
  }
}

export const clearSelList = () => {
  return {
    type: actionTypes.CLEAR_SEL_LIST
  }
}
