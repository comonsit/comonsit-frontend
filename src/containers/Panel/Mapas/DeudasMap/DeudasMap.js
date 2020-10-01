import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Map,
  Polygon,
  TileLayer,
  Popup
} from 'react-leaflet';
import axios from '../../../../store/axios-be.js';
import classes from './DeudasMap.module.scss'
import regionData from '../poligons'

const center = [17.10, -92.05]


class DeudasMap extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      regiones: null,
      loading: false,
    }
    this.onGetCarteras()
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

  getColor = (vigentes, vencidos) => {
    // GRAY No credits in execution
    if (vigentes + vencidos === 0) {
      return '#a1a2a1'
    }
    // GREEN Only valid credits
    if (vencidos === 0 && vigentes > 0) {
      return '#47cb15'
    }
    // RED Mode due than valid
    if (vencidos > vigentes && vencidos > 2) {
      return '#d42e11'
    }
    // YELLOW other cases
    return '#e1e42a'
  }

  render() {

    let regionPoligons = null
    if (this.state.regiones) {
      regionPoligons = regionData.map(r => {
        const selReg = this.state.regiones.find(el => el.region === r.id)

        return (
              <Polygon
                color={this.getColor(selReg.vigentes_count, selReg.vencidos_count)}
                positions={r.coordinates}
              >
                <Popup autoClose={false}>
                  <p>{r.name}</p>
                  <p>{selReg.vigentes_count} vigentes por ${selReg.vigentes_total}</p>
                  <p>{selReg.vencidos_count} vencidos por ${selReg.vencidos_total}</p>
                </Popup>
              </Polygon>
            )
     })
    }

    return (
      <div className={classes.Container}>
        <Map center={center} zoom={10} closePopupOnClick={false}>
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
