import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  pagos: [{}],
  selectedPago: null
}

const setPagos = (state, action) => {
  return updateObject(state, {
    pagos: action.pagos,
  })
}

const setSelPago = (state, action) => {
  return updateObject(state, {
    selectedPago: action.selectedPago,
  })
}

const unSelPago = (state) => {
  return updateObject(state, {
    selectedPago: null,
  })
}


const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_PAGOS: return setPagos(state, action)
    case actionTypes.SET_SEL_PAGO: return setSelPago(state, action)
    case actionTypes.UNSELECT_PAGO: return unSelPago(state)
    default:
      return state
  }
}

export default reducer
