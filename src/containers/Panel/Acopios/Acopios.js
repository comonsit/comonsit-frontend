import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import classes from './Acopios.module.css'
import { connect } from 'react-redux';

import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import RTable from '../../../components/UI/RTable/RTable';
import SelectColumnFilter from '../../../components/UI/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../components/UI/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../components/UI/RTable/Filters/FilterGreaterThan';
import * as actions from '../../../store/actions'


class Acopios extends Component {
  state = {
    acopioSelected: false
  }

  componentDidMount () {
    this.props.onInitAcopios(this.props.token)
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.onInitAcopios(this.props.token)
    }
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
    // console.log('ACOPIO FORM')
    this.props.history.push('acopio-formato');
    this.props.onNewAcop()
  }

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

    return (
      <>
        <Modal
          show={this.state.acopioSelected}
          modalClosed={this.cancelSelected}>
        </Modal>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1><FormattedMessage id="acopios.title"/></h1>
            <div className={classes.ButtonContainer}>
              <Button
                clicked={this.onNewAcopio}
                ><FormattedMessage id="acopios.newAcopio"/></Button>
            </div>
          </div>
          <RTable
            columns={columns}
            data={this.props.listaAcopios}
            onRowClick={row => this.showAcopio(row.values.id)}
            />
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
