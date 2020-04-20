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
    oldCreditos: false
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
  }

  cancelSelected =() => {
    this.setState({
      showContratoModal: false,
      selectedContrato: null
    });
  }

  renderStatus = value => {
    const cellClasses= [classes.CellStatus]
    cellClasses.push(classes[value])
    return (<div className={cellClasses.join(' ')}><FormattedMessage id={'creditos.status.'+value}/></div>)
 }

  render () {
    let contrato, contratoStatus = <Spinner/>
    let downloadXLSButton = null
    const columns = [
      {
        Header: '#',
        accessor: 'folio',
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
      contrato = <ContratoDetail contrato={this.state.selectedContrato}/>
      const deuda = this.state.selectedContrato.deuda_al_dia ? (<p><FormattedMessage id="creditos.deuda_al_dia"/> <IntlProvider locale='en'><FormattedNumber value={this.state.selectedContrato.deuda_al_dia.total} style="currency" currency="USD"/></IntlProvider></p>) : null
      contratoStatus = (<div className={classes.StatusContainer}>
                          <div className={classes.SubStatusContainer}>
                            {deuda}
                            <p><FormattedMessage id="creditos.fecha_vencimiento"/>: <FrmtedDate value={this.state.selectedContrato.fecha_vencimiento}/></p>
                          </div>
                          <div className={classes.StatusDetail}>
                           {this.renderStatus(this.state.selectedContrato.estatus_detail)}
                         </div>
                        </div>)
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
        </div>
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
                  ><FormattedMessage id="creditos.condonacionButton"/></Button>
                <Button
                  clicked={() => {}}
                  btnType="Success"
                  ><FormattedMessage id="creditos.prorrogaButton"/></Button>
                <Button
                  clicked={() => {}}
                  btnType="Success"
                  ><FormattedMessage id="creditos.imprimirContratoButton"/></Button>
                <Button
                  clicked={() => {}}
                  btnType="Success"
                  ><FormattedMessage id="creditos.iniciarContrato"/></Button>
                <Button
                  clicked={() => {}}
                  btnType="Success"
                  ><FormattedMessage id="creditos.datosCobro"/></Button>
                <Button
                  clicked={() => {}}
                  btnType="Success"
                  ><FormattedMessage id="creditos.registrarPago"/></Button>
            </div>
          </div>
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
              onRowClick={(row) => this.showContrato(row.values.folio)}
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
