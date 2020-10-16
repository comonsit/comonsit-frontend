import React from 'react'
import {FormattedNumber, IntlProvider} from 'react-intl';

const currency = ({value, hideZero, returnString, style="currency"}) => {
  if (isNaN(value) || (hideZero && parseFloat(value) === 0)) {
    return returnString ? value : ''
  } else {
    // hide negative zeroes
    const val = (value === 0) ? Math.abs(value) : (value)

    return (
      <IntlProvider locale='en'>
        <FormattedNumber
          value={val}
          style={style}
          currency="USD"
        />
      </IntlProvider>
    )
  }
}


export default currency
