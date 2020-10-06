import React from 'react';
import Collapsible from 'react-collapsible';
import { NavLink } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import classes from './PNavigationItems.module.scss';


const pnavigationItems = props => (
    <div className={classes.NavigationItems}>
      <div className={[classes.NavigationItem, classes.NavigationItemHome].join(' ')} onClick={props.clicked}>
        <NavLink to="/inicio" exact activeClassName={classes.active}><FormattedMessage id="pmenu.inicio"/></NavLink>
      </div>
      <Collapsible
        transitionTime ={300}
        className={classes.Acordeon}
        openedClassName={classes.AcordeonOpen}
        triggerClassName={classes.AcordeaonTrigger}
        triggerOpenedClassName={classes.AcordeaonTriggerOpen}
        trigger=<FormattedMessage id="pmenu.creditos"/>
      >
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/solicitudes" exact activeClassName={classes.active}><FormattedMessage id="pmenu.solicitudes"/></NavLink>
        </div>
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/creditos" exact activeClassName={classes.active}><FormattedMessage id="pmenu.creditos"/></NavLink>
        </div>
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/pagos" exact activeClassName={classes.active}><FormattedMessage id="pmenu.pagos"/></NavLink>
        </div>
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/carteras" exact activeClassName={classes.active}><FormattedMessage id="pmenu.carteras"/></NavLink>
        </div>
      </Collapsible>
      <Collapsible
        transitionTime ={300}
        className={classes.Acordeon}
        openedClassName={classes.AcordeonOpen}
        triggerClassName={classes.AcordeaonTrigger}
        triggerOpenedClassName={classes.AcordeaonTriggerOpen}
        trigger=<FormattedMessage id="pmenu.cuentas"/>
      >
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/bancos" exact activeClassName={classes.active}><FormattedMessage id="pmenu.bancos"/></NavLink>
        </div>
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/subcuentas" exact activeClassName={classes.active}><FormattedMessage id="pmenu.subcuentas"/></NavLink>
        </div>
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/acopios" exact activeClassName={classes.active}><FormattedMessage id="pmenu.acopios"/></NavLink>
        </div>
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/movimientos" exact activeClassName={classes.active}><FormattedMessage id="pmenu.movimientos"/></NavLink>
        </div>
      </Collapsible>
      <Collapsible
        transitionTime ={300}
        className={classes.Acordeon}
        openedClassName={classes.AcordeonOpen}
        triggerClassName={classes.AcordeaonTrigger}
        triggerOpenedClassName={classes.AcordeaonTriggerOpen}
        trigger=<FormattedMessage id="pmenu.datos"/>
      >
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/socios" exact activeClassName={classes.active}><FormattedMessage id="pmenu.socios"/></NavLink>
        </div>
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/tsumbalil" exact activeClassName={classes.active}><FormattedMessage id="pmenu.tsumbalil"/></NavLink>
        </div>
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/mapa-prueba" exact activeClassName={classes.active}><FormattedMessage id="pmenu.mapas"/></NavLink>
        </div>
      </Collapsible>
      <Collapsible
        transitionTime ={300}
        className={classes.Acordeon}
        openedClassName={classes.AcordeonOpen}
        triggerClassName={classes.AcordeaonTrigger}
        trigger=<FormattedMessage id="pmenu.reportes"/>
      >
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/reportes" exact activeClassName={classes.active}><FormattedMessage id="pmenu.reportes"/></NavLink>
        </div>
        <div className={classes.NavigationItem} onClick={props.clicked}>
          <NavLink to="/formatos" exact activeClassName={classes.active}><FormattedMessage id="pmenu.formatos"/></NavLink>
        </div>
      </Collapsible>
    </div>
)


export default pnavigationItems
