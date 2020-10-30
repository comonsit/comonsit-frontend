import React, { Component } from 'react';
import FileSaver from 'file-saver';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// import classes from './Acopios.module.scss'
import Bee from '../../../Icons/Bee.js';
import Money from '../../../Icons/Money.js';
import Soap from '../../../Icons/Soap.js';
import Coffee from '../../../Icons/Coffee.js';
import AcopiosGraphs from './AcopiosGraphs/AcopiosGraphs';
import Button from '../../../components/UI/Button/Button';
import HoverButton from '../../../components/UI/HoverButton/HoverButton';
import RTable from '../../../components/Tables/RTable/RTable';
import Title from '../../../components/UI/Title/Title';
import Card from '../../../components/UI/Card/Card';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Currency from '../../../components/UI/Formatting/Currency';
import FrmtedDate from '../../../components/UI/Formatting/FrmtedDate';
import SelectColumnFilter from '../../../components/Tables/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../components/Tables/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../components/Tables/RTable/Filters/FilterGreaterThan';
import * as actions from '../../../store/actions'
import { isGerencia } from '../../../store/roles'
import axios from '../../../store/axios-be.js'


class Acopios extends Component {
  state = {
    coffeeData: [],
    honeyData: [],
    soapData: [],
    salarioData: []
  }

  componentDidMount() {
    this.props.onInitAcopios(this.props.token)
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.onInitAcopios(this.props.token)
    }
  }

  // TODO: delete?
  showAcopio = id => {
    // this.setState({acopioSelected: true});
    // this.props.selectAcopio(id)
  }

  cancelSelected = () => {
    this.setState({ acopioSelected: false});
    // this.props.unSelAcopio()
  }

  onNewAcopio = () => {
    this.setState({ acopioSelected: true});
    this.props.history.push('acopio-formato');
    this.props.onNewAcop()
  }

  getXLSX = type => {
    type = type === 'ALL' ? '' : type
    const url = type ? '/acopiosXLSX/?tipo_de_producto='+type : '/acopiosXLSX/'
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` },
      responseType: 'blob',
    }
    axios.get(url, authData)
      .then(response => {
        FileSaver.saveAs(response.data, 'acopios'+type+'.xlsx')
      })
      .catch(error => {
        // TODO:
      })
  }

  renderStatus = cellInfo => {
    switch(cellInfo.cell.value) {
      case "CF": return (<Coffee fill="#243746" width="18px" height="18px"/>)
      case "MI": return (<Bee fill="#243746" width="20px" height="20px"/>)
      case "JA": return (<Soap fill="#243746" width="20px" height="20px"/>)
      case "SL": return (<Money fill="#243746" width="20px" height="20px" />)
      default:
        return (<p>?{cellInfo.cell.value}</p>)
    }
 };

  render() {
    const columns = [
      {
        Header: '#',
        accessor: 'id',
        Filter: '',
        filter: ''
      },
      {
        Header: <FormattedMessage id="clave"/>,
        accessor: 'clave_socio',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: <FormattedMessage id="nombres"/>,
        accessor: 'nombre_socio'
      },
      {
        Header: <FormattedMessage id="region"/>,
        accessor: 'region',
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: <FormattedMessage id="comunidad"/>,
        accessor: 'comunidad',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: <FormattedMessage id="fecha"/>,
        accessor: 'fecha',
        Cell: (cellInfo) => <FrmtedDate value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="ingreso"/>,
        accessor: 'ingreso',
        Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="acopios.tipo_producto"/>,
        accessor: 'tipo_de_producto',
        Cell: this.renderStatus,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: <FormattedMessage id="kilos"/>,
        accessor: 'kilos_de_producto',
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
    ]

    let downloadXLSButton = null

    if (isGerencia(this.props.role)) {
      const processList = ['ALL', 'CF', 'MI', 'JA', 'SL']
      downloadXLSButton = (
        <HoverButton
          title="acopiosXLSX"
          items={processList}
          clicked={this.getXLSX}
        />
      )
    }

    const table = (this.props.listaAcopios)
      ? (
          <RTable
            columns={columns}
            data={this.props.listaAcopios}
            onRowClick={row => this.showAcopio(row.values.id)}
          />
        )
      : <Spinner/ >

    if (this.props.listaAcopios) {

    }

    return (
      <>
        <Title
          titleName="acopios.title">
          <Button clicked={this.onNewAcopio}>
            <FormattedMessage id="acopios.newAcopio"/>
          </Button>
        </Title>
        <Card>
          <AcopiosGraphs/>
        </Card>
        <Card table >
          {downloadXLSButton}
          {table}
      </Card>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    listaAcopios: state.acopios.acopios,
    token: state.auth.token,
    role: state.generalData.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitAcopios: (token) => dispatch(actions.initAcopios(token)),
    onNewAcop: () => dispatch(actions.newAcopio()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Acopios)
