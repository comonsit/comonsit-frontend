import React, { Component } from 'react';

import classes from './Inicio.module.scss'
import { connect } from 'react-redux';
import Weather from './Weather/Weather'
import Numbers from './Numbers/Numbers'
import DeudasMap from '../Mapas/DeudasMap/DeudasMap'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Title from '../../../components/UI/Title/Title';
import Card from '../../../components/UI/Card/Card';
import Spinner from '../../../components/UI/Spinner/Spinner';
import TotalCarteras from '../Carteras/TotalCarteras/TotalCarteras'
import axios from '../../../store/axios-be.js';
import * as actions from '../../../store/actions'


class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_vigentes: null,
      total_vencidos: null,
      count_vigentes: null,
      count_vencidos: null,
      loading: false
    }
    this.onGetCarteras()
  }

  componentDidMount() {
    this.props.fetchGralData(this.props.token)
  }

  onGetCarteras = () => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    axios.get('/contratos/carteras/' , authData)
      .then(response => {
        this.setState({
          total_vigentes: response.data.vigentes_total,
          total_vencidos: response.data.vencidos_total,
          count_vigentes: response.data.vigentes_count,
          count_vencidos: response.data.vencidos_count,
          loading: false,
        })
      })
      .catch(error => {
        this.setState({
          total_vigentes: 'N/D',
          total_vencidos: 'N/D',
          count_vigentes: 'N/D',
          count_vencidos: 'N/D',
          loading: false,
        })
        // TODO: FALTA!!
      })
  }

  render() {
    let carterasTotales = <Spinner/>
    const title = (this.props.user)
      ? (
          <Title
            titleName="inicio.title"
            titleNameEx={" " + this.props.user.first_name}
          />
        )
      : <Spinner/>

    if (!this.state.loading) {
      carterasTotales = (
        <TotalCarteras
          vigentes={this.state.total_vigentes}
          vencidos={this.state.total_vencidos}
          vigentes_count={this.state.count_vigentes}
          vencidos_count={this.state.count_vencidos}
        />
      )
    }

    return (
      <>
        <div className={classes.Container}>
          {title}
          <div className={classes.CardsContainer}>
            <div className={classes.Mapa}>
              <Card title={"inicio.mapa"}>
                <DeudasMap/>
              </Card>
            </div>
            <div>
              <Card title={"inicio.pronostico"}>
                <Weather/>
              </Card>
            </div>
            <div>
              <Card title={"inicio.carteras"}>
                {carterasTotales}
              </Card>
            </div>
            <div>
              <Card title={"inicio.calendario"}>
                <div className={classes.CalContainer}>
                  <iframe
                    className={classes.Calendario}
                    title='Calendario'
                    src="https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=2&amp;bgcolor=%23bbc392&amp;ctz=America%2FDetroit&amp;src=ZzcyZ3ZvYWszOGozbWY3dmZtcG9jaWFwN2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZXMubWV4aWNhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%236633CC&amp;color=%23227F63&amp;showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0"
                    width="300"
                    height="250"
                    frameBorder="0"
                    scrolling="no"></iframe>
                </div>
              </Card>
            </div>
            <div>
              <Card title={"inicio.numeros"}>
                <Numbers/>
              </Card>
            </div>
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
    updateUser: (userData) => dispatch(actions.setUser(userData)),
    fetchGralData: (token) => dispatch(actions.fetchGralData(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Inicio, axios))
