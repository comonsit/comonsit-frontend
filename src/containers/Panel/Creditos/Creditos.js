import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import ContratoDetail from './ContratoDetail/ContratoDetail';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import RTable from '../../../components/UI/RTable/RTable';
import SelectColumnFilter from '../../../components/UI/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../components/UI/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../components/UI/RTable/Filters/FilterGreaterThan';
import Title from '../../../components/UI/Title/Title';
import classes from './Creditos.module.css'
import * as actions from '../../../store/actions'
import axios from '../../../store/axios-be.js'

class Creditos extends Component {
  state = {
    showContratoModal: false,
    selectedContrato: null,
    loading: false
  }

  componentDidMount () {
    this.props.onInitCreditos(this.props.token)
  }

  showContrato = id => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    // TODO: implement loading view
    this.setState({
      loading: true,
      showContratoModal: true,
    })

    axios.get('/contratos/' + id + '.json', authData)
      .then(response => {
        this.setState({
          loading: false,
          selectedContrato: response.data
        });
      })
      .catch(error => {
        // alert('ALGO FALLÓ!')
      })
  }

  cancelSelected =() => {
    this.setState({
      showContratoModal: false,
      selectedContrato: null
    });
  }

  renderStatus = cellInfo => {
    const colors = {
      "PA": "#2bc71b",
      "VE": "#d1df2c",
      "VI": "#235ee4",
      "PF": "#be23e4"
    }

     return (
       <div
        style={{
          borderRadius: "2rem",
          width: "2rem",
          height: "2rem",
          backgroundColor: colors[cellInfo.cell.value] }}
       />
     )
 }

 renderStatusEj= cellInfo => {
   const colors = {
     "CO": "#2bc71b",
     "PC": "#235ee4",
     "CA": "#868a86"
   }

    return (
      <div
       style={{
         borderRadius: "2rem",
         width: "2rem",
         height: "2rem",
         backgroundColor: colors[cellInfo.cell.value] }}
      />
    )
  }

  render () {
    let contrato = <Spinner/>
    const columns = [
      {
        Header: '#',
        accessor: 'folio',
        Filter: '',
        filter: ''
      },
      {
        Header: <FormattedMessage id="creditos.fecha_inicio"/>,
        accessor: 'fecha_inicio'
      },
      {
        Header: <FormattedMessage id="clave_socio"/>,
        accessor: 'clave_socio'
      },
      {
        Header: <FormattedMessage id="nombres"/>,
        accessor: 'nombres'
      },
      {
        Header: <FormattedMessage id="solicitudes.tipo_credito"/>,
        accessor: "tipo_credito"
      },
      {
        Header: <FormattedMessage id="monto"/>,
        accessor: 'monto',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="plazo"/>,
        accessor: 'plazo',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="tasa"/>,
        accessor: 'tasa',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="estatus"/>,
        accessor: 'estatus',
        Cell: this.renderStatus,
        Filter: SelectColumnFilter,
        filter: 'equals'
      },
      {
        Header: <FormattedMessage id="creditos.estatus_ejecucion"/>,
        accessor: 'estatus_ejecucion',
        Cell: this.renderStatusEj,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: <FormattedMessage id="creditos.deuda_al_dia"/>,
        accessor: 'deuda_al_dia',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      }
    ]

    if (this.state.selectedContrato && !this.state.loading) {
      console.log(this.state.selectedContrato)
      contrato = <ContratoDetail contrato={this.state.selectedContrato}/>
    }

    return (
      <>
        <Modal
          show={this.state.showContratoModal}
          modalClosed={this.cancelSelected}>
          <div className={classes.Container}>
            <div className={classes.InfoContainer}>
              {contrato}
            </div>
          </div>
        </Modal>
        <div className={classes.Container}>
          <Title
            titleName="creditos.title">
          </Title>
          <RTable
            columns={columns}
            data={this.props.listaCreditos}
            onRowClick={(row) => this.showContrato(row.values.folio)}
            />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      listaCreditos: state.creditos.creditos,
      token: state.auth.token,
      role: state.generalData.role,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitCreditos: (token) => dispatch(actions.initCreditos(token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Creditos, axios)))
