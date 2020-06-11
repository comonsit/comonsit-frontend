import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import RTable from '../../../components/Tables/RTable/RTable';
import Button from '../../../components/UI/Button/Button';
import Title from '../../../components/UI/Title/Title';
import classes from './Bancos.module.css'
// import * as actions from '../../../store/actions'
import axios from '../../../store/axios-be.js'

class Tsumbalil extends Component {
  state = {
    registros: []
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
  }

  render () {
    const columns = [
      {
        Header: <FormattedMessage id="bancos.fecha"/>,
        accessor: 'fecha'
      },
      {
        Header: <FormattedMessage id="bancos.subcuenta"/>,
        accessor: 'subcuenta'
      },
      {
        Header: <FormattedMessage id="bancos.subcuenta_nombre"/>,
        accessor: 'subcuenta_nombre'
      },
      {
        Header: <FormattedMessage id="bancos.referencia"/>,
        accessor: 'referencia'
      },
      {
        Header: <FormattedMessage id="bancos.ingreso"/>,
        accessor: 'ingreso'
      },
      {
        Header: <FormattedMessage id="bancos.egreso"/>,
        accessor: 'egreso'
      },
      {
        Header: <FormattedMessage id="bancos.saldo_bancos"/>,
        accessor: 'saldo_bancos'
      }
    ]

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
          <RTable
            columns={columns}
            data={this.state.registros}
            onRowClick={() => {}}
            />
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
