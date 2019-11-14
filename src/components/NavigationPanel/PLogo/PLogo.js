import React from 'react';

import csLogoV from '../../../assets/images/cs-logoV.png';
import cl from './PLogo.module.css';

const plogo = (props) => (
    <div className={cl.Logo}>
        <img src={csLogoV} alt="Logo Comon Sit Ca'teltic"/>
    </div>
);

export default plogo
