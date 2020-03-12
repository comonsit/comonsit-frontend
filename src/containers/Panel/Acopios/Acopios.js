import React, { Component } from 'react';
import FileSaver from 'file-saver';
import {FormattedMessage} from 'react-intl';
import {
  XYPlot,
  XAxis,
  YAxis,
  DiscreteColorLegend,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  Hint
} from 'react-vis';
import classes from './Acopios.module.css'
import { connect } from 'react-redux';
import Bee from '../../../Icons/Bee.js';
import Money from '../../../Icons/Money.js';
import Soap from '../../../Icons/Soap.js';
import Coffee from '../../../Icons/Coffee.js';

import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import RTable from '../../../components/UI/RTable/RTable';
import Title from '../../../components/UI/Title/Title';
import SelectColumnFilter from '../../../components/UI/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../components/UI/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../components/UI/RTable/Filters/FilterGreaterThan';
import * as actions from '../../../store/actions'
import { isGerencia } from '../../../store/roles'
import axios from '../../../store/axios-be.js'


class Acopios extends Component {
  state = {
    acopioSelected: false,
    coffeeData: [],
    honeyData: [],
    soapData: [],
    salarioData: [],
    hint: null
  }

  componentDidMount () {
    this.props.onInitAcopios(this.props.token)
    this.getYearSum()
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.onInitAcopios(this.props.token)
    }
  }

  getYearSum = () => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    axios.get('/acopios/year_sum/', authData)
      .then(response => {
        this.populateYearSum(response.data)
      })
      .catch(error => {
        // TODO:
      })
  }

  populateYearSum = data => {
    const cData = []
    const hData = []
    const soData = []
    const saData = []

    for (let yearData of data) {
      cData.push({x: yearData.fecha__year, y: yearData.year_sum_cf})
      hData.push({x: yearData.fecha__year, y: yearData.year_sum_mi})
      soData.push({x: yearData.fecha__year, y: yearData.year_sum_ja})
      saData.push({x: yearData.fecha__year, y: yearData.year_sum_sl})
    }

    this.setState({
      coffeeData: cData,
      honeyData: hData,
      soapData: soData,
      salarioData: saData,
    })
  }

  showAcopio =(id) => {
    this.setState({acopioSelected: true});
    // this.props.selectAcopio(id)
  }

  cancelSelected =() => {
    this.setState({ acopioSelected: false});
    // this.props.unSelAcopio()
  }

  onNewAcopio = () => {
    this.setState({ acopioSelected: true});
    this.props.history.push('acopio-formato');
    this.props.onNewAcop()
  }

  getXLSX = type => {
    const url = (type) ? '/acopiosXLSX/?tipo_de_producto='+type : '/acopiosXLSX/'
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

  _forgetValue = () => {
    this.setState({
      hint: null
    });
  };

  _rememberValue = value => {
    this.setState({hint: value});
  };

  renderStatus = cellInfo => {

    switch(cellInfo.cell.value) {
      case "CF": return (<Coffee width="20px" height="20px" />)
      case "MI": return (<Bee width="20px" height="20px" />)
      case "JA": return (<Soap width="20px" height="20px" />)
      case "SL": return (<Money style={{color: "green"}} width="20px" height="20px" />)
      default:
        return (<p>?{cellInfo.cell.value}</p>)
    }
 };

  render () {

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
        filter: 'includes',
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
        Filter: SliderColumnFilter,
        filter: filterGreaterThan
      },
      {
        Header: <FormattedMessage id="ingreso"/>,
        accessor: 'ingreso',
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
      downloadXLSButton = (
        <nav className={classes.LangDropdownNav}>
          <ul className={classes.LangDropdownList}>
           <li className={classes.LangDropdownListItem}><FormattedMessage id="acopiosXLSX"/> ▼
            <ul className={classes.Dropdown}>
              <li><button type="button" onClick={() => this.getXLSX('')}>Todos</button></li>
              <li><button type="button" onClick={() => this.getXLSX('CF')}>Café</button></li>
              <li><button type="button" onClick={() => this.getXLSX('MI')}>Miel</button></li>
              <li><button type="button" onClick={() => this.getXLSX('JA')}>Jabón</button></li>
              <li><button type="button" onClick={() => this.getXLSX('SL')}>Salarios</button></li>
            </ul>
           </li>
         </ul>
        </nav>
        )
    }

    return (
      <>
        <Modal
          show={this.state.acopioSelected}
          modalClosed={this.cancelSelected}>
        </Modal>
        <div>
          <Title
            titleName="acopios.title">
            <Button
              clicked={this.onNewAcopio}
              ><FormattedMessage id="acopios.newAcopio"/></Button>
          </Title>
          <div className={classes.AllGraphs}>
            <XYPlot yDomain={[0, 5000]} xType="ordinal"  width={600} height={300} className={classes.Graphs}>
              <DiscreteColorLegend
                style={{position: 'absolute', left: '50px', top: '10px'}}
                orientation="horizontal"
                items={[
                  {
                    title: 'Café',
                    color: '#92c3c0'
                  },
                  {
                    title: 'Miel',
                    color: '#D5B49E'
                  },
                  {
                    title: 'Jabones',
                    color: '#ac92c3'
                  },
                  {
                    title: 'Salarios',
                    color: '#BBC392'
                  }
                ]}
              />
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis tickPadding={0} />
              <VerticalBarSeries
                data={this.state.coffeeData}
                color="#92c3c0"
                onValueMouseOver={this._rememberValue}
                onValueMouseOut={this._forgetValue}
                />
              <VerticalBarSeries data={this.state.honeyData} color="#D5B49E" />
              <VerticalBarSeries data={this.state.soapData} color="#ac92c3" />
              <VerticalBarSeries data={this.state.salarioData} color="#BBC392" />
              {this.state.hint ? (<Hint value={this.state.hint}>
                                    <div style={{background: '#656564', padding: '.5rem', borderRadius: "1rem"}}>
                                      <p style={{fontSize: ".8em"}}>En {this.state.hint.x} se acopiaron ${this.state.hint.y} de café</p>
                                    </div>
                                  </Hint> ): null}
            </XYPlot>
      </div>
      <div>
          {downloadXLSButton}
          <RTable
            columns={columns}
            data={this.props.listaAcopios}
            onRowClick={row => this.showAcopio(row.values.id)}
            />
        </div>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      // selectedAcopio: state.acopios.selectedAcopio,
      listaAcopios: state.acopios.acopios,
      token: state.auth.token,
      role: state.generalData.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitAcopios: (token) => dispatch(actions.initAcopios(token)),
      onNewAcop: () => dispatch(actions.newAcopio()),
      // onFetchSelAcopio: (token, solId) => dispatch(actions.fetchSelAcopio(token, acopioId)),
      // unSelAcopio: () => dispatch(actions.unSelectAcopio())
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(Acopios)
