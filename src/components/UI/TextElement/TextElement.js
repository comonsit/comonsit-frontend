import React from 'react'
import classes from './TextElement.module.css'
import Currency from '../Formatting/Currency'
import Percent from '../Formatting/Percent'
import { FormattedMessage, IntlProvider } from 'react-intl';
import messages_es from '../../../translations/es.json'
import messages_tz from '../../../translations/tz.json'

const messages = {
  'es': messages_es,
  'tz': messages_tz
}

const textElement = (props) => {
  let cont = props.content
  if (props.isNum) {
    cont = (<Currency value={props.content}/>)
  } else if (props.isPerc) {
    cont = (<Percent value={props.content}/>)
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
    <div key={props.label} className={classes.ContentContainer}>
      <div className={classes.Label}>
        {label}
      </div>
      <div className={classes.Content}>
        <p>{cont}</p>
      </div>
    </div>
  )
}

export default textElement
