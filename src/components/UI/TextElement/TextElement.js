import React from 'react'
import classes from './TextElement.module.css'
import Currency from '../Formatting/Currency'
import Percent from '../Formatting/Percent'
import {FormattedMessage} from 'react-intl';

const textElement = (props) => {
  let cont = props.content
  if (props.isNum) {
    cont = (<Currency value={props.content}/>)
  } else if (props.isPerc) {
    cont = (<Percent value={props.content}/>)
  }

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
