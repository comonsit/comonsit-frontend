import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './Inicio.module.scss'
import { connect } from 'react-redux';
import Weather from './Weather/Weather'
import Numbers from './Numbers/Numbers'
import DeudasMap from '../Mapas/DeudasMap/DeudasMap'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Title from '../../../components/UI/Title/Title';
import Card from '../../../components/UI/Card/Card';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import TotalCarteras from '../Carteras/TotalCarteras/TotalCarteras'
import { isGerencia } from '../../../store/roles';
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
    if (props.role && props.role !== "Socio") {
        this.onGetCarteras()
    }
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

  // TEMPORAL BUTTON FOR INFO CATCHING OF ASAMBLEA
  onGoToSocios = () => {
    this.props.history.push('socios');
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

    // TEMPORAL BUTTON FOR INFO CATCHING OF ASAMBLEA
    let deudasMap = (
      <Button clicked={this.onGoToSocios}>
        TABLA <FormattedMessage id="socios.title"/>
      </Button>
    )
    let carteras = null
    let calendario = null

    if (isGerencia(this.props.role)) {
      deudasMap = (
        <div className={classes.Mapa}>
          <Card title={"inicio.mapa"}>
            <DeudasMap/>
          </Card>
        </div>
      )
      carteras = (
        <div>
          <Card title={"inicio.carteras"}>
            {carterasTotales}
          </Card>
        </div>
      )
      calendario = (
        <div>
          <Card title={"inicio.calendario"}>
            <div className={classes.CalContainer}>
              <iframe title="calendarZoho" src="https://calendar.zoho.com/embed/575533f4249269e89e9f1e319706ea26b1d364a17c5cb0bafd0a5bf726ca2b265a1327a523a2eaf1b9d51b897c47f45e?title=Website%20CSC&type=1&l=es&tz=America%2FMexico_City&shtitle=0&shtz=0&shdv=0&v=2" width="600" height="500" frameborder="0" scroll="auto"></iframe>
            </div>
          </Card>
        </div>
      )
    }

    return (
      <>
        <div className={classes.Container}>
          {title}
          <div className={classes.CardsContainer}>
            {deudasMap}
            {calendario}
            {carteras}
            <div>
              <Card title={"inicio.pronostico"}>
                <Weather/>
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
    role: state.auth.role,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(withErrorHandler(Inicio, axios))
