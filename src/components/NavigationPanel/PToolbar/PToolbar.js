import React from 'react';
import { NavLink} from "react-router-dom";
import {FormattedMessage} from 'react-intl';
import classes from './PToolbar.module.css';
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
          <h3>{props.user.first_name} {props.user.last_name}</h3>
          <Role
            userRole={props.user.role}/>
          <NavLink onClick={props.closed} to="/logout"><FormattedMessage id="pmenu.logout"/></NavLink>
        </div>

        <nav>
          <PNavigationItems
            clicked={props.closed}
            />
        </nav>
        <div className={classes.PLogo}>
          <PLogo/>
        </div>
        <div className={classes.Border}>
          <div className={classes.Burger}>
              <Hamburguesa
                clicked={props.showMenu}/>
          </div>
        </div>
      </header>
      <Backdrop
          clicked={props.closed}
          show={props.open}/>
    </>
  )
}

export default ptoolbar;
