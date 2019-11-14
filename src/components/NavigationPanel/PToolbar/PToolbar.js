import React from 'react';
// import { NavLink} from "react-router-dom";
import classes from './PToolbar.module.css';
import PLogo from '../PLogo/PLogo'
// import Hamburguesa from '../SideDrawer/Hamburguesa/Hamburguesa'
import PNavigationItems from '../PNavigationItems/PNavigationItems'

const ptoolbar = (props) => (
    <header className={classes.Toolbar}>
      <div className={classes.User}>
        <h3>xMary Pérez</h3>
      </div>
      <nav>
        <PNavigationItems/>
      </nav>
      <div className={classes.PLogo}>
        <PLogo/>
      </div>
    </header>
);

export default ptoolbar;
