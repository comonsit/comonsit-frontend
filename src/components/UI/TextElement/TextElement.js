import React from 'react'
import classes from './TextElement.module.css'
import {FormattedMessage, FormattedNumber, IntlProvider} from 'react-intl';

const textElement = (props) => {
  const cont = (props.isNum) ? (<IntlProvider locale='en'><FormattedNumber value={props.content} style="currency" currency="USD"/></IntlProvider>): props.content
    return (
      <div key={props.label} className={classes.ContentContainer}>
        <div className={classes.Label}>
          <label><FormattedMessage id={props.label}/></label>
        </div>
        <div className={classes.Content}>
          <p>{cont}</p>
        </div>
      </div>
    )
}

export default textElement
