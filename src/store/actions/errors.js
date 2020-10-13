import * as actionTypes from './actionTypes'


export const setError = errors => {
  return {
    type: actionTypes.ERROR_RECEIVED,
    errors: errors
  }
}


export const clearError = () => {
  return {
    type: actionTypes.ERROR_CLEAR
  }
}
