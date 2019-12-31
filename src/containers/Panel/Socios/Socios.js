import React, { Component} from 'react';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

import SociosForm from './SociosForm/SociosForm';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import RTable from '../../../components/UI/RTable/RTable';
import Button from '../../../components/UI/Button/Button';
import classes from './Socios.module.css'
import * as actions from '../../../store/actions'


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

  render () {
    const columns = [
            {
              Header: 'Nombre',
              accessor: 'nombres',
            },
            {
              Header: 'Apellidos',
              accessor: 'apellidos',
            },
            {
              Header: 'Clave',
              accessor: 'clave_socio',
            },
            {
              Header: 'Comunidad',
              accessor: 'comunidad',
            },
            {
              Header: 'Región',
              accessor: 'region',
            },
            {
              Header: 'Café',
              accessor: 'estatus_cafe',
            },
            {
              Header: 'Miel',
              accessor: 'estatus_miel',
            },
            {
              Header: 'Jabón',
              accessor: 'estatus_yip',
            },
            {
              Header: 'Estatus General',
              accessor: 'estatus_gral',
            },
          ]
      //
      // const colors = {
      //   'AC': "Green",
      //   'BA': "Red",
      //   'NP': "Gray"
      // }
      // const coloredColumns = {
      //   "socios.cafe": colors,
      //   "socios.miel": colors,
      //   "socios.jabon": colors,
      //   "socios.general": colors
      // }
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
