import React from 'react'
import {FormattedDate, IntlProvider} from 'react-intl';

const formtedDate = props => {
  if (isNaN(props.value) && !isNaN(Date.parse(props.value))) {
    return (<IntlProvider locale='es'>
              <FormattedDate
                value={props.value}
                day="numeric"
                month="long"
                year={(props.noYear) ? undefined : "numeric"}/>
              </IntlProvider>)
  } else {
    return ''
  }
}

export default formtedDate
