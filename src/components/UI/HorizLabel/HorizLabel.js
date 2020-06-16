import React from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './HorizLabel.module.css';


const horizLabel = (props) => {

  return (
  <div className={classes.Container}>
    <h5><FormattedMessage id={props.label}/>{props.labelExtra}</h5>
  </div>)
}


export default horizLabel;
