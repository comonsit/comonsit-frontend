import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Map,
  Polygon,
  TileLayer,
  Tooltip,
} from 'react-leaflet';
import axios from '../../../../store/axios-be.js';
import classes from './DeudasMap.module.scss'
import regionData from '../poligons'

const center = [17.10, -92.15]

// const datosLimpios = datos.features.map(e => {
//   return {
//     name: e.properties.name,
//     color: e.properties.fill,
//     coordinates: e.geometry.coordinates[0].map(latLon => latLon.reverse())
//   }
// })


class DeudasMap extends Component<{}, { clicked: number }> {
  constructor(props) {
    super(props);
    this.state =  {
      regiones: null,
      loading: false,
    }
    this.onGetCarteras()
  }

  onClickCircle = () => {
    this.setState({ clicked: this.state.clicked + 1 })
  }

  onGetCarteras = () => {
    const authData = {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }
    this.setState({ loading: true })
    axios.get('/contratos/carteras-per-region/' , authData)
      .then(response => {
        this.setState({
          regiones: response.data,
          loading: false,
        })
      })
      .catch(error => {
        this.setState({
          regiones: null,
          loading: false,
        })
        // TODO: FALTA!!
      })

  }

  render() {

    let regionPoligons = null
    if (this.state.regiones) {
      regionPoligons = regionData.map(r => {
        const selReg = this.state.regiones.find(el => el.region === r.id)
        const tooltip = (<Tooltip permanent={(selReg.vigentes_total > 0 || selReg.vencidos_total)}>
            <p>{r.name}</p>
            <p>{selReg.vigentes_count} vigentes por ${selReg.vigentes_total}</p>
            <p>{selReg.vencidos_count} vencidos por ${selReg.vencidos_total}</p>
          </Tooltip>)
        // }
        return (
              <Polygon color={r.color} positions={r.coordinates}>
                {tooltip}
              </Polygon>
            )
     })
    }

    return (
      <div className={classes.Container}>
        <Map center={center} zoom={11}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {regionPoligons}
        </Map>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeudasMap, axios)
