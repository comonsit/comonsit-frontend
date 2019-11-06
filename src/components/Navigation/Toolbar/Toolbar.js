import React from 'react';
import { NavLink} from "react-router-dom";
import classes from './Toolbar.module.css';
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            {/*Aquí iría el logo*/}
            <NavLink to="/" exact activeClassName={classes.active}>
              <h3>ComonSit</h3>
            </NavLink>
        </div>
        <nav className={classes.DesktopOnly}>
            <ul className={classes.NavigationItems}>
              <li className={classes.NavigationItem}>
                <NavLink to="/" exact activeClassName={classes.active}>Inicio</NavLink>
              </li>
              <li className={classes.NavigationItem}>
                <NavLink to="/" exact activeClassName={classes.active}>Economía Solidaria</NavLink>
              </li>
              <li className={classes.NavigationItem}>
                <NavLink to="/" exact activeClassName={classes.active}>Conócenos</NavLink>
              </li>
              <li className={classes.NavigationItem}>
                <NavLink to="/login" exact activeClassName={classes.active}>Login</NavLink>
              </li>
            </ul>
        </nav>
    </header>
);

export default toolbar;
