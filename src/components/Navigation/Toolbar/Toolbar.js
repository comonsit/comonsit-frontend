import React from 'react';
import { NavLink} from "react-router-dom";
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo'
import Hamburguesa from '../SideDrawer/Hamburguesa/Hamburguesa'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            {/*Aquí iría el logo*/}
            <NavLink to="/" exact activeClassName={classes.active}>
              <Logo/>
            </NavLink>
        </div>
        <nav className={classes.DesktopOnly}>
            <ul className={classes.NavigationItems}>
              <li className={classes.NavigationItem}>
                <NavLink to="/" exact activeClassName={classes.active}>Inicio</NavLink>
              </li>
              <li className={classes.NavigationItem}>
                <NavLink to="/conocenos" exact activeClassName={classes.active}>Conócenos</NavLink>
              </li>
              <li className={classes.NavigationItem}>
                <NavLink to="/origen" exact activeClassName={classes.active}>Origen</NavLink>
              </li>
              <li className={classes.NavigationItem}>
                <NavLink to="/publicaciones" exact activeClassName={classes.active}>Publicaciones</NavLink>
              </li>
              <li className={classes.NavigationItem}>
                <NavLink to="/contacto" exact activeClassName={classes.active}>Contacto</NavLink>
              </li>
              <li className={classes.NavigationItem}>
                <NavLink to="/login" exact activeClassName={classes.active}>Acceso</NavLink>
              </li>
            </ul>
        </nav>
        <Hamburguesa
          clicked={props.showMenu}/>
    </header>
);

export default toolbar;
