import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';
import { setUser } from './auth'


export const fetchGralData = (token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/comunidades.json', authData)
      .then(response => {
        dispatch(setComunidades(response.data))
      })
      .catch(error => {
        // TODO:
      })
    axios.get('/ermitas.json', authData)
      .then(response => {
        dispatch(setErmitas(response.data))
      })
      .catch(error => {
        // TODO:
      })
    axios.get('/regiones.json', authData)
      .then(response => {
        dispatch(setRegiones(response.data))
      })
      .catch(error => {
        // TODO:
      })
    axios.get('/cargos.json', authData)
      .then(response => {
        dispatch(setCargos(response.data))
      })
      .catch(error => {
        // TODO:
      })
    axios.get('/cargos-coop.json', authData)
      .then(response => {
        dispatch(setCargosCoop(response.data))
      })
      .catch(error => {
        // TODO:
      })
    axios.get('/empresas.json', authData)
      .then(response => {
        dispatch(setEmpresas(response.data))
      })
      .catch(error => {
        // TODO:
      })
    axios.get('/fuentes.json', authData)
      .then(response => {
        dispatch(setFuentes(response.data))
      })
      .catch(error => {
        // TODO:
      })
    axios.get('/puestos.json', authData)
      .then(response => {
        dispatch(setPuestos(response.data))
      })
      .catch(error => {
        // TODO:
      })
    axios.get('/users/me.json', authData)
      .then(response => {
        dispatch(setUser(response.data))
      })
      .catch(error => {
        // TODO:
      })
  }
}

export const setRegiones = (regiones) => {
  return {
    type: actionTypes.SET_REGIONES,
    regiones: regiones
  }
}


export const setComunidades = (comunidades) => {
  return {
    type: actionTypes.SET_COMUNIDADES,
    comunidades: comunidades
  }
}


export const setErmitas = (ermitas) => {
  return {
    type: actionTypes.SET_ERMITAS,
    ermitas: ermitas
  }
}

export const setCargos = (cargos) => {
  return {
    type: actionTypes.SET_CARGOS,
    cargos: cargos
  }
}

export const setCargosCoop = (cargosCoop) => {
  return {
    type: actionTypes.SET_CARGOS_COOP,
    cargosCoop: cargosCoop
  }
}

export const setEmpresas = (empresas) => {
  return {
    type: actionTypes.SET_EMPRESAS,
    empresas: empresas
  }
}

export const setFuentes = (fuentes) => {
  return {
    type: actionTypes.SET_FUENTES,
    fuentes: fuentes
  }
}

export const setPuestos = (puestos) => {
  return {
    type: actionTypes.SET_PUESTOS,
    puestos: puestos
  }
}


export const updateComunidadSuccess = (id, data) => {
  return {
    type: actionTypes.UPDATE_COMUNIDAD_SUCCESS
  }
}

export const updateComunidadFailed = (error) => {
  return {
    type: actionTypes.UPDATE_COMUNIDAD_FAILED,
    error: error
  }
}

export const updateComunidadStart = () => {
  return {
    type: actionTypes.UPDATE_COMUNIDAD_START
  }
}

export const updateComunidad = (data, id, token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}`},
    }
    dispatch(updateComunidadStart())
    axios.put(`/comunidades/${id}.json`, data, authData)
      .then(response => {
        dispatch(updateComunidadSuccess(response.data.name, data ))
        alert('Comunidad ' + response.data.id + ' editada correctamente')
      })
      .catch(error => {
        dispatch(updateComunidadFailed(error))
      })
  }
}

export const selectComunidad = (id) => {
  return {
    type: actionTypes.SET_SEL_COMUNIDAD,
    id: id
  }
}

export const unSelectComunidad = () => {
  return {
    type: actionTypes.UNSELECT_COMUNIDAD
  }
}

export const newComunidad = () => {
  return {
    type: actionTypes.NEW_COMUNIDAD
  }
}

export const createNewComunidad = (data, token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    dispatch(newComunidadStart())
    axios.post(`/comunidades/`, data, authData)
      .then(response => {
        dispatch(newComunidadSuccess(response.data.name, data ))
        alert('Comunidad ' + response.data.id + ' creada correctamente')
      })
      .catch(error => {
        dispatch(newComunidadFailed(error))
      })
  }
}

export const newComunidadSuccess = () => {
  return {
    type: actionTypes.NEW_COMUNIDAD_SUCCESS
  }
}

export const newComunidadFailed = (error) => {
  return {
    type: actionTypes.NEW_COMUNIDAD_FAILED,
    error: error
  }
}

export const newComunidadStart = () => {
  return {
    type: actionTypes.NEW_COMUNIDAD_START
  }
}
