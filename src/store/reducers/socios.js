import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
    socios: null
}

const setSocios = (state, action) => {
    return updateObject(state, {
        socios: action.socios,
    })
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_SOCIOS: return setSocios(state, action)
        //case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true})
        default:
            return state
    }
}

export default reducer
