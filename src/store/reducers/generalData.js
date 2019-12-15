import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  regiones: null,
  comunidades: null,
  cargos: null
}


const setRegiones = (state, action) => {
  return updateObject(state, {
    regiones: action.regiones,
  })
}

const setComunidades = (state, action) => {
  return updateObject(state, {
    comunidades: action.comunidades,
  })
}

const setCargos = (state, action) => {
  return updateObject(state, {
    cargos: action.cargos,
  })
}

const reducer = (state=initialState , action) => {
  switch(action.type) {
    case actionTypes.SET_REGIONES: return setRegiones(state, action)
    case actionTypes.SET_COMUNIDADES: return setComunidades(state, action)
    case actionTypes.SET_CARGOS: return setCargos(state, action)
    default: return state
  }
}

export default reducer
