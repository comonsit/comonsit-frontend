import React from 'react';
import classes from './XLSButton.module.scss';
import { FormattedMessage } from 'react-intl';

// le pasamos un arreglo de clases, que unimos con el join!! y cambiará según agreguemos btnType?
const xlsbutton = (props) => (
  <div className={classes.XLSButton}>
    <button
      onClick={props.clicked}
    >
      <FormattedMessage id={props.labelID}/>
    </button>
  </div>
)

export default xlsbutton;
