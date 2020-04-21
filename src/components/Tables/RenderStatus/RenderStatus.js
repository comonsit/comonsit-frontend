import React from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './RenderStatus.module.css';

const renderStatus = props => {
  const cellClasses= [classes.CellStatus]
  cellClasses.push(classes[props.value])
  return (
    <div className={cellClasses.join(' ')}>
      <FormattedMessage id={props.idLabel+props.value}/>
    </div>
  )
}

export default renderStatus;
