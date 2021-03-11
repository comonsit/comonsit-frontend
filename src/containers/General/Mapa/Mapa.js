import React from 'react';
import {FormattedMessage} from 'react-intl';
import MapaSVG from '../../../assets/images/MapaSVG.svg'
import classes from './Mapa.module.scss';

function Mapa() {
  return (
    <div className={classes.Container}>
      <img className={classes.Long}  src={MapaSVG} alt="MapaSVG"/>
      <div className={classes.Container_Content}>
        <h3><FormattedMessage id="mapa.title"/></h3>
        <p><FormattedMessage id="mapa.p1"/></p>
        <p><FormattedMessage id="mapa.p2"/></p>
      </div>
    </div>
  );
}

export default Mapa;
