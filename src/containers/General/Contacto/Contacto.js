import React from 'react';
import {FormattedMessage} from 'react-intl';
import cl from './Contacto.module.scss';

function Contacto() {
  return (
    <div className={cl.Paragraph}>
      <h2><FormattedMessage id="contacto.title"/></h2>
      <p><FormattedMessage id="contacto.text"/><a className={cl.MailTo} href="mailto:direccion@comonsitcateltic.com">direccion@comonsitcateltic.com</a></p>
    </div>
  );
}

export default Contacto;
