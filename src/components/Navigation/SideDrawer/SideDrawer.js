import React from 'react';

import classes from './SideDrawer.module.scss';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';



const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <>
      <Backdrop
        clicked={props.closed}
        show={props.open}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
