import React, { Component } from 'react';
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl';
import { Redirect, Route, withRouter, Switch } from "react-router-dom";
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
import perfil from './containers/Panel/Perfil/PerfilCont';
import inicio from './containers/Panel/Inicio/Inicio';
import logout from './containers/Panel/Logout/Logout';
import mapaPrueba from './containers/Panel/Mapas/Sandbox/Sandbox';
import Loading from './containers/General/Loading/Loading';
import messages_es from './translations/es.json'
import messages_tz from './translations/tz.json'


const messages = {
  'es': messages_es,
  'tz': messages_tz
}

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

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    const availableRoutes = this.props.isAuthenticated
      ?
        (
          <Switch>
            <Route path="/socios" component={socios}/>
            <Route path="/evaluacion-socio" component={evalSocios}/>
            <Route path="/perfil" component={perfil}/>
            <Route path="/acopios" component={acopios}/>
            <Route path="/bancos" component={bancos}/>
            <Route path="/subcuentas" component={subcuentas}/>
            <Route path="/banco-form" component={bancoForm}/>
            <Route path="/carteras" component={carteras}/>
            <Route path="/creditos" component={creditos}/>
            <Route path="/mapa-prueba" component={mapaPrueba}/>
            <Route path="/pagos" component={pagos}/>
            <Route path="/pago-formato" component={pagoForm}/>
            <Route path="/credito-activar" component={contratoActivate}/>
            <Route path="/credito-imprimir" component={contratoImprimir}/>
            <Route path="/acopio-formato" component={acopioForm}/>
            <Route path="/tsumbalil" component={tsumbalil}/>
            <Route path="/movimientos" component={movimientos}/>
            <Route path="/movimiento-formato" component={movimientosForm}/>
            <Route path="/solicitudes" component={solicitudes}/>
            <Route path="/solicitud-formato" component={solicitudForm}/>
            <Route path="/mesa-control" component={mesaControl}/>
            <Route path="/evaluacion" component={evaluacion}/>
            <Route path="/formatos" component={formatos}/>
            <Route path="/inicio" component={inicio} />
            <Route path="/logout" component={logout}/>
            <Route path="/reportes" component={() => (<div>...En Construcción...</div>)}/>
            <Route><Redirect to="/inicio" /></Route>
          </Switch>
        )
      :
        (
          <Switch>
            <Route exact path="/" component={homeContainer} />
            <Route exact path="/conocenos" component={conocenos}/>
            <Route exact path="/origen" component={origen}/>
            <Route exact path="/publicaciones" component={publicaciones}/>
            <Route exact path="/contacto" component={contacto}/>
            <Route exact path="/acceso" component={acceso}/>
            <Route><Redirect to="/" /></Route>
          </Switch>
        )

    return (
      <IntlProvider locale={this.props.locale} messages={messages[this.props.locale]}>
        <Layout>
          {this.props.loading ? <Loading /> : availableRoutes}
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
    locale: state.locale.selectedLanguage,
    loading: !state.auth.finishedAutoSignup,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch (actions.authCheckState()),
    onfinishAuthRedirect: () => dispatch (actions.finishedAuthRedirectPath())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
