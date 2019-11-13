import React from 'react';
import cl from './Contacto.module.css';

function Contacto() {
  return (
    <div className={cl.Paragraph}>
      <h2>Contacto</h2>
      <p>Nos puedes escribir cualquier duda o comentario a: <a className={cl.MailTo} href="mailto:contacto@comonsitcateltic.com">contacto@comonsitcateltic.com</a></p>
    </div>
  );
}

export default Contacto;
