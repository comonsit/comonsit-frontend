import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  selectedLanguage: 'es',
}

const onChangeLocale = (state, action) => {
  return updateObject( state, {
    selectedLanguage: action.selectedLanguage
  })
}

const reducer = (state=initialState , action) => {
  switch(action.type) {
    case actionTypes.CHANGE_LOCALE: return onChangeLocale(state, action)
    default: return state
  }
}

export default reducer
