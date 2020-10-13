import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './Collapsible.module.scss';


const collapsible = props => (
  <div className={classes.wrap_collabsible}>
    <input id={props.labelId} className={classes.toggle} type="checkbox"/>
      <label htmlFor={props.labelId} className={classes.lbl_toggle}><FormattedMessage id={props.labelId}/></label>
      <div className={classes.collapsible_content}>
        <div className={classes.content_inner}>
          {props.children}
        </div>
      </div>
  </div>
)


export default collapsible;
