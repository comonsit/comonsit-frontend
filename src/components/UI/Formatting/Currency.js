import React from 'react'
import {FormattedNumber, IntlProvider} from 'react-intl';

const currency = props => {
  if (isNaN(props.value) || (props.hideZero && parseInt(props.value) === 0)) {
    return props.returnString ? props.value : ''
  } else {
    // hide negative zeroes
    const val = (props.value === 0) ? Math.abs(props.value) : (props.value)
    return (<IntlProvider locale='en'>
              <FormattedNumber
                value={val}
                style="currency"
                currency="USD"
              />
            </IntlProvider>)
  }


}

export default currency
