import * as actionTypes from './actionTypes'
import axios from '../axios-be.js';


export const setSocios = (socios) => {
    return {
        type: actionTypes.SET_SOCIOS,
        socios: socios
    }
}

export const setSelSocios = (selectedSocio) => {
    return {
        type: actionTypes.SET_SEL_SOCIO,
        selectedSocio: selectedSocio
    }
}

export const unSelectSocio = () => {
    return {
        type: actionTypes.UNSELECT_SOCIO
    }
}

export const initSocios = (token) => {

    return dispatch => {
        const authData = {
          headers: { 'Authorization': `Bearer ${token}` }
        }
        axios.get('/socios.json', authData)
            .then(response => {
                // en axios en response.data están los datos.
                console.log(response.data)
                dispatch(setSocios(response.data))
            })
            .catch(error => {
                // TODO: FALTA!!
                //dispatch(fetchSociosFailed())
            })
    }
}

export const fetchSelSocio = (token, socioId) => {

    return dispatch => {
        const authData = {
          headers: { 'Authorization': `Bearer ${token}` }
        }
        axios.get(`/socios/${socioId}.json`, authData)
            .then(response => {
                console.log('SINGLE SOCIO:' + response.data)
                dispatch(setSelSocios(response.data))
            })
            .catch(error => {
                // TODO: FALTA!!
                //dispatch(fetchSociosFailed())
            })
    }
}
