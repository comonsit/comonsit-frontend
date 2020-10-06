import React from 'react';

import classes from './PLogo.module.scss';
import csLogoV from '../../../assets/images/cs-logoV.png';


const plogo = (props) => (
    <div className={classes.Logo}>
      <img src={csLogoV} alt="Logo Comon Sit Ca'teltic"/>
    </div>
);

export default plogo
