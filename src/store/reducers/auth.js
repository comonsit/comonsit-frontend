import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/acopios',
  regiones: null,
  comunidades: null
}

const authSuccess = (state, action) => {
  return updateObject( state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  })
}

const authFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
    loading: false
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {token: null, userId: null})
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path
  })
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
    case actionTypes.AUTH_START: return updateObject(state, { error: null, loading: true})
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
    case actionTypes.SET_REGIONES: return setRegiones(state, action)
    case actionTypes.SET_COMUNIDADES: return setComunidades(state, action)
    case actionTypes.SET_CARGOS: return setCargos(state, action)
    default: return state
  }
}

export default reducer
