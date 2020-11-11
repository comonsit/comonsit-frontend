import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './Title.module.scss';


const title = (props) => (
  <div className={classes.HeaderContainer}>
    <div className={[classes.HeaderContainer_main, classes[props.titleType]].join(' ')}>
      <h1><FormattedMessage id={props.titleName}/>{props.titleNameEx}</h1>
    </div>
    <div className={classes.HeaderContainer_extra}>
      {props.children}
    </div>
  </div>
)

export default title;
