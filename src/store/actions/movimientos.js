import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';


export const setMovimientos = (movimientos) => {
  return {
    type: actionTypes.SET_MOVIMIENTOS,
    movimientos: movimientos
  }
}

export const unSetMovimientos = () => {
  return {
    type: actionTypes.UNSET_MOVIMIENTOS
  }
}

export const initMovimientos = (token, socioId) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/movimientos/?clave_socio=' + socioId, authData)
      .then(response => {
        dispatch(setMovimientos(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchMovimientosesFailed())
      })
  }
}

export const createNewMovimiento = (movimientoData, token) => {
    return dispatch => {
      const authData = {
        headers: { 'Authorization': `Bearer ${token}` },
      }
      dispatch(newMovimientoStart())
      axios.post(`/movimientos/`, movimientoData, authData)
          .then(response => {
            dispatch(newMovimientoSuccess(response.data.id, movimientoData ))
            alert('Movimiento ' + response.data.id + ' creado correctamente')
          })
          .catch(error => {
            dispatch(newMovimientoFailed())
          })
    }
}

export const newMovimiento = () => {
    return {
        type: actionTypes.NEW_MOVIMIENTO
    }
}

export const newMovimientoSuccess = (id) => {
    return {
        type: actionTypes.NEW_MOVIMIENTO_SUCCESS
    }
}

export const newMovimientoFailed = (error) => {
    return {
        type: actionTypes.NEW_MOVIMIENTO_FAILED,
        error: error
    }
}

export const newMovimientoStart = () => {
    return {
        type: actionTypes.NEW_MOVIMIENTO_START
    }
}
