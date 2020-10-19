import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './Card.module.scss';


const card = props => {
  const cardTitle = props.title
    ? <h3><FormattedMessage id={props.title}/></h3>
    : null
  const cardClasses = props.table
    ? [classes.BoxContainer, classes.Table]
    : [classes.BoxContainer]

  return (
    <div className={cardClasses.join(' ')}>
      {cardTitle}
      {props.children}
    </div>
  )
}

export default card;
