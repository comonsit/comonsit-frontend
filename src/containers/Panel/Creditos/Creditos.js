import React, { Component } from 'react';
import FileSaver from 'file-saver';
import {FormattedMessage, FormattedNumber, IntlProvider, FormattedDate} from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import ContratoDetail from './ContratoDetail/ContratoDetail';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
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
import FrmtedDate from '../../../components/UI/Formatting/FrmtedDate'
import classes from './Creditos.module.css'
import * as actions from '../../../store/actions'
import { isGerencia } from '../../../store/roles'
import axios from '../../../store/axios-be.js'

class Creditos extends Component {
  state = {
    showContratoModal: false,
    selectedContrato: null,
    loading: false,
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
      selectedContrato: null,
      selectedContratoPagos: null
    });
  }

  renderStatus = value => {
    const cellClasses= [classes.CellStatus]
    cellClasses.push(classes[value])
    return (<div className={cellClasses.join(' ')}><FormattedMessage id={'creditos.status.'+value}/></div>)
 }

  render () {
    let contrato, contratoStatus, pagos = <Spinner/>
    let downloadXLSButton, actionButtons, gerenteButtons, totalPago = null
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

    if (this.state.selectedContrato && !this.state.loading) {
      console.log(this.state.selectedContrato)
      totalPago = <p><FormattedMessage id="creditos.pagado"/>: <Currency value={this.state.selectedContrato.pagado}/></p>
      contrato = <ContratoDetail contrato={this.state.selectedContrato}/>
      const deuda = this.state.selectedContrato.deuda_al_dia ? this.state.selectedContrato.deuda_al_dia.total : null
      const inicio = (isNaN(this.state.selectedContrato.fecha_inicio) && !isNaN(Date.parse(this.state.selectedContrato.fecha_inicio))) ? new Date(this.state.selectedContrato.fecha_inicio) : null
      const vencimiento = (isNaN(this.state.selectedContrato.fecha_vencimiento) && !isNaN(Date.parse(this.state.selectedContrato.fecha_vencimiento))) ? new Date(this.state.selectedContrato.fecha_vencimiento) : null
      let cartera_vigente, cartera_vencida, vida_credito
      if (inicio && vencimiento) {
        const today = new Date()
        const oneDay = 24 * 60 * 60 * 1000;
        vida_credito = Math.round(Math.abs((today - inicio) / oneDay));
        if (today > vencimiento) {
          cartera_vencida = Math.round(Math.abs((vencimiento - today) / oneDay));
          cartera_vigente = vida_credito - cartera_vencida
        } else {
          cartera_vencida = vida_credito
          cartera_vigente = 0
        }
      }
      contratoStatus = (<div className={classes.StatusContainer}>
                          <div className={classes.StatusDataContainer}>
                            <p><FormattedMessage id="creditos.deuda_al_dia"/>: <Currency value={deuda}/></p>
                            <p><FormattedMessage id="creditos.fecha_vencimiento"/>: <FrmtedDate value={this.state.selectedContrato.fecha_vencimiento}/></p>
                          </div>
                          <div className={classes.StatusDataContainer}>
                            <p><FormattedMessage id="creditos.vida_credito"/>: {vida_credito}</p>
                            <p><FormattedMessage id="creditos.cartera_vigente"/>: {cartera_vigente}</p>
                            <p><FormattedMessage id="creditos.cartera_vencida"/>: {cartera_vencida}</p>
                          </div>
                          <div className={classes.StatusDetail}>
                           {this.renderStatus(this.state.selectedContrato.estatus_detail)}
                           {this.renderStatus(this.state.selectedContrato.estatus_ejecucion)}
                         </div>
                        </div>)
    }

    if (this.state.selectedContratoPagos) {
      // TODO: cambiar por un PagosList
      pagos = this.state.selectedContratoPagos.map(pago => {
        return (
          <div key={pago.id}>
            <p>{pago.id} - fecha: {pago.fecha_pago} - cantidad: {pago.cantidad}</p>
          </div>
        )
      })
    }

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
      actionButtons = (
          <Button
            clicked={() => {}}
            btnType="Success"
            ><FormattedMessage id="creditos.iniciarContrato"/></Button>
      )
    }

    if (this.props.role === 'Gerente') {
      gerenteButtons = (
        <>
          <Button
            disabled
            clicked={() => {}}
            btnType="Success"
            ><FormattedMessage id="creditos.condonacionButton"/></Button>
          <Button
            disabled
            clicked={() => {}}
            btnType="Success"
            ><FormattedMessage id="creditos.prorrogaButton"/></Button>
        </>
      )
    }

    return (
      <>
        <Modal
          show={this.state.showContratoModal}
          modalClosed={this.cancelSelected}>
          <div className={classes.Container}>
            {contratoStatus}
            <div className={classes.ContentContainer}>
              <div className={classes.InfoContainer}>
                {contrato}
              </div>
              <div className={classes.ButtonGroup}>
                <Button
                  clicked={() => {}}
                  btnType="Success"
                  ><FormattedMessage id="creditos.registrarPago"/></Button>
                {actionButtons}
                {gerenteButtons}
              </div>
            </div>
            {totalPago}
            {pagos}
          </div>
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
