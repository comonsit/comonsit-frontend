import React from 'react'
import {FormattedNumber, IntlProvider} from 'react-intl';

const currency = props => {
  if (isNaN(props.value)) {
    return ''
  } else {
    return (<IntlProvider locale='en'>
              <FormattedNumber
                value={props.value}
                style="currency"
                currency="USD"
              />
            </IntlProvider>)
  }
}

export default currency
