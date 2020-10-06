import React from 'react';

import classes from './Hamburguesa.module.scss';


const hamburguesa = (props) => (
    <div
      className={classes.Hamburguesa}
      onClick={props.clicked}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
)

export default hamburguesa;
