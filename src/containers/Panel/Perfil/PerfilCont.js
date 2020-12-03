import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Perfil from './Perfil';
import axios from '../../../store/axios-be.js';


class PerfilCont extends Component {

  render() {
    if (this.props.user) {
      return <Perfil />
    }
    return <Spinner />
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(withErrorHandler(PerfilCont, axios))
