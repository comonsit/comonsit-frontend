import React from 'react'
import {FormattedNumber, IntlProvider} from 'react-intl';

const percent = props => {
  if (isNaN(props.value)) {
    return ''
  } else {
    return (<IntlProvider locale='en'>
              <FormattedNumber
                value={props.value/100}
                style="percent"
                maximumFractionDigits={4}
              />
            </IntlProvider>)
  }
}

export default percent
