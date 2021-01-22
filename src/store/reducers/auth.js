import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'
import roles from '../roles.js';

const initialState = {
  token: null,
  userId: null,
  user: null,
  role: null,
  error: null,
  loading: false,
  finishedAutoSignup: false,
  animatedLogo: false
}

const authSuccess = (state, action) => {
  return updateObject( state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
    finishedAutoSignup: true
  })
}

const authFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
    loading: false,
    finishedAutoSignup: true
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    user: null,
    role: null,
    finishedAutoSignup: true
  })
}

const setUser = (state, action) => {
  return updateObject(state, {
    user: action.user,
    role: roles[action.user.role]
  })
}

const animatedIntro = (state) => {
  return updateObject(state, {
    animatedLogo: true
  })
}


const reducer = (state=initialState , action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return updateObject(state, { error: null, loading: true})
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    case actionTypes.SET_USER: return setUser(state, action)
    case actionTypes.ANIMATED_INTRO: return animatedIntro(state)

    default: return state
  }
}

export default reducer
