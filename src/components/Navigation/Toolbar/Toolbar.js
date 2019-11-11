import React from 'react';
import { NavLink} from "react-router-dom";
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo'
import Hamburguesa from '../SideDrawer/Hamburguesa/Hamburguesa'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            {/*Aquí iría el logo*/}
            <NavLink to="/" exact activeClassName={classes.active}>
              <Logo/>
            </NavLink>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
        <Hamburguesa
          clicked={props.showMenu}/>
    </header>
);

export default toolbar;
