import React from 'react';
import classes from './Hamburguesa.module.scss';

// le pasamos un arreglo de clases, que unimos con el join!! y cambiará según agreguemos btnType?
const hamburguesa = (props) => (
        <div
            className={classes.Hamburguesa}
            onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
)

export default hamburguesa;
