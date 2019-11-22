import React from 'react';
import {FormattedMessage} from 'react-intl';
import cl from './HomeContainer.module.css';

import HomeImage from '../../../assets/photos/homeImage.jpg'

function HomeContainer() {
  return (
    <div className={cl.Home}>
      <div className={cl.Image}>
        <img src={HomeImage} alt="Imagen Inicial"/>
      </div>
      <div className={cl.Paragraph}>
        <h3><FormattedMessage id="home.title"/></h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
}

export default HomeContainer;
