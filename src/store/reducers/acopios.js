import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  acopios: [{}],
  loading: false,
  updated: false,
  socioSaldo: null,
  selSocio: null
  // selectedAcopio: null
}

const setAcopios = (state, action) => {
  return updateObject(state, {
    acopios: action.acopios,
  })
}

const newAcopio = (state) => {
  return updateObject(state, {
    loading: false,
    updated: false
  })
}

const newAcopioStart = (state) => {
  return updateObject(state, {
    loading: true,
    updated: false
  })
}

const newAcopioSuccess = (state) => {
  return updateObject(state, {
    loading: false,
    updated: true
  })
}

const newAcopioFailed = (state) => {
  return updateObject(state, {
    loading: false,
    updated: false
  })
}

const setSocioSaldo = (state, action) => {
  return updateObject(state, {
    socioSaldo: action.socioSaldo,
    selSocio: action.selSocio
  })
}

const clearSocioSaldo = (state, action) => {
  return updateObject(state, {
    socioSaldo: null,
    selSocio: null
  })
}



// const setSelAcopio = (state, action) => {
//   return updateObject(state, {
//     selectedAcopio: action.selectedAcopio
//   })
// }
//
// const unSetSelAcopio = (state) => {
//   return updateObject(state, {
//     selectedSocio: null,
//   })
// }

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_ACOPIOS: return setAcopios(state, action)
    //case actionTypes.FETCH_SOCIOS_FAILED: return updateObject(state, {error: true})
    case actionTypes.NEW_ACOPIO: return newAcopio(state)
    case actionTypes.NEW_ACOPIO_START: return newAcopioStart(state)
    case actionTypes.NEW_ACOPIO_SUCCESS: return newAcopioSuccess(state)
    case actionTypes.NEW_ACOPIO_FAILED: return newAcopioFailed(state)
    case actionTypes.SET_SOCIO_SALDO: return setSocioSaldo(state, action)
    case actionTypes.CLEAR_SOCIO_SALDO: return clearSocioSaldo(state, action)
    // case actionTypes.SET_SEL_ACOPIO: return setSelAcopio(state, action)
    // case actionTypes.UNSELECT_ACOPIO: return unSetSelAcopio(state)
    default:
      return state
  }
}

export default reducer
