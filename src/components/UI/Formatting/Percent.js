import React from 'react'
import {FormattedNumber, IntlProvider} from 'react-intl';

const percent = ({value, style="percent"}) => {
  if (isNaN(value)) {
    return ''
  } else {
    return (<IntlProvider locale='en'>
              <FormattedNumber
                value={value/100}
                style={style}
                maximumFractionDigits={4}
              />
            </IntlProvider>)
  }
}

export default percent
