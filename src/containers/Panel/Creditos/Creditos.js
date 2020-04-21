import React, { Component } from 'react';
import FileSaver from 'file-saver';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import ContratoActions from './ContratoActions/ContratoActions';
import Modal from '../../../components/UI/Modal/Modal';
import HoverButton from '../../../components/UI/HoverButton/HoverButton';
import Spinner from '../../../components/UI/Spinner/Spinner';
import RTable from '../../../components/UI/RTable/RTable';
import SelectColumnFilter from '../../../components/UI/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../components/UI/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../components/UI/RTable/Filters/FilterGreaterThan';
import SwitchToggle from '../../../components/UI/SwitchToggle/SwitchToggle'
import Title from '../../../components/UI/Title/Title';
import Currency from '../../../components/UI/Formatting/Currency'
import Percent from '../../../components/UI/Formatting/Percent'
import classes from './Creditos.module.css'
import * as actions from '../../../store/actions'
import { isGerencia } from '../../../store/roles'
import axios from '../../../store/axios-be.js'

class Creditos extends Component {
  state = {
    showContratoModal: false,
    oldCreditos: false,
    selectedContratoPagos: null
  }

  componentDidMount () {
    this.props.onInitCreditos(this.props.token)
  }

  getXLSX = type => {
    let query, name, nameFilt
    if (this.state.oldCreditos) {
      query = '?all=true'
      nameFilt = '_todos'
    } else {
      query = ''
      nameFilt = '_conDeuda'
    }

    if (type === 'ALL') {
      query = query + ''
      name = ''
    } else {
      query = query +'&?region='+type
      name = '_region_'+type
    }
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` },
      responseType: 'blob',
    }

    axios.get('/contratosXLSX/' + query, authData)
      .then(response => {
        FileSaver.saveAs(response.data, 'contratos'+name+nameFilt+'.xlsx')
      })
      .catch(error => {
        // TODO:
      })
  }

  showContrato = id => {
    this.setState({
      showContratoModal: true,
    })
    this.props.onFetchSelContrato(this.props.token, id)

    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }

    axios.get('/contratos/' + id + '/pagos/', authData)
      .then(response => {
        this.setState({
          selectedContratoPagos: response.data
        });
      })
      .catch(error => {
        // alert('ALGO FALLÓ!')
      })
  }

  cancelSelected =() => {
    this.setState({
      showContratoModal: false,
      selectedContratoPagos: null
    });
    this.props.unSelContrato()
  }

  renderStatus = value => {
    const cellClasses= [classes.CellStatus]
    cellClasses.push(classes[value])
    return (<div className={cellClasses.join(' ')}><FormattedMessage id={'creditos.status.'+value}/></div>)
 }

  render () {
    let actions = <Spinner/>
    let downloadXLSButton = null
    const columns = [
      {
        Header: '#',
        accessor: 'id',
        Filter: '',
        filter: ''
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
        Header: <FormattedMessage id="region"/>,
        accessor: 'region'
      },
      {
        Header: <FormattedMessage id="creditos.fecha_inicio"/>,
        accessor: 'fecha_inicio'
      },
      {
        Header: <FormattedMessage id="creditos.fecha_vencimiento"/>,
        accessor: 'fecha_vencimiento'
      },
      {
        Header: <FormattedMessage id="plazo"/>,
        accessor: 'plazo_disp',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="tasa"/>,
        accessor: 'tasa',
        Cell: (cellInfo) => <Percent value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="tasa_moratoria"/>,
        accessor: 'tasa_moratoria',
        Cell: (cellInfo) => <Percent value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="estatus"/>,
        accessor: 'estatus',
        Cell: (cellInfo) => this.renderStatus(cellInfo.cell.value),
        Filter: SelectColumnFilter,
        filter: 'equals'
      },
      {
        Header: <FormattedMessage id="creditos.estatus_ejecucion"/>,
        accessor: 'estatus_ejecucion',
        Cell: (cellInfo) => this.renderStatus(cellInfo.cell.value),
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: <FormattedMessage id="monto"/>,
        accessor: 'monto',
        Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="creditos.interes_ordinario"/>,
        accessor: 'deuda_al_dia.interes_ordinario',
        Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="creditos.interes_moratorio"/>,
        accessor: 'deuda_al_dia.interes_moratorio',
        Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="creditos.pagado"/>,
        accessor: 'pagado',
        Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="creditos.deuda_al_dia"/>,
        accessor: 'deuda_al_dia.total',
        Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      }
    ]

    if (isGerencia(this.props.role)) {
      const processList = ['ALL', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      const oldCreditsMessId = this.state.oldCreditos ? 'creditos.allCreditsTrue' : 'creditos.allCreditsFalse'
      downloadXLSButton = (
        <div>
          <div className={classes.XLSContainer}>
            <HoverButton title="contratosXLSX" items={processList} clicked={this.getXLSX}/>
            <SwitchToggle clicked={() => this.setState(({oldCreditos: !this.state.oldCreditos}))}/>
            <p><FormattedMessage id={oldCreditsMessId}/></p>
          </div>
        </div>)
    }

    if (this.props.selContrato && this.state.selectedContratoPagos) {
      actions = (<ContratoActions
                  selContrato={this.props.selContrato}
                  pagos={this.state.selectedContratoPagos}
                  role={this.props.role}
                  statusDetail={this.renderStatus(this.props.selContrato.estatus_detail)}
                  statusEx={this.renderStatus(this.props.selContrato.estatus_ejecucion)}
                />)
    }
    return (
      <>
        <Modal
          show={this.state.showContratoModal}
          modalClosed={this.cancelSelected}>
          {actions}
        </Modal>
        <div className={classes.Container}>
          <Title
            titleName="creditos.title">
          </Title>
          <div className={classes.Table}>
            {downloadXLSButton}
            <RTable
              columns={columns}
              data={this.props.listaCreditos}
              onRowClick={(row) => this.showContrato(row.values.id)}
              />
        </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      listaCreditos: state.creditos.creditos,
      selContrato: state.creditos.selectedContrato,
      token: state.auth.token,
      role: state.generalData.role,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitCreditos: (token) => dispatch(actions.initCreditos(token)),
      onFetchSelContrato: (token, id) => dispatch(actions.fetchSelContrato(token, id)),
      unSelContrato: () => dispatch(actions.unSelectContrato())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Creditos, axios)))
