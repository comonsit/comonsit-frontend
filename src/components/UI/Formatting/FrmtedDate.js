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
            value={new Date(props.value+" 00:00:00")}
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
            value={new Date(props.value+" 00:00:00")}
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
