import React, { Component } from 'react';
// import {FormattedMessage} from 'react-intl';
import classes from './Inicio.module.css'
import { connect } from 'react-redux';

import Weather from './Weather/Weather'
import Numbers from './Numbers/Numbers'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Title from '../../../components/UI/Title/Title';
import Card from '../../../components/UI/Card/Card';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../store/axios-be.js';
import * as actions from '../../../store/actions'


class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {

    const title = (this.props.user) ? <Title
      titleName="inicio.title"
      titleNameEx={" " + this.props.user.first_name}
    /> : <Spinner/>

    return (
      <>
      <div className={classes.Container}>
        {title}
        <div className={classes.CardsContainer}>
          <Card title={"Clima..."}>
            <Weather/>
          </Card>
          <Card title={"Calendario..."}>
            <div className={classes.CalContainer}>
              <iframe
                className={classes.Calendario}
                title='Calendario'
                src="https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=2&amp;bgcolor=%23bbc392&amp;ctz=America%2FDetroit&amp;src=ZzcyZ3ZvYWszOGozbWY3dmZtcG9jaWFwN2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZXMubWV4aWNhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%236633CC&amp;color=%23227F63&amp;showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0"
                width="300"
                height="250"
                frameborder="0"
                scrolling="no"></iframe>
            </div>
          </Card>
          <Card title={"Mapa..."}>
          </Card>
          <Card title={"Saldos..."}>
          </Card>
          <Card title={"Números..."}>
            <Numbers/>
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
