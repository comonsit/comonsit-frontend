import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BancosList from './BancosList/BancosList'
import BancosSaldos from './BancosSaldos/BancosSaldos'
import Card from '../../../components/UI/Card/Card';
import Button from '../../../components/UI/Button/Button';
import Title from '../../../components/UI/Title/Title';
import classes from './Bancos.module.css'
// import * as actions from '../../../store/actions'
import axios from '../../../store/axios-be.js'

class Tsumbalil extends Component {
  state = {
    registros: [],
    saldos: []
  }

  componentDidMount () {
    this.onGetRegistros()
  }

  onGetRegistros () {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    axios.get('/registros-contables.json', authData)
      .then(response => {
        this.setState({ registros: response.data})
      })
      .catch(error => {
        // TODO: FALTA!!
      })

    axios.get('/banco/saldos/', authData)
      .then(response => {
        this.setState({ saldos: response.data})
      })
      .catch(error => {
        // TODO: FALTA!!
      })
  }

  render () {

    return (
      <>
        <div className={classes.Container}>
          <Title
            titleName="bancos.title">
            <Button
              clicked={() => this.props.history.push('banco-form')}
            >
              <FormattedMessage id="bancos.newMovimiento"/>
            </Button>
          </Title>
          <div className={classes.CardsContainer}>
            <Card title={"banco.registros"}>
              <BancosList
                data={this.state.registros}
                onClick={() => {}}
              />
            </Card>
            <Card title={"banco.totales"}>
              <BancosSaldos
                data={this.state.saldos}
                onClick={() => {}}
              />
            </Card>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      role: state.generalData.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tsumbalil))
