import React from 'react';
// import {FormattedMessage} from 'react-intl';
import MapaSVG from '../../../assets/images/MapaSVG.svg'
import classes from './Mapa.module.scss';

function Mapa() {
  return (
    <div className={classes.Container}>
      <img className={classes.Long}  src={MapaSVG} alt="MapaSVG"/>
      <div className={classes.Container_Content}>
        <h3>Mapa y Datos de la Región</h3>
        <p>En el proceso de construir esta plataforma nos encontramos con una gran cantidad de datos de la región que consideramos serán de interés público.</p>
        <p>Durante los próximos meses, en apoyo con voluntarios y entusiastas estaremos construyendo un mapa de libre acceso con información de la región.</p>
      </div>
    </div>
  );
}

export default Mapa;
