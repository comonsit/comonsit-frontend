import React from 'react';
import {FormattedMessage} from 'react-intl';
import {NavLink} from "react-router-dom";

import cl from './NavigationItems.module.scss';

const navigationItems = (props) => (
    <div className={cl.Logo}>
      <ul className={cl.NavigationItems}>
        <li className={cl.NavigationItem}>
          <NavLink to="/" exact activeClassName={cl.active}><FormattedMessage id="menu.start"/></NavLink>
        </li>
        <li className={cl.NavigationItem}>
          <NavLink to="/conocenos" exact activeClassName={cl.active}><FormattedMessage id="menu.us"/></NavLink>
        </li>
        <li className={cl.NavigationItem}>
          <NavLink to="/origen" exact activeClassName={cl.active}><FormattedMessage id="menu.origin"/></NavLink>
        </li>
        <li className={cl.NavigationItem}>
          <NavLink to="/publicaciones" exact activeClassName={cl.active}><FormattedMessage id="menu.publication"/></NavLink>
        </li>
        <li className={cl.NavigationItem}>
          <NavLink to="/contacto" exact activeClassName={cl.active}><FormattedMessage id="menu.contact"/></NavLink>
        </li>
        <li className={cl.NavigationItemSpecial}>
          <NavLink to="/acceso" exact activeClassName={cl.active}><FormattedMessage id="menu.login"/></NavLink>
        </li>
      </ul>
    </div>
);


export default navigationItems
