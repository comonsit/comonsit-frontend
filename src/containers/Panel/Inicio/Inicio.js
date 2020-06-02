import React, { Component } from 'react';
// import {FormattedMessage} from 'react-intl';
import classes from './Inicio.module.css'
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Title from '../../../components/UI/Title/Title';
import Card from '../../../components/UI/Card/Card';
import axios from '../../../store/axios-be.js';
import * as actions from '../../../store/actions'


class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {

    return (
      <>
      <div className={classes.Container}>
        <Title
          titleName="inicio.title"
          titleNameEx={" " + this.props.user.first_name}
        />
        <div className={classes.CardsContainer}>
          <Card title={"Clima..."}>
          </Card>
          <Card title={"Mapa..."}>
          </Card>
          <Card title={"Saldos..."}>
          </Card>
          <Card title={"Números..."}>
          </Card>
        </div>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      user: state.generalData.user,
      token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      updateUser: (userData) => dispatch(actions.setUser(userData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Inicio, axios))
