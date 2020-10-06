import React from 'react';

import classes from './Logo.module.scss';
import csLogo from '../../../assets/images/cs-logo.png';


const logo = (props) => (
    <div className={classes.Logo}>
        <img src={csLogo} alt="Logo Comon Sit Ca'teltic"/>
    </div>
);

export default logo
