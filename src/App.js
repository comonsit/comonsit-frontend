import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './store/actions'
import { Redirect, Route, withRouter, Switch} from "react-router-dom";
import Layout from './hoc/Layout/Layout'
import homeContainer from './containers/General/HomeContainer/HomeContainer';
import conocenos from './containers/General/Conocenos/Conocenos';
import origen from './containers/General/Origen/Origen';
import publicaciones from './containers/General/Publicaciones/Publicaciones';
import contacto from './containers/General/Contacto/Contacto';
import acceso from './containers/General/Acceso/Acceso';
import panel from './containers/Panel/Socios/Socios';
import Logout from './containers/Panel/Logout/Logout';
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
          <Route path="/d" exact component={panel}/>
          <Route path="/socios" exact component={panel}/>
          <Route path="/acopios" exact component={panel}/>
          <Route path="/aportaciones" exact component={panel}/>
        </>
      )
    }
    return (
      <Layout>
        <Switch>
            <Route path="/conocenos" component={conocenos}/>
            <Route path="/origen" component={origen}/>
            <Route path="/publicaciones" component={publicaciones}/>
            <Route path="/contacto" component={contacto}/>
            <Route path="/acceso" exact component={acceso}/>
            <Route path="/logout" component={Logout }/>
            {authenticatedRoutes}
            <Route path="/" exact component={homeContainer}/>
            {/* TODO: make 404 in redirect */}
            <Redirect to="/"/>
        </Switch>
      </Layout>
    );
  }


}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch (actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
