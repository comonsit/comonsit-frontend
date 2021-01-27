import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';

import './index.scss';
import ScrollToTop from './hoc/ScrollToTop/ScrollToTop'
import sociosReducer from './store/reducers/socios'
import errorsReducer from './store/reducers/errors'
import generalDataReducer from './store/reducers/generalData'
import solicitudReducer from './store/reducers/solicitudes'
import creditosReducer from './store/reducers/creditos'
import pagosReducer from './store/reducers/pagos'
import acopioReducer from './store/reducers/acopios'
import movimientoReducer from './store/reducers/movimientos'
import authReducer from './store/reducers/auth'
import localeReducer from './store/reducers/locale'
import listSelReducer from './store/reducers/selectList'
// import * as actions from './store/actions'
import * as actionTypes from './store/actions/actionTypes'
import './assets/fonts/Arquitecta.otf'
import App from './App';
import * as serviceWorker from './serviceWorker';


const appReducer = combineReducers({
  socios: sociosReducer,
  auth: authReducer,
  locale: localeReducer,
  solicitudes: solicitudReducer,
  acopios: acopioReducer,
  movimientos: movimientoReducer,
  generalData: generalDataReducer,
  creditos: creditosReducer,
  pagos: pagosReducer,
  selList: listSelReducer,
  errors: errorsReducer
})

const rootReducer = (state, action) => {
  if (action.type === actionTypes.USER_LOGOUT) {
    const { auth } = state
    state = { auth }
  }
  return appReducer(state, action)
}

// const composeEnhancers = process.env.NODE_ENV === 'development'
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   : null || compose;
const composeEnhancers = compose


// Y para activar el thunk y poder hacer redux asíncrono:
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))


// Si el archivo NO va a estar en el ROOT,
// .. hay que definitlo aquí en el BrowserRouter
const app = (
  <Provider store={store}>
    <BrowserRouter >
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
