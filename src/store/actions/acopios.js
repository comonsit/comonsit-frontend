import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';


export const setAcopios = (acopios) => {
  return {
    type: actionTypes.SET_ACOPIOS,
    acopios: acopios
  }
}

export const initAcopios = (token) => {
  return dispatch => {
    const authData = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/acopios.json', authData)
      .then(response => {
        console.log("FETCHING ACOPIOS");
        // console.log(response.data)
        dispatch(setAcopios(response.data))
      })
      .catch(error => {
        // TODO: FALTA!!
        //dispatch(fetchAcopioesFailed())
      })
  }
}

export const createNewAcopio = (acopioData, token) => {
    return dispatch => {
      const authData = {
        headers: { 'Authorization': `Bearer ${token}` },
      }
      dispatch(newAcopioStart())
      axios.post(`/acopios/`, acopioData, authData)
          .then(response => {
            dispatch(newAcopioSuccess(response.data.id, acopioData ))
          })
          .catch(error => {
            dispatch(newAcopioFailed())
          })
    }
}

export const newAcopio = () => {
    return {
        type: actionTypes.NEW_ACOPIO
    }
}

export const newAcopioSuccess = (id) => {
    return {
        type: actionTypes.NEW_ACOPIO_SUCCESS
    }
}

export const newAcopioFailed = (error) => {
    return {
        type: actionTypes.NEW_ACOPIO_FAILED,
        error: error
    }
}

export const newAcopioStart = () => {
    return {
        type: actionTypes.NEW_ACOPIO_START
    }
}
//
// export const fetchSelAcopio = (token, acopioId) => {
//   return dispatch => {
//     const authData = {
//       headers: { 'Authorization': `Bearer ${token}` }
//     }
//     console.log('GET ACOPIO');
//     axios.get(`/acopios/${acopioId}.json`, authData)
//       .then(response => {
//         console.log('FETCHED ACOPIO');
//         console.log(response.data)
//         dispatch(setSelAcopio(response.data))
//       })
//       .catch(error => {
//         // TODO: FALTA!!
//         //dispatch(fetchAcopiosFailed())
//       })
//   }
// }
//
// export const setSelAcopio = (selectedAcopio) => {
//     return {
//         type: actionTypes.SET_SEL_ACOPIO,
//         selectedAcopio: selectedAcopio
//     }
// }
//
//
// export const unSelectAcopio = () => {
//   return {
//     type: actionTypes.UNSELECT_ACOPIO
//   }
// }
