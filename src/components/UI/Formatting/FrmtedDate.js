import React from 'react'
import {
  FormattedDate,
  IntlProvider
} from 'react-intl';


const frmtedDate = props => {
  if (isNaN(props.value) && !isNaN(Date.parse(props.value))) {
    if (props.longDate) {
      return (
        <IntlProvider locale='es'>
          <FormattedDate
            value={props.value}
            day="numeric"
            month="long"
            year={(props.noYear) ? undefined : "numeric"}
          />
        </IntlProvider>
      )
    } else {
      return (
        <IntlProvider locale='es'>
          <FormattedDate
            value={props.value}
            day="numeric"
            month="short"
            formatMatcher='best fit'
            year={(props.noYear) ? undefined : "2-digit"}
          />
        </IntlProvider>
      )
    }
  } else {
    return ''
  }
}


export default frmtedDate
