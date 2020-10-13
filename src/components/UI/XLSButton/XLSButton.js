import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './XLSButton.module.scss';


const xlsbutton = props => (
  <div className={classes.XLSButton}>
    <button onClick={props.clicked}>
      <FormattedMessage id={props.labelID}/>
    </button>
  </div>
)

export default xlsbutton;
