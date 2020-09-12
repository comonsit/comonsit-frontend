import React from 'react';
import {FormattedMessage} from 'react-intl';
import cl from './Publicaciones.module.scss';

function Publicaciones() {
  return (
    <div className={cl.Paragraph}>
      <h3><FormattedMessage id="publicaciones.title"/></h3>
      <p><FormattedMessage id="publicaciones.text1"/></p>
      <p><FormattedMessage id="publicaciones.text2"/></p>
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export default Publicaciones;
