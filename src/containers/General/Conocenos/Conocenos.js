import React from 'react';
import {FormattedMessage} from 'react-intl';
import cl from './Conocenos.module.css';

function Conocenos() {
  return (
    <div className={cl.Paragraph}>
      <h3><FormattedMessage id="conocenos.title"/></h3>
      <p><FormattedMessage id="contacto.text"/></p>
      <iframe
        className={cl.Calendario}
        title='Calendario Temporal'
        src="https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=2&amp;bgcolor=%23bbc392&amp;ctz=America%2FDetroit&amp;src=ZzcyZ3ZvYWszOGozbWY3dmZtcG9jaWFwN2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZXMubWV4aWNhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%236633CC&amp;color=%23227F63&amp;showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0"
        width="800"
        height="600"
        frameborder="0"
        scrolling="no"></iframe>
    </div>
  );
}

export default Conocenos;
