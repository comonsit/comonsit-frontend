import React from 'react';
import {FormattedMessage} from 'react-intl';
import cl from './Origen.module.css';

function Origen() {
  return (
    <div className={cl.Paragraph}>
      <h3><FormattedMessage id="origen.title"/></h3>
      <p><FormattedMessage id="origen.text"/></p>
    </div>
  );
}

export default Origen;
