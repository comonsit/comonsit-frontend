import React, { Component } from 'react';
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl';
import { Redirect, Route, withRouter, Switch } from "react-router-dom";

import Layout from './hoc/Layout/Layout'
import GerenciaRoute from './components/Navigation/GerenciaRoute/GerenciaRoute';
import homeContainer from './containers/General/HomeContainer/HomeContainer';
import bancos from './containers/Panel/Bancos/Bancos';
import subcuentas from './containers/Panel/Bancos/Subcuentas/Subcuentas';
import carteras from './containers/Panel/Carteras/Carteras';
import bancoForm from './containers/Panel/Bancos/BancoForm/BancoForm';
import conocenos from './containers/General/Conocenos/Conocenos';
import mapa from './containers/General/Mapa/Mapa';
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
import contratoCondonar from './containers/Panel/Creditos/ContratoCondonar/ContratoCondonar';
import contratoProrroga from './containers/Panel/Creditos/ContratoProrroga/ContratoProrroga';
import contratoImprimir from './containers/Panel/Creditos/ContratoImprimir/ContratoImprimir';
import movimientos from './containers/Panel/Movimientos/Movimientos';
import movimientosForm from './containers/Panel/Movimientos/MovimientosForm/MovimientosForm';
import acopioForm from './containers/Panel/Acopios/AcopioForm/AcopioForm';
import fondosComunes from './containers/Panel/FondosComunes/FondosComunes';
import formatos from './containers/Panel/Formatos/Formatos';
import perfil from './containers/Panel/Perfil/PerfilCont';
import inicio from './containers/Panel/Inicio/Inicio';
import logout from './containers/Panel/Logout/Logout';
import mapaProcesos from './containers/Panel/Mapas/MapaProcesos/MapaProcesos';
import mapaMision from './containers/Panel/Mapas/MapaMision/MapaMision';
import messages_es from './translations/es.json'
import messages_tz from './translations/tz.json'
import messages_en from './translations/en.json'
import roles from './store/roles';
import * as actions from './store/actions'


const messages = {
  'es': messages_es,
  'tz': messages_tz,
  'en': messages_en
}

// import asyncComponent from './hoc/asyncComponent/asyncComponent'
//
// // estos pedazos no se cargar??n al inicio, s??lo hasta que se soliciten
// // ser??n CHUNKS diferentes gracias al LAZY loading
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
    // UNAUTHENTICATED PATHS
    let availableRoutes = (
      <Switch>
        <Route exact path="/" component={homeContainer} />
        <Route exact path="/conocenos" component={conocenos}/>
        <Route exact path="/mapa" component={mapa}/>
        <Route exact path="/contacto" component={contacto}/>
        <Route exact path="/acceso" component={acceso}/>
        <Route><Redirect to="/" /></Route>
      </Switch>
    )
    if (this.props.isAuthenticated) {
      // AUTHENTICATED SOCIO PATHS
      if (roles[this.props.role] === "Socio") {
        availableRoutes = (
          <Switch>
            <Route path="/inicio" component={inicio} />
            <Route path="/socios" component={socios} />
            <Route><Redirect to="/socios" /></Route>
          </Switch>
        )
      } else {
        // AUTHENTICATED PATHS
        availableRoutes = (
          <Switch>
            <Route path="/socios" component={socios} />
            <Route path="/perfil" component={perfil} />
            <Route path="/acopios" component={acopios} />
            <Route path="/carteras" component={carteras} />
            <Route path="/condonacion" component={contratoCondonar} />
            <Route path="/prorroga" component={contratoProrroga} />
            <Route path="/creditos" component={creditos} />
            <Route path="/mapa-procesos" component={mapaProcesos} />
            <Route path="/mapa-mision" component={mapaMision} />
            <Route path="/pagos" component={pagos} />
            <Route path="/pago-formato" component={pagoForm} />
            <Route path="/credito-imprimir" component={contratoImprimir} />
            <Route path="/tsumbalil" component={tsumbalil} />
            <Route path="/movimientos" component={movimientos} />
            <Route path="/solicitudes" component={solicitudes} />
            <Route path="/solicitud-formato" component={solicitudForm} />
            <Route path="/fondos-comunes" component={fondosComunes} />
            <Route path="/mesa-control" component={mesaControl} />
            <Route path="/formatos" component={formatos} />
            <Route path="/inicio" component={inicio} />
            <Route path="/logout" component={logout} />
            <Route path="/reportes" component={() => (<div>...En Construcci??n...</div>)} />
            <Route path="/movimiento-formato" component={movimientosForm} />
            <GerenciaRoute path="/acopio-formato" component={acopioForm} role={this.props.role} />
            <GerenciaRoute path="/evaluacion" component={evaluacion} role={this.props.role} />
            <GerenciaRoute path="/credito-activar" component={contratoActivate} role={this.props.role} />
            <GerenciaRoute path="/evaluacion-socio" component={evalSocios} role={this.props.role} />
            <GerenciaRoute path="/bancos" component={bancos} role={this.props.role} />
            <GerenciaRoute path="/subcuentas" component={subcuentas} role={this.props.role} />
            <GerenciaRoute path="/banco-form" component={bancoForm} role={this.props.role} />
            <Route><Redirect to="/inicio" /></Route>
          </Switch>
        )
      }
    }

    return (
      <IntlProvider locale={this.props.locale} messages={messages[this.props.locale]}>
        <Layout>
          {availableRoutes}
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
    role: state.auth.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch (actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
