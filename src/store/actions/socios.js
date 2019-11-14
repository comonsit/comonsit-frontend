import * as actionTypes from './actionTypes'
// import axios from '../../axios-orders.js';


export const setSocios = (socios) => {
    return {
        type: actionTypes.SET_SOCIOS,
        socios: socios
    }
}

export const initSocios = () => {
    return dispatch => {
        // axios.get('/Socios.json')
        //     .then(response => {
        //         // en axios en response.data están los datos.
        //         console.log(response.data)
        //         dispatch(setSocios(response.data))
        //     })
        //     .catch(error => {
        //         // TODO: FALTA!!
        //         //dispatch(fetchIngredientsFailed())
        //     })
    }
}
