import React from 'react'
import { FormattedMessage, IntlProvider } from 'react-intl';

import classes from './TextElement.module.scss';
import Currency from '../Formatting/Currency';
import Percent from '../Formatting/Percent';
import FrmtedDate from '../Formatting/FrmtedDate'
import messages_es from '../../../translations/es.json'
import messages_tz from '../../../translations/tz.json'


const messages = {
  'es': messages_es,
  'tz': messages_tz
}


const textElement = props => {
  let cont = props.content
  if (props.isNum) {
    cont = (<Currency value={props.content}/>)
  } else if (props.isPerc) {
    cont = (<Percent value={props.content}/>)
  } else if (props.isDate) {
    cont = (<FrmtedDate longDate value={props.content}/>)
  } else {
    cont = props.content
  }

  let label = <label><FormattedMessage id={props.label}/></label>
  if (props.twoLanguages) {
    label = (<label>
            <IntlProvider
              locale={'es'}
              messages={messages.es}
            >
              <FormattedMessage id={props.label}/>
            </IntlProvider>
            /
            <IntlProvider
              locale='tz'
              messages={messages.tz}
            >
              <FormattedMessage id={props.label}/>
            </IntlProvider>
          </label>)
  }


  return (
    <div key={props.label} className={classes.TextElementContainer}>
      <div className={classes.TextLabel}>
        {label}
      </div>
      <div className={classes.Content}>
        {cont}
      </div>
    </div>
  )
}

export default textElement
