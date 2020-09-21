import React, { Component } from 'react';
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl';
import { Redirect, Route, withRouter, Switch} from "react-router-dom";
import * as actions from './store/actions'

import Layout from './hoc/Layout/Layout'
import homeContainer from './containers/General/HomeContainer/HomeContainer';
import bancos from './containers/Panel/Bancos/Bancos';
import subcuentas from './containers/Panel/Bancos/Subcuentas/Subcuentas';
import carteras from './containers/Panel/Carteras/Carteras';
import bancoForm from './containers/Panel/Bancos/BancoForm/BancoForm';
import conocenos from './containers/General/Conocenos/Conocenos';
import origen from './containers/General/Origen/Origen';
import publicaciones from './containers/General/Publicaciones/Publicaciones';
import contacto from './containers/General/Contacto/Contacto';
import acceso from './containers/General/Acceso/Acceso';
import socios from './containers/Panel/Socios/Socios';
import evalSocios from './containers/Panel/Socios/EvalSocio/EvalSocio';
import tsumbalil from './containers/Panel/Tsumbalil/Tsumbalil';
import solicitudes from './containers/Panel/Solicitudes/Solicitudes';
import solicitudForm from './containers/Panel/Solicitudes/SolicitudForm/SolicitudForm';
import mesaControl from './containers/Panel/Solicitudes/MesaControl/MesaControl';
import evaluacion from './containers/Panel/Solicitudes/Evaluacion/Evaluacion';
import acopios from './containers/Panel/Acopios/Acopios';
import creditos from './containers/Panel/Creditos/Creditos';
import pagos from './containers/Panel/Pagos/Pagos';
import pagoForm from './containers/Panel/Pagos/PagoForm/PagoForm';
import contratoActivate from './containers/Panel/Creditos/ContratoActivate/ContratoActivate';
import contratoImprimir from './containers/Panel/Creditos/ContratoImprimir/ContratoImprimir';
import movimientos from './containers/Panel/Movimientos/Movimientos';
import movimientosForm from './containers/Panel/Movimientos/MovimientosForm/MovimientosForm';
import acopioForm from './containers/Panel/Acopios/AcopioForm/AcopioForm';
import formatos from './containers/Panel/Formatos/Formatos';
import perfil from './containers/Panel/Perfil/Perfil';
import inicio from './containers/Panel/Inicio/Inicio';
import logout from './containers/Panel/Logout/Logout';
import mapaPrueba from './containers/Panel/Mapas/Sandbox/Sandbox';

// import languageObject from './translations/messages'
import messages_es from './translations/es.json'
import messages_tz from './translations/tz.json'

const messages = {
  'es': messages_es,
  'tz': messages_tz
}
// const language = navigator.language.split(/[-_]/)[0]

// import asyncComponent from './hoc/asyncComponent/asyncComponent'
//
// // estos pedazos no se cargarán al inicio, sólo hasta que se soliciten
// // serán CHUNKS diferentes gracias al LAZY loading
// // ... COOOL!
// const asyncCheckout = asyncComponent(() => {
//     return import ('./containers/Checkout/Checkout')
// })
//
// const asyncOrders = asyncComponent(() => {
//     return import ('./containers/Orders/Orders')
// })

class App extends Component {

  // TODO: es demasiado tarde al mount, y no supo si tiene authenticación!
    // lo cual redirige siempre a home en caso de un refresh. :(
  componentDidMount () {
    this.props.onTryAutoSignup()
  }

  render(){
    let authenticatedRoutes = null
    if (this.props.isAuthenticated) {
      authenticatedRoutes = (
        <>
          <Route path="/inicio" exact component={inicio}/>
          <Route path="/socios" exact component={socios}/>
          <Route path="/evaluacion-socio" exact component={evalSocios}/>
          <Route path="/perfil" exact component={perfil}/>
          <Route path="/acopios" exact component={acopios}/>
          <Route path="/bancos" exact component={bancos}/>
          <Route path="/subcuentas" exact component={subcuentas}/>
          <Route path="/banco-form" exact component={bancoForm}/>
          <Route path="/carteras" exact component={carteras}/>
          <Route path="/creditos" exact component={creditos}/>
          <Route path="/mapa-prueba" exact component={mapaPrueba}/>
          <Route path="/pagos" exact component={pagos}/>
          <Route path="/pago-formato" exact component={pagoForm}/>
          <Route path="/credito-activar" exact component={contratoActivate}/>
          <Route path="/credito-imprimir" exact component={contratoImprimir}/>
          <Route path="/acopio-formato" exact component={acopioForm}/>
          <Route path="/tsumbalil" exact component={tsumbalil}/>
          <Route path="/movimientos" exact component={movimientos}/>
          <Route path="/movimiento-formato" exact component={movimientosForm}/>
          <Route path="/solicitudes" exact component={solicitudes}/>
          <Route path="/solicitud-formato" exact component={solicitudForm}/>
          <Route path="/mesa-control" exact component={mesaControl}/>
          <Route path="/evaluacion" exact component={evaluacion}/>
          <Route path="/formatos" exact component={formatos}/>
        </>
      )
    }

    return (
      <IntlProvider locale={this.props.locale} messages={messages[this.props.locale]}>
        <Layout>
          <Switch>
            <Route path="/conocenos" component={conocenos}/>
            <Route path="/origen" component={origen}/>
            <Route path="/publicaciones" component={publicaciones}/>
            <Route path="/contacto" component={contacto}/>
            <Route path="/acceso" exact component={acceso}/>
            <Route path="/logout" component={logout}/>
            {authenticatedRoutes}
            <Route path="/" exact component={homeContainer}/>
            {/* TODO: make 404 in redirect */}
            <Redirect to={(this.props.isAuthenticated) ? "/inicio" : "/"}/> : <Redirect to="/"/>
          </Switch>
        </Layout>
      </IntlProvider>
    );
  }


}

// App.defaultProps = {
//   locale: 'en'
// }

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        locale: state.locale.selectedLanguage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch (actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
