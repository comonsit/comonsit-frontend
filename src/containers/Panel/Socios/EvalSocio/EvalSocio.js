import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';

import classes from './EvalSocio.module.scss'
import SolicSaldosGraph from '../../../../components/Graphs/SolicSaldosGraph/SolicSaldosGraph';
import Title from '../../../../components/UI/Title/Title';
import Card from '../../../../components/UI/Card/Card';
import TextElement from '../../../../components/UI/TextElement/TextElement';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as actions from '../../../../store/actions'


class EvalSocio extends Component {
  state = {
    saldos: null,
    monto: 0,
    hint: null
  }

  componentDidMount() {
    this.props.onGetSocioSaldo(this.props.token, this.props.selSocio.clave_socio)
  }

  componentDidUpdate(prevProps) {
    if(this.props.saldo !== prevProps.saldo) {
      this.setState({saldos: this.props.saldo})
    }
  }

  componentWillUnmount() {
    this.props.unSelSocio()
  }

  _forgetValues = () => {
    this.setState({ hint: null})
  }

  _rememberValue = value => {
    this.setState({hint: value})
  }

  render() {
    const socioName = <h2>{'#' + this.props.selSocio.clave_socio + ' ' + this.props.selSocio.nombre_productor}</h2>
    const items1 = [
      "clave_socio",
      "nombre_productor",
      "nombre_region",
      "nombre_comunidad",
      "fecha_ingr_yomol_atel"
    ]
    const items1Array = items1.map(id => {
      return (
        <TextElement
          key={id}
          label={id}
          content={this.props.selSocio[id]}
          isDate={id === "fecha_ingr_yomol_atel"}
        />
      )
    })

    const saldoGraph = (this.state.saldos)
      ? (
          <SolicSaldosGraph
            data={this.state.saldos}
            monto={this.state.monto}
            mouseOver={this._rememberValue}
            mouseOut={this._forgetValues}
            hint={this.state.hint}
          />
        )
      : <Spinner/>
    // console.log(this.state.saldos)

    return (
      <div className={classes.Container}>
        <Title titleName="evalSocio.title">
          {socioName}
        </Title>
        <div className={classes.BlocksContainer}>
          <Card title={"evalSocio.Datos"}>
            <div className={classes.DataContainer}>
              {items1Array}
            </div>
          </Card>
          <Card title={"evalSocio.Acopios"}>
            {saldoGraph}
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listaSocios: state.socios.socios,
    selSocio: state.socios.selectedSocio,
    updated: state.socios.updated,
    token: state.auth.token,
    saldo: state.acopios.socioSaldo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    unSelSocio: () => dispatch(actions.unSelectSocio()),
    onGetSocioSaldo: (token, socioId) => dispatch(actions.getSocioSaldo(token, socioId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvalSocio)
