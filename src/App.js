import React from 'react';
import { Redirect, Route, Switch} from "react-router-dom";
import Layout from './hoc/Layout/Layout'
import homeContainer from './containers/General/HomeContainer/HomeContainer';
import conocenos from './containers/General/Conocenos/Conocenos';
import origen from './containers/General/Origen/Origen';
import publicaciones from './containers/General/Publicaciones/Publicaciones';
import contacto from './containers/General/Contacto/Contacto';
import acceso from './containers/General/Acceso/Acceso';


function App() {

  return (
    <Layout>
      <Switch>
          <Route path="/conocenos" component={conocenos}/>
          <Route path="/origen" component={origen}/>
          <Route path="/publicaciones" component={publicaciones}/>
          <Route path="/contacto" component={contacto}/>
          <Route path="/acceso" exact component={acceso}/>
          <Route path="/" exact component={homeContainer}/>
          {/* TODO: make 404 in redirect */}
          <Redirect to="/"/>
      </Switch>
    </Layout>
  );
}

export default App;
