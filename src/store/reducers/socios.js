import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
    socios: null,
    selectedSocio: null
}

const setSocios = (state, action) => {
    return updateObject(state, {
        socios: action.socios,
    })
}

const setSelSocios = (state, action) => {
    return updateObject(state, {
        selectedSocio: action.selectedSocio,
    })
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_SOCIOS: return setSocios(state, action)
        case actionTypes.SET_SEL_SOCIO: return setSelSocios(state, action)
        //case actionTypes.FETCH_SOCIOS_FAILED: return updateObject(state, {error: true})
        default:
            return state
    }
}

export default reducer
