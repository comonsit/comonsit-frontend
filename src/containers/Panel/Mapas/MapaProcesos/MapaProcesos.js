import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  MapContainer,
  Popup,
  LayersControl,
  LayerGroup,
  ZoomControl,
  FeatureGroup,
  Circle
} from 'react-leaflet';

import MapLayers from '../MapLayers/MapLayers'
import classes from './MapaProcesos.module.scss'
import axios from '../../../../store/axios-be.js';
import { connect } from 'react-redux';
const { Overlay } = LayersControl


const center = [17.17, -92.0]

const MapaMision = (props) => {
  const [sociosCafe, setSociosCafe] = useState(null)
  const [sociosMiel, setSociosMiel] = useState(null)
  const [sociosJabon, setSociosJabon] = useState(null)
  const [sociosTrabajadores, setSociosTrabajadores] = useState(null)

  useEffect(() => {
    const authData = {
      headers: { 'Authorization': `Bearer ${props.token}` }
    }
    axios.get('/comunidades/num-socios/' , authData)
      .then(response => {
        const coms = response.data.filter(it => it.ubicacion !== null)
        const cafe = coms.filter(it => it.num_socios_cf > 0)
            .map(it => {
                return (
                    <FeatureGroup key={it.id} pathOptions={{ fillColor: 'blue' }}>
                        <Popup>{it.nombre_de_comunidad} <FormattedMessage id="socios.cafe"/>{it.num_socios_cf}</Popup>
                        <Circle 
                            center={it.ubicacion} 
                            radius={parseInt(it.num_socios_cf)*80} 
                        />
                    </FeatureGroup>
                )
            })
        const miel = coms.filter(it => it.num_socios_mi > 0)
            .map(it => {
                return (
                    <FeatureGroup key={it.id} pathOptions={{ color: 'orange', fillColor: 'orange' }}>
                        <Popup>{it.nombre_de_comunidad} <FormattedMessage id="socios.miel"/>:{it.num_socios_mi}</Popup>
                        <Circle 
                            center={it.ubicacion} 
                            radius={parseInt(it.num_socios_mi)*80} 
                        />
                    </FeatureGroup>
                )
            })

        const jabon = coms.filter(it => it.num_socios_ja > 0)
            .map(it => {
                return (
                    <FeatureGroup key={it.id} pathOptions={{ color: 'purple', fillColor: 'purple' }}>
                        <Popup>{it.nombre_de_comunidad} <FormattedMessage id="socios.jabon"/>:{it.num_socios_ja}</Popup>
                        <Circle 
                            center={it.ubicacion} 
                            radius={parseInt(it.num_socios_ja)*80} 
                        />
                    </FeatureGroup>
                )
            })
 
        const trabajadores = coms.filter(it => it.num_socios_sl > 0)
            .map(it => {
                return (
                    <FeatureGroup key={it.id} pathOptions={{ color: 'green', fillColor: 'green' }}>
                        <Popup>{it.nombre_de_comunidad} <FormattedMessage id="socios.trabajador"/>:{it.num_socios_sl}</Popup>
                        <Circle 
                            center={it.ubicacion} 
                            radius={parseInt(it.num_socios_sl)*80} 
                        />
                    </FeatureGroup>
                )
            })            

        setSociosCafe(cafe)
        setSociosMiel(miel)
        setSociosJabon(jabon)
        setSociosTrabajadores(trabajadores)
      })
      .catch(error => {

      })
  }, [props.token])

  return (
    <div>
      <div className={classes.Container}>
        <MapContainer
          center={center}
          zoom={10}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <ZoomControl position="bottomright"/>
          <MapLayers>
            <Overlay checked name="Socios Activos Café">
              <LayerGroup>
                {sociosCafe}
              </LayerGroup>
            </Overlay>
            <Overlay name="Socios Activos Miel">
              <LayerGroup>
                {sociosMiel}
              </LayerGroup>
            </Overlay>
            <Overlay name="Socios Activos Jabón">
              <LayerGroup>
                {sociosJabon}
              </LayerGroup>
            </Overlay>
            <Overlay name="Socios Activos Trabajadores">
              <LayerGroup>
                {sociosTrabajadores}
              </LayerGroup>
            </Overlay>
          </MapLayers>
        </MapContainer>
      </div>
      <div className={classes.Container}>
          <h1><FormattedMessage id="pmenu.mapaProcesos"/></h1>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapaMision, axios)
