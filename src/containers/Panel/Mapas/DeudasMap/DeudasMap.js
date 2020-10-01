import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
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
        let vencidos
        if (selReg.vencidos_count === 0) {
          vencidos = <p>{selReg.vencidos_count} vencidos ${selReg.vencidos_total}</p>
        } else {

          const lt30 = (selReg.vencidosLT30_count > 0) ? <div className={classes.BubVenLT30}>{selReg.vencidosLT30_count} - ${selReg.vencidosLT30_total}</div> : null
          const bt30to6M = (selReg.vencidos30to6M_count > 0) ? <div className={classes.BubVen30to6M}>{selReg.vencidos30to6M_count} - ${selReg.vencidos30to6M_total}</div> : null
          const gt6M = (selReg.vencidosGT6M_count > 0) ? <div className={classes.BubVenGT6M}>{selReg.vencidosGT6M_count} -  ${selReg.vencidosGT6M_total}</div> : null


          vencidos = (
            <>
              <p> {lt30} {bt30to6M} {gt6M}</p>
            </>
          )
        }

        // 2nd option to use Tooltip
        //  <Tooltip
        //    permanent={(selReg.vigentes_total > 0 || selReg.vencidos_total)}
        //    direction={r.toolDirection}
        //  >
        return (
              <Polygon
                color={this.getColor(selReg.vigentes_count, selReg.vencidos_count)}
                positions={r.coordinates}
              >
                <Popup
                  autoClose={false}
                >
                  <p><strong>{r.name}</strong></p>
                  <p>Vigentes:</p>
                  <p><div className={classes.BubVig}>{selReg.vigentes_count} - ${selReg.vigentes_total}</div></p>
                  <p>Vencidos:</p>
                  {vencidos}
                </Popup>
              </Polygon>
            )
     })
    }

    return (
      <div className={classes.Container}>
        <div className={classes.MapContainer}>
          <Map center={center} zoom={10} closePopupOnClick={false}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {regionPoligons}
          </Map>
        </div>
        <div className={classes.Footer}>
          <div>
            <p><div className={classes.regionVerde}>&nbsp;</div> <FormattedMessage id="mapa.regionVerde"/></p>
            <p><div className={classes.regionAmarilla}>&nbsp;</div> <FormattedMessage id="mapa.regionAmarilla"/></p>
            <p><div className={classes.regionRoja}>&nbsp;</div> <FormattedMessage id="mapa.regionRoja"/></p>
            <p><div className={classes.regionGris}>&nbsp;</div> <FormattedMessage id="mapa.regionGris"/></p>
          </div>
          <div>
            <p><div className={classes.BubVig}>-</div> <FormattedMessage id="mapa.vigentes"/></p>
            <p><div className={classes.BubVenLT30}>-</div> <FormattedMessage id="mapa.lt30"/></p>
            <p><div className={classes.BubVen30to6M}>-</div> <FormattedMessage id="mapa.bt30to6M"/></p>
            <p><div className={classes.BubVenGT6M}>-</div> <FormattedMessage id="mapa.gt6M"/></p>
          </div>
        </div>
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
