import React from 'react';
import {FormattedMessage} from 'react-intl';
import cl from './Publicaciones.module.css';

function Publicaciones() {
  return (
    <div className={cl.Paragraph}>
      <h3><FormattedMessage id="publicaciones.title"/></h3>
      <p><FormattedMessage id="publicaciones.text1"/></p>
      <p><FormattedMessage id="publicaciones.text2"/></p>
    </div>
  );
}

export default Publicaciones;
