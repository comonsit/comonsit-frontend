import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './RenderStatus.module.scss';


const renderStatus = props => {
  const cellClasses= [classes.CellStatus]
  cellClasses.push(classes[props.value])
  const text = props.value ? <FormattedMessage id={props.idLabel+props.value}/> : ''

  return (
    <div className={cellClasses.join(' ')}>
      {text}
    </div>
  )
}


export default renderStatus;
