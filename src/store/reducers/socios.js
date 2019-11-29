import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility'

const initialState = {
    socios: null,
    selectedSocio: null,
    loading: false,
    updated: false,
    newSocio: false
}

const setSocios = (state, action) => {
    return updateObject(state, {
        socios: action.socios,
    })
}

const setSelSocios = (state, action) => {
    return updateObject(state, {
        selectedSocio: action.selectedSocio,
        updated: false
    })
}

const unSelSocios = (state) => {
    return updateObject(state, {
        selectedSocio: null,
    })
}

const updateSocioStart = (state) => {
    return updateObject(state, {loading: true})
}

const updateSocioSuccess = (state) => {
  return updateObject(state, {
      loading: false,
      updated: true
  })
}

const updateSocioFailed = (state) => {
    return updateObject(state, {loading: false})
}

const newSocio = (state) => {
  return updateObject(state, {
      newSocio: true,
      selectedSocio: {
        clave_socio: "NUEVO",
        region: 1,
        nombres: "",
        apellidos: "",
        curp: "",
        telefono: "",
        fecha_nacimiento: "",
        fecha_ingr_yomol_atel: "",
        fecha_ingr_programa: "",
        prod_trab: "",
        clave_anterior: "",
        estatus_cafe: "NP",
        estatus_miel: "NP",
        estatus_yip: "NP",
        estatus_gral: "NP",
        comunidad: 1,
        cargo: 1
      }
  })
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_SOCIOS: return setSocios(state, action)
        case actionTypes.SET_SEL_SOCIO: return setSelSocios(state, action)
        case actionTypes.UNSELECT_SOCIO: return unSelSocios(state)
        case actionTypes.UPDATE_SOCIO_START: return updateSocioStart(state)
        case actionTypes.UPDATE_SOCIO_SUCCESS: return updateSocioSuccess(state)
        case actionTypes.UPDATE_SOCIO_FAILED: return updateSocioFailed(state)
        case actionTypes.NEW_SOCIO: return newSocio(state)
        //case actionTypes.FETCH_SOCIOS_FAILED: return updateObject(state, {error: true})
        default:
            return state
    }
}

export default reducer
