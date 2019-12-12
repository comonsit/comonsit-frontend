import React from 'react';
import {NavLink} from "react-router-dom";
import {FormattedMessage} from 'react-intl';

import cl from './PNavigationItems.module.css';

const pnavigationItems = (props) => (
    <div className={cl.Logo}>
      <div className={cl.NavigationItems} onClick={props.clicked}>
        <div className={cl.NavigationItem}>
          <NavLink to="/socios" exact activeClassName={cl.active}><FormattedMessage id="pmenu.socios"/></NavLink>
        </div>
        <div className={cl.NavigationItem}>
          <NavLink to="/acopios" exact activeClassName={cl.active}><FormattedMessage id="pmenu.acopios"/></NavLink>
        </div>
        <div className={cl.NavigationItem}>
          <NavLink to="/solicitudes" exact activeClassName={cl.active}><FormattedMessage id="pmenu.solicitudes"/></NavLink>
        </div>
        <div className={cl.NavigationItem}>
          <NavLink to="/tsumbalil" exact activeClassName={cl.active}><FormattedMessage id="pmenu.tsumbalil"/></NavLink>
        </div>
      </div>
    </div>
);


export default pnavigationItems
