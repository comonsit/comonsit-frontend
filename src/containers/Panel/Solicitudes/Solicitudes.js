import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
// import { connect } from 'react-redux';


class Solicitudes extends Component {


  render () {
    return (
      <>
        <div>
          <h1><FormattedMessage id="solicitudes.title"/></h1>
        </div>
      </>
    )
  }
}


export default Solicitudes
