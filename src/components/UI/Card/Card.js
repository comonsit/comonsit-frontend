import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './Card.module.scss';


const card = props => (
  <div className={classes.BoxContainer}>
    <h3><FormattedMessage id={props.title}/></h3>
    {props.children}
  </div>
)


export default card;
