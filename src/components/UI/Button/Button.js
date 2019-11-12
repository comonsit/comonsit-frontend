import React from 'react';
import classes from './Button.module.css';

// le pasamos un arreglo de clases, que unimos con el join!! y cambiará según agreguemos btnType?
const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        >{props.children}</button>
)

export default button;
