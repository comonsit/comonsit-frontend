import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  MapContainer,
  Polygon,
  TileLayer,
  Popup,
  ZoomControl
} from 'react-leaflet';

import classes from './DeudasMap.module.scss'
import axios from '../../../../store/axios-be.js';


const center = [17.10, -92.05]


class DeudasMap extends Component {
  state =  {
    regiones_debt: null,
    loading: false,
  }

  componentDidMount() {
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
          regiones_debt: response.data,
          loading: false,
        })
      })
      .catch(error => {
        this.setState({
          regiones_debt: null,
          loading: false,
        })
        // TODO: FALTA!!
      })

  }

  getColor = (vigentes, vencidos) => {
    // GRAY No credits in execution
    if (vigentes + vencidos === 0) {
      return classes.gray
    }
    // GREEN Only valid credits
    if (vencidos === 0 && vigentes > 0) {
      return classes.green
    }
    // RED Mode due than valid
    if (vencidos > vigentes) {
      return classes.red
    }
    // YELLOW other cases
    return classes.yellow
  }

  render() {
    let regionPoligons = null
    if (this.state.regiones_debt && this.props.regiones) {
      regionPoligons = this.props.regiones.map(r => {
        if (r.poly) {
          const selReg = this.state.regiones_debt.find(el => el.region === r.id)
          let vencidos
          if (selReg.vencidos_count === 0) {
            vencidos = <p>{selReg.vencidos_count} vencidos ${selReg.vencidos_total}</p>
          } else {

            const lt30 = (selReg.vencidosLT30_count > 0)
              ? (
                  <div className={classes.BubVenLT30}>
                    {selReg.vencidosLT30_count} - ${selReg.vencidosLT30_total}
                  </div>
                )
              : null
            const bt30to6M = (selReg.vencidos30to6M_count > 0)
              ? (
                  <div className={classes.BubVen30to6M}>
                    {selReg.vencidos30to6M_count} - ${selReg.vencidos30to6M_total}
                  </div>
                )
              : null
            const gt6M = (selReg.vencidosGT6M_count > 0)
              ? (
                  <div className={classes.BubVenGT6M}>
                    {selReg.vencidosGT6M_count} -  ${selReg.vencidosGT6M_total}
                  </div>
                )
              : null


            vencidos = <div className={classes.Parr}> {lt30} {bt30to6M} {gt6M}</div>
          }

          // 2nd option to use Tooltip
          //  <Tooltip
          //    permanent={(selReg.vigentes_total > 0 || selReg.vencidos_total)}
          //    direction={r.toolDirection}
          //  >
          return (
            <Polygon
              key={r.id}
              color={this.getColor(selReg.vigentes_count, selReg.vencidos_count)}
              positions={r.poly.coordinates[0].map(geoIt => [geoIt[1], geoIt[0]])}
            >
              <Popup
                autoClose={false}
              >
                <div className={classes.Parr}>
                  <strong>{r.nombre_de_region}</strong>
                </div>
                <div className={classes.Parr}>
                  Vigentes:
                </div>
                <div className={classes.Parr}>
                  <div className={classes.BubVig}>
                    {selReg.vigentes_count} - ${selReg.vigentes_total}
                  </div>
                </div>
                <div className={classes.Parr}>
                  Vencidos:
                </div>
                {vencidos}
              </Popup>
            </Polygon>
          )
        } else {
          return null
        }
      })
    }

    return (
      <div className={classes.Container}>
        <div className={classes.MapContainer}>
          <MapContainer
            center={center}
            zoom={10}
            closePopupOnClick={false}
            scrollWheelZoom={false}
            zoomControl={false}
          >
            <ZoomControl position="bottomright"/>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {regionPoligons}
          </MapContainer>
        </div>
        <div className={classes.Footer}>
          <div className={classes.region}>
            <div className={classes.Parr}>
              <div className={classes.regionVerde}>
                &nbsp;
              </div>
              &nbsp;<FormattedMessage id="mapa.regionVerde"/>
            </div>
            <div className={classes.Parr}>
              <div className={classes.regionAmarilla}>
                &nbsp;
              </div>
              &nbsp;<FormattedMessage id="mapa.regionAmarilla"/>
            </div>
            <div className={classes.Parr}>
              <div className={classes.regionRoja}>
                &nbsp;
              </div>
              &nbsp;<FormattedMessage id="mapa.regionRoja"/>
            </div>
            <div className={classes.Parr}>
              <div className={classes.regionGris}>
                &nbsp;
              </div>
              &nbsp;<FormattedMessage id="mapa.regionGris"/>
            </div>
          </div>
          <div>
            <div className={classes.Parr}>
              <div className={classes.BubVig}>-</div>
              &nbsp;<FormattedMessage id="mapa.vigentes"/>
            </div>
            <div className={classes.Parr}>
              <div className={classes.BubVenLT30}>-</div>
              &nbsp;<FormattedMessage id="mapa.lt30"/>
            </div>
            <div className={classes.Parr}>
              <div className={classes.BubVen30to6M}>-</div>
              &nbsp;<FormattedMessage id="mapa.bt30to6M"/>
            </div>
            <div className={classes.Parr}>
              <div className={classes.BubVenGT6M}>-</div>
              &nbsp;<FormattedMessage id="mapa.gt6M"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    regiones: state.generalData.regiones
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeudasMap, axios)
