import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';

import SociosForm from './SociosForm/SociosForm';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Table from '../../../components/UI/Table/Table';
import Button from '../../../components/UI/Button/Button';
import classes from './Socios.module.css'
import * as actions from '../../../store/actions'

class Socios extends Component {
  state = {
    socioSeleccionado: false,
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

  onToggleEditable = () => {
    this.setState(prevState => {
        return {editable: !prevState.editable}
    })
  }

  onNewSocio = () => {

  }

  getComunidad = (id) => {
    const index = this.props.comunidades.findIndex(x => x.id === id)
    return this.props.comunidades[index].nombre_de_comunidad
  }

  render () {
    const sociosHeaders = ["socios.clave", "socios.nombre", "socios.comunidad", "socios.region", "socios.ingreso-ya", "socios.cafe", "socios.miel", "socios.jabon", "socios.general"]
    const colors = {
      'AC': "Green",
      'BA': "Red",
      'NP': "Gray"
    }
    const coloredColumns = {
      "socios.cafe": colors,
      "socios.miel": colors,
      "socios.jabon": colors,
      "socios.general": colors
    }
    let socioTableData
    let form = <Spinner/>

    if (this.props.listaSocios && this.props.comunidades) {
      socioTableData = this.props.listaSocios.map((s, i) => {
        return {
          "socios.clave": s.clave_socio,
          "socios.nombre": s.nombres +' '+ s.apellidos,
          "socios.comunidad": s.comunidad ? this.getComunidad(s.comunidad) : "",
          "socios.region": s.region ? s.region : "",
          "socios.ingreso-ya": s.fecha_ingr_yomol_atel,
          "socios.cafe": s.estatus_cafe,
          "socios.miel": s.estatus_miel,
          "socios.jabon": s.estatus_yip ,
          "socios.general": s.estatus_gral
        }
      })
    }

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
          <Table
            headers={sociosHeaders}
            data={socioTableData}
            clicked={this.showSocio}
            clickId={"socios.clave"}
            colors={coloredColumns}
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
      comunidades: state.auth.comunidades
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitSocios: (token) => dispatch(actions.initSocios(token)),
      onFetchSelSocios: (token, socioId) => dispatch(actions.fetchSelSocio(token, socioId)),
      unSelSocio: () => dispatch(actions.unSelectSocio())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socios)
