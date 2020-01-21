import React, { Component} from 'react';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

import SociosForm from './SociosForm/SociosForm';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import RTable from '../../../components/UI/RTable/RTable';
import SelectColumnFilter from '../../../components/UI/RTable/Filters/SelectColumnFilter';
import Button from '../../../components/UI/Button/Button';
import classes from './Socios.module.css'
import * as actions from '../../../store/actions'
import { baseURL } from '../../../store/axios-be.js'


class Socios extends Component {
  state = {
    socioSeleccionado: false,
    tempSocio: null
  }

  componentDidMount () {
    this.props.onInitSocios(this.props.token)
  }

  componentDidUpdate(prevProps) {
    if(this.props.updated !== prevProps.updated) {
      this.props.onInitSocios(this.props.token)
    }
  }

  showSocio =(id) => {
    this.setState({socioSeleccionado: true});
    this.props.onFetchSelSocios(this.props.token, id)
  }

  cancelSelected =() => {
    this.setState({ socioSeleccionado: false});
    this.props.unSelSocio()
  }

  onNewSocio = () => {
    this.setState({socioSeleccionado: true});
    this.props.onNewSocios()
  }

  getComunidad = (id) => {
    const index = this.props.comunidades.findIndex(x => x.id === id)
    return this.props.comunidades[index].nombre_de_comunidad
  }

  renderStatus = cellInfo => {
    const colors = {
      "AC": "#2bc71b",
      "BA": "#ec573c",
      "NP": "#868a86"
    }

     return (
       <div
        style={{
          borderRadius: "2rem",
          width: "2rem",
          height: "2rem",
          backgroundColor: colors[cellInfo.cell.value] }}
       />
     );
 };

  render () {
    const columns = [
            {
              Header: 'Clave',
              accessor: 'clave_socio',
            },
            {
              Header: 'Nombre',
              accessor: 'nombres',
            },
            {
              Header: 'Apellidos',
              accessor: 'apellidos',
            },
            {
              Header: 'Región',
              accessor: 'region',
              Filter: SelectColumnFilter,
              filter: 'includes',
            },
            {
              Header: 'Comunidad',
              accessor: 'nombre_comunidad',
              Filter: SelectColumnFilter,
              filter: 'includes',
            },
            {
              Header: 'Clave Café',
              accessor: 'clave_anterior',
            },
            {
              Header: 'Café',
              accessor: 'estatus_cafe',
              Cell: this.renderStatus,
              Filter: SelectColumnFilter,
              filter: 'includes',
            },
            {
              Header: 'Miel',
              accessor: 'estatus_miel',
              Cell: this.renderStatus,
              Filter: SelectColumnFilter,
              filter: 'includes',
            },
            {
              Header: 'Jabón',
              accessor: 'estatus_yip',
              Cell: this.renderStatus,
              Filter: SelectColumnFilter,
              filter: 'includes',
            },
            {
              Header: 'Estatus General',
              accessor: 'estatus_gral',
              Cell: this.renderStatus,
              Filter: SelectColumnFilter,
              filter: 'includes',
            },
          ]

      let form = <Spinner/>
      if (this.state.socioSeleccionado && this.props.selSocio) {
        form = (
          <SociosForm/>
        )
      }

    return (
      <>
        <Modal
          show={this.state.socioSeleccionado}
          modalClosed={this.cancelSelected}>
          {form}
        </Modal>
        <div className={classes.Container}>
          <div className={classes.HeaderContainer}>
            <h1><FormattedMessage id="socios.title"/></h1>
            <div className={classes.ButtonContainer}>
              <Button
                clicked={this.onNewSocio}
                ><FormattedMessage id="socios.newSocioButton"/></Button>
            </div>
          </div>

          <button><a href={baseURL + "/sociosXLSX/"}><FormattedMessage id="sociosXLSX"/></a></button>
        <RTable
            columns={columns}
            data={this.props.listaSocios}
            onRowClick={row => this.showSocio(row.values.clave_socio)}
            />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
    return {
      listaSocios: state.socios.socios,
      selSocio: state.socios.selectedSocio,
      updated: state.socios.updated,
      token: state.auth.token,
      comunidades: state.generalData.comunidades
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
      onNewSocios: () => dispatch(actions.newSocio()),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
      unSelSocio: () => dispatch(actions.unSelectSocio())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socios)
