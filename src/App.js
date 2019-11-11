import React from 'react';
import { Redirect, Route, Switch} from "react-router-dom";
import Layout from './hoc/Layout/Layout'
import homeContainer from './containers/HomeContainer/HomeContainer';
import conocenos from './containers/Conocenos/Conocenos';
// import login from './containers/Login/Login';
// import contacto from './containers/Contacto/Contacto';

function App() {

  return (
    <Layout>
      <Switch>
          {/*<Route path="/contacto" component={contacto}/>*/}
          <Route path="/conocenos" component={conocenos}/>
          <Route path="/" exact component={homeContainer}/>
          {/* TODO: make 404 in redirect */}
          <Redirect to="/"/>
      </Switch>
    </Layout>
  );
}

export default App;
