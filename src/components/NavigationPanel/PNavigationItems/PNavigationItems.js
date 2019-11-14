import React from 'react';
import {NavLink} from "react-router-dom";

import cl from './PNavigationItems.module.css';

const pnavigationItems = (props) => (
    <div className={cl.Logo}>
      <div className={cl.NavigationItems}>
        <div className={cl.NavigationItem}>
          <NavLink to="/socios" exact activeClassName={cl.active}>Socios</NavLink>
        </div>
        <div className={cl.NavigationItem}>
          <NavLink to="/acopios" exact activeClassName={cl.active}>Acopios</NavLink>
        </div>
        <div className={cl.NavigationItem}>
          <NavLink to="/aportaciones" exact activeClassName={cl.active}>Aportaciones</NavLink>
        </div>
      </div>
    </div>
);


export default pnavigationItems
