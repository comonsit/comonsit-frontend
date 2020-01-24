import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  acopios: [{}],
  // loading: false,
  // updated: false,
  // selectedAcopio: null
}

const setAcopios = (state, action) => {
  return updateObject(state, {
    acopios: action.acopios,
  })
}
//
// const newSolicitud = (state) => {
//   return updateObject(state, {
//     loading: false,
//     updated: false
//   })
// }
//
// const newSolicitudStart = (state) => {
//   return updateObject(state, {
//     loading: true,
//     updated: false
//   })
// }
//
// const newSolicitudSuccess = (state) => {
//   return updateObject(state, {
//     loading: false,
//     updated: true
//   })
// }
//
// const newSolicitudFailed = (state) => {
//   return updateObject(state, {
//     loading: false,
//     updated: false
//   })
// }
//
// const setSelSolicitud = (state, action) => {
//   return updateObject(state, {
//     selectedSolicitud: action.selectedSolicitud
//   })
// }
//
// const unSetSelSolicitud = (state) => {
//   return updateObject(state, {
//     selectedSocio: null,
//   })
// }

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_ACOPIOS: return setAcopios(state, action)
    //case actionTypes.FETCH_SOCIOS_FAILED: return updateObject(state, {error: true})
    // case actionTypes.NEW_ACOPIO: return newSolicitud(state)
    // case actionTypes.NEW_ACOPIO_START: return newSolicitudStart(state)
    // case actionTypes.NEW_ACOPIO_SUCCESS: return newSolicitudSuccess(state)
    // case actionTypes.NEW_ACOPIO_FAILED: return newSolicitudFailed(state)
    // case actionTypes.SET_SEL_ACOPIO: return setSelSolicitud(state, action)
    // case actionTypes.UNSELECT_ACOPIO: return unSetSelSolicitud(state)
    default:
      return state
  }
}

export default reducer
