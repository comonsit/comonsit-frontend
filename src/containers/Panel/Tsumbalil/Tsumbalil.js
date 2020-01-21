import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

import ComunidadForm from './ComunidadForm/ComunidadForm';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import RTable from '../../../components/UI/RTable/RTable';
import SelectColumnFilter from '../../../components/UI/RTable/Filters/SelectColumnFilter';
import Button from '../../../components/UI/Button/Button';
import classes from './Tsumbalil.module.css'
import * as actions from '../../../store/actions'

class Tsumbalil extends Component {
  state = {
    comunidadSelected: false
  }

  componentDidMount () {
    this.props.fetchGralData(this.props.token)
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.fetchGralData(this.props.token)
    }
  }

  showComunidad =(id) => {
    this.setState({comunidadSelected: true});
    this.props.selectComunidad(id)
  }

  cancelSelected =() => {
    this.setState({ comunidadSelected: false});
    this.props.unSelComunidad()
  }

  onNewComunidad = () => {
    this.setState({ comunidadSelected: true});
    this.props.onNewComunidad()
  }

  render () {
    let form = <Spinner/>

    if (this.state.comunidadSelected && this.props.selComunidad) {
      form = (
        <ComunidadForm/>
      )
    }

    const columns = [
      {
        Header: '# C',
        accessor: 'id',
        Filter: '',
        filter: ''
      },
      {
        Header: <FormattedMessage id="comunidad"/>,
        accessor: 'nombre_de_comunidad'
      },
      {
        Header: '# R',
        accessor: 'region',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: <FormattedMessage id="region"/>,
        accessor: 'nombre_region',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
    ]

    return (
      <>
        <Modal
          show={this.state.comunidadSelected}
          modalClosed={this.cancelSelected}>
          {form}
        </Modal>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1><FormattedMessage id="tsumbalil.title"/></h1>
            <div className={classes.ButtonContainer}>
              <Button
                clicked={this.onNewComunidad}
                ><FormattedMessage id="tsumbalil.newComunidad"/></Button>
            </div>
          </div>
          <RTable
            columns={columns}
            data={this.props.comunidades}
            onRowClick={row => this.showComunidad(row.values.id)}
            />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      comunidades: state.generalData.comunidades,
      updated: state.generalData.updated,
      selComunidad: state.generalData.selectedComunidad,
      token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      selectComunidad: (id) => dispatch(actions.selectComunidad(id)),
      unSelComunidad: () => dispatch(actions.unSelectComunidad()),
      fetchGralData: (token) => dispatch(actions.fetchGralData(token)),
      onNewComunidad: () => dispatch(actions.newComunidad()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tsumbalil)
