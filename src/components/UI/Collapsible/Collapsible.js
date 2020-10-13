import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './Collapsible.module.scss';


const collapsible = props => (
  <div className={classes.wrap_collabsible}>
    <input id="collapsible" className={classes.toggle} type="checkbox"/>
      <label htmlFor="collapsible" className={classes.lbl_toggle}><FormattedMessage id={props.labelId}/></label>
      <div className={classes.collapsible_content}>
        <div className={classes.content_inner}>
          <p>
            {props.children}
          </p>
        </div>
      </div>
  </div>
)


export default collapsible;
