import React from 'react';
import Collapsible from 'react-collapsible';
import {NavLink} from "react-router-dom";
import {FormattedMessage} from 'react-intl';

import cl from './PNavigationItems.module.css';

const pnavigationItems = props => (
  <div className={cl.NavigationItems}>
    <div className={[cl.NavigationItem, cl.NavigationItemHome].join(' ')} onClick={props.clicked}>
      <NavLink to="/inicio" exact activeClassName={cl.active}><FormattedMessage id="pmenu.inicio"/></NavLink>
    </div>
    <Collapsible
      transitionTime ={300}
      className={cl.Acordeon}
      openedClassName={cl.AcordeonOpen}
      triggerClassName={cl.AcordeaonTrigger}
      triggerOpenedClassName={cl.AcordeaonTriggerOpen}
      trigger=<FormattedMessage id="pmenu.creditos"/>
    >
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/solicitudes" exact activeClassName={cl.active}><FormattedMessage id="pmenu.solicitudes"/></NavLink>
      </div>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/creditos" exact activeClassName={cl.active}><FormattedMessage id="pmenu.creditos"/></NavLink>
      </div>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/pagos" exact activeClassName={cl.active}><FormattedMessage id="pmenu.pagos"/></NavLink>
      </div>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/carteras" exact activeClassName={cl.active}><FormattedMessage id="pmenu.carteras"/></NavLink>
      </div>
    </Collapsible>
    <Collapsible
      transitionTime ={300}
      className={cl.Acordeon}
      openedClassName={cl.AcordeonOpen}
      triggerClassName={cl.AcordeaonTrigger}
      triggerOpenedClassName={cl.AcordeaonTriggerOpen}
      trigger=<FormattedMessage id="pmenu.cuentas"/>>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/bancos" exact activeClassName={cl.active}><FormattedMessage id="pmenu.bancos"/></NavLink>
      </div>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/acopios" exact activeClassName={cl.active}><FormattedMessage id="pmenu.acopios"/></NavLink>
      </div>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/movimientos" exact activeClassName={cl.active}><FormattedMessage id="pmenu.movimientos"/></NavLink>
      </div>
    </Collapsible>
    <Collapsible
      transitionTime ={300}
      className={cl.Acordeon}
      openedClassName={cl.AcordeonOpen}
      triggerClassName={cl.AcordeaonTrigger}
      triggerOpenedClassName={cl.AcordeaonTriggerOpen}
      trigger=<FormattedMessage id="pmenu.datos"/>>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/socios" exact activeClassName={cl.active}><FormattedMessage id="pmenu.socios"/></NavLink>
      </div>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/tsumbalil" exact activeClassName={cl.active}><FormattedMessage id="pmenu.tsumbalil"/></NavLink>
      </div>
    </Collapsible>
    <Collapsible
      transitionTime ={300}
      className={cl.Acordeon}
      openedClassName={cl.AcordeonOpen}
      triggerClassName={cl.AcordeaonTrigger}
      trigger=<FormattedMessage id="pmenu.reportes"/>>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/reportes" exact activeClassName={cl.active}><FormattedMessage id="pmenu.reportes"/></NavLink>
      </div>
      <div className={cl.NavigationItem} onClick={props.clicked}>
        <NavLink to="/formatos" exact activeClassName={cl.active}><FormattedMessage id="pmenu.formatos"/></NavLink>
      </div>
    </Collapsible>
  </div>
)




export default pnavigationItems
