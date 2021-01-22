import React from 'react';
import {FormattedMessage} from 'react-intl';
import classes from './Mapa.module.scss';

function Mapa() {
  return (
    <div className={classes.Paragraph}>
      <h3><FormattedMessage id="origen.title"/></h3>
      <p><FormattedMessage id="origen.text"/></p>
    </div>
  );
}

export default Mapa;
