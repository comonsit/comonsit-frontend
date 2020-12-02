import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {isGerencia} from '../../../store/roles'


const gerenciaRoute = ({component: Component, role, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => isGerencia(role)
        ? <Component {...props} />
        : <Redirect to={{pathname: '/inicio', state: {from: props.location}}} />}
    />
  )
}

export default gerenciaRoute
