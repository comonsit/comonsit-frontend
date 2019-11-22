import React from 'react';
import {FormattedMessage} from 'react-intl';
import cl from './Conocenos.module.css';

function Conocenos() {
  return (
    <div className={cl.Paragraph}>
      <h3><FormattedMessage id="conocenos.title"/></h3>
      <p><FormattedMessage id="contacto.text"/></p>
    </div>
  );
}

export default Conocenos;
