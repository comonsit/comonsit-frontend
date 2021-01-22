import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from "react-router-dom";

import classes from './NavigationItems.module.scss';


const navigationItems = (props) => (
    <div className={classes.Logo}>
      <ul className={classes.NavigationItems}>
        <li className={classes.NavigationItem}>
          <NavLink to="/" exact activeClassName={classes.active}><FormattedMessage id="menu.start"/></NavLink>
        </li>
        <li className={classes.NavigationItem}>
          <NavLink to="/conocenos" exact activeClassName={classes.active}><FormattedMessage id="menu.us"/></NavLink>
        </li>
        <li className={classes.NavigationItem}>
          <NavLink to="/mapa" exact activeClassName={classes.active}><FormattedMessage id="menu.mapa"/></NavLink>
        </li>
        <li className={classes.NavigationItem}>
          <NavLink to="/contacto" exact activeClassName={classes.active}><FormattedMessage id="menu.contact"/></NavLink>
        </li>
        <li className={classes.NavigationItemSpecial}>
          <NavLink to="/acceso" exact activeClassName={classes.active}><FormattedMessage id="menu.login"/></NavLink>
        </li>
      </ul>
    </div>
);


export default navigationItems
