import React from 'react';
import { NavLink} from "react-router-dom";
import {FormattedMessage} from 'react-intl';

import classes from './PToolbar.module.scss';
import PLogo from '../PLogo/PLogo'
import Hamburguesa from '../../Navigation/SideDrawer/Hamburguesa/Hamburguesa';
import PNavigationItems from '../PNavigationItems/PNavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Role from '../Role/Role';


const ptoolbar = (props) =>{
  let attachedClasses = [classes.Toolbar, classes.Close];
  if (props.open) {
    attachedClasses = [classes.Toolbar, classes.Open]
  }

  return (
    <>
      <header className={attachedClasses.join(' ')}>
        <div className={classes.User}>
          <div className={classes.UserName}>
            <NavLink onClick={props.closed} to="/perfil">{props.user.first_name} {props.user.last_name}</NavLink>
          </div>
          <Role userRole={props.user.role}/>
          <NavLink onClick={props.closed} to="/logout"><FormattedMessage id="pmenu.logout"/></NavLink>
        </div>
        <nav className={classes.NavigationItemsContainer}>
          <PNavigationItems
            clicked={props.closed}
            userRole={props.user.role}
          />
        </nav>
        <div className={classes.PLogo}>
          <PLogo/>
        </div>
        <div className={classes.Border}>
          <div className={classes.Burger}>
            <Hamburguesa clicked={props.showMenu}/>
          </div>
        </div>
      </header>
      <Backdrop
        clicked={props.closed}
        show={props.open}
      />
    </>
  )
}


export default ptoolbar;
