import React from 'react';

import csLogo from '../../../assets/images/cs-logo.png';
import cl from './Logo.module.css';

const logo = (props) => (
    <div className={cl.Logo}>
        <img src={csLogo} alt="Logo Comon Sit Ca'teltic"/>
    </div>
);

export default logo
