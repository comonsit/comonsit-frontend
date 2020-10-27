import React from 'react'
import {FormattedMessage} from 'react-intl';
import ContratoDetail from '../ContratoDetail/ContratoDetail'

import classes from './ContratoImprimir.module.scss'


class ContratoImprCont extends React.Component {
  render() {
    return (
      <div className={classes.PrintContainer}>
        <ContratoDetail
          contrato={this.props.selCon}
          forPrinting
        />
        <div className={classes.SubSection}>
          <div className={classes.SignBox}>
            <p><FormattedMessage id="contratoDetail.firma"/></p>
            <p>{this.props.selGerente}</p>
          </div>
          <div className={classes.SignBox}>
            <p><FormattedMessage id="contratoDetail.firma"/></p>
            <p>{this.props.selCon.nombres}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ContratoImprCont
