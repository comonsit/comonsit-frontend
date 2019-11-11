import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

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
                {/* meter props closed aquí está feo porque piques lo que sea lo va a cerrar, no sólo links*/}
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
              <div className={classes.Logo}>
                  <Logo/>
              </div>
              <nav>
                <NavigationItems
                  isAuthenticated={props.isAuth}/>
              </nav>
            </div>
        </>
    );
};

export default sideDrawer;
