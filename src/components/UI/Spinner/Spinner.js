import React from 'react';

import classes from './Spinner.module.scss';


const spinner = () => (
    <div className={classes.Container}>
      <div className={classes.innerContainer}>
        <div className={classes.coffee_cup}></div>
      </div>
    </div>
)

export default spinner;
