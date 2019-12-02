import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
    solicitudes: null,
}

const setSocios = (state, action) => {
    return updateObject(state, {
        solicitudes: action.solicitudes,
    })
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_SOLICITUDES: return setSocios(state, action)
        //case actionTypes.FETCH_SOCIOS_FAILED: return updateObject(state, {error: true})
        default:
            return state
    }
}

export default reducer
