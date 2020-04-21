export {
    initSocios,
    fetchSelSocio,
    unSelectSocio,
    updateSocio,
    newSocio,
    createNewSocio
} from './socios'

export {
    initSolicitudes,
    unSelectSolicitud,
    fetchSelSolicitud,
    newSolicitud,
    createNewSolicitud
} from './solicitudes'

export {
    initAcopios,
    // unSelectAcopio,
    // fetchSelAcopio,
    newAcopio,
    createNewAcopio,
    getSocioSaldo,
    clearSocioSaldo
} from './acopios'

export {
  initCreditos,
  fetchSelContrato,
  unSelectContrato
} from './creditos'

export {
    initMovimientos,
    unSetMovimientos,
    newMovimiento,
    createNewMovimiento
    // unSelectAcopio,
    // fetchSelAcopio,
    // newAcopio,
    // createNewAcopio
} from './movimientos'


export {
  onChangeLocale
} from './locale'

export {
  auth,
  logout,
  setAuthRedirectPath,
  authCheckState,
} from './auth'

export {
  fetchGralData,
  setRegiones,
  setComunidades,
  updateComunidad,
  selectComunidad,
  unSelectComunidad,
  newComunidad,
  createNewComunidad,
  setUser
} from './generalData'
