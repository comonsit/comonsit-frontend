import React, { Component } from 'react';
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl';
import { Redirect, Route, withRouter, Switch} from "react-router-dom";
import * as actions from './store/actions'

import Layout from './hoc/Layout/Layout'
import homeContainer from './containers/General/HomeContainer/HomeContainer';
import conocenos from './containers/General/Conocenos/Conocenos';
import origen from './containers/General/Origen/Origen';
import publicaciones from './containers/General/Publicaciones/Publicaciones';
import contacto from './containers/General/Contacto/Contacto';
import acceso from './containers/General/Acceso/Acceso';
import socios from './containers/Panel/Socios/Socios';
import solicitudes from './containers/Panel/Solicitudes/Solicitudes';
import logout from './containers/Panel/Logout/Logout';

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
          <Route path="/d" exact component={socios}/>
          <Route path="/socios" exact component={socios}/>
          <Route path="/acopios" exact component={socios}/>
          <Route path="/solicitudes" exact component={solicitudes}/>
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
            <Redirect to="/"/>
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