import React from 'react';
import {NavLink} from "react-router-dom";

import cl from './NavigationItems.module.css';

const navigationItems = (props) => (
    <div className={cl.Logo}>
      <ul className={cl.NavigationItems}>
        <li className={cl.NavigationItem}>
          <NavLink to="/" exact activeClassName={cl.active}>Inicio</NavLink>
        </li>
        <li className={cl.NavigationItem}>
          <NavLink to="/conocenos" exact activeClassName={cl.active}>Conócenos</NavLink>
        </li>
        <li className={cl.NavigationItem}>
          <NavLink to="/origen" exact activeClassName={cl.active}>Origen</NavLink>
        </li>
        <li className={cl.NavigationItem}>
          <NavLink to="/publicaciones" exact activeClassName={cl.active}>Publicaciones</NavLink>
        </li>
        <li className={cl.NavigationItem}>
          <NavLink to="/contacto" exact activeClassName={cl.active}>Contacto</NavLink>
        </li>
        <li className={cl.NavigationItemSpecial}>
          <NavLink to="/acceso" exact activeClassName={cl.active}>Acceder</NavLink>
        </li>
      </ul>
    </div>
);


export default navigationItems
