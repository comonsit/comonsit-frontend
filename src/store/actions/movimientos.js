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

export const fetchSelMov = (token, movId) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get(`/movimientos/${movId}.json`, authData)
      .then(response => {
        dispatch(setSelMovimiento(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchPagosFailed())
      })
  }
}

export const setSelMovimiento = (selectedMov) => {
  return {
    type: actionTypes.SET_SEL_MOV,
    selectedMov: selectedMov
  }
}

export const unSelectMov = () => {
  return {
    type: actionTypes.UNSELECT_MOV
  }
}

export const updateMovimiento = (movData, id, token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    dispatch(updateMovimientoStart())
    axios.patch(`/movimientos/${id}.json`, movData, authData)
      .then(response => {
        dispatch(updateMovimientoSuccess(response.data.name, movData ))
        alert('Movimiento ' + response.data.id + ' actualizado correctamente')
      })
      .catch(error => {
        dispatch(updateMovimientoFailed(error))
        console.log('update crédito ERROR')
        console.log(error)
      })
  }
}

export const updateMovimientoSuccess = () => {
  return {
    type: actionTypes.UPDATE_MOVIMIENTO_SUCCESS
  }
}

export const updateMovimientoFailed = (error) => {
  return {
    type: actionTypes.UPDATE_MOVIMIENTO_FAILED,
    error: error
  }
}

export const updateMovimientoStart = () => {
  return {
    type: actionTypes.UPDATE_MOVIMIENTO_START
  }
}
