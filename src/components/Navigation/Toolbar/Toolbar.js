import React from 'react';
import { NavLink} from "react-router-dom";
import classes from './Toolbar.module.scss';
import Logo from '../Logo/Logo'
import Hamburguesa from '../SideDrawer/Hamburguesa/Hamburguesa'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
      <div className={classes.Logo}>
        <NavLink to="/" exact activeClassName={classes.active}>
          <Logo/>
        </NavLink>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems/>
      </nav>
      <div className={classes.HambDiv}>
        <Hamburguesa
          clicked={props.showMenu}/>
      </div>
  </header>
);

export default toolbar;
