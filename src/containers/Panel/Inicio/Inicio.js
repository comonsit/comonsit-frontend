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
                  <iframe title="calendarZoho" src="https://calendar.zoho.com/embed/575533f4249269e89e9f1e319706ea26b1d364a17c5cb0bafd0a5bf726ca2b265a1327a523a2eaf1b9d51b897c47f45e?title=Website%20CSC&type=1&l=en&tz=America%2FMexico_City&shtitle=1&shtz=1&shdv=0&v=0" frameBorder="0" scrolling="no"></iframe>
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
    user: state.auth.user,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(withErrorHandler(Inicio, axios))
