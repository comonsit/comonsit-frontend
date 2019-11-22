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
        <p><FormattedMessage id="home.text"/></p>
      </div>
    </div>
  );
}

export default HomeContainer;
