import React, { useState, useEffect } from 'react';
import {
  Map,
  TileLayer,
  // SVGOverlay,
  Tooltip,
  Marker,
  Polygon,
  Popup,
  LayersControl,
  LayerGroup
} from 'react-leaflet';

import classes from './Sandbox.module.scss'
import axios from '../../../../store/axios-be.js';
import { connect } from 'react-redux';
import icons from './icons'
import regionData from '../poligons'
const { Overlay, BaseLayer } = LayersControl


const center = [17.17, -92.0]


const getRegionCom = (region, comunidades) => {
  return comunidades.filter(it => it.ubicacion !== null && it.region === region)
    .map(it => {
      return (
        <Marker key={it.id} position={it.ubicacion} icon={icons[it.region]}>
          <Popup>
          <p>Comunidad: <strong>{it.nombre_de_comunidad}</strong>  </p>
          <p>Región: <strong>{it.nombre_region}</strong> </p>
          <p>Ermita  <strong>{it.ermita}</strong> </p>
          <p>LocInegi: <strong>{it.inegiLocalidad}</strong></p>
          </Popup>
        </Marker>
      )
      // return (
      //   <SVGOverlay bounds={[it.ubicacion, it.ubicacion.map(it => it+.02)]} viewBox="0 0 10 10">
      //     <rect x="0" y="0" width="100%" height="100%" fill={iconColors[it.region]}/>
      //     <text x="100%" y="100%" fill="white">
      //       {it.nombre_region} <br /> Región {it.region}
      //     </text>
      //   </SVGOverlay>
      // )
    })
}


const Sandbox = (props) => {
  const [localidades, setLocalidades] = useState(null)
  const [localSinGeo, setLocalSinGeo] = useState(null)
  const [localSinErmita, setLocalSinErmita] = useState(null)
  const [regiones, setRegiones] = useState(null)
  const [cuenta, setCuenta] = useState({total: 0, asignadas: 0, sinErmita: 0, sinInegi: 0})

  useEffect(() => {
    if (
      props.comunidades
      && props.comunidades.length > 0
      && props.regiones
      && props.regiones.length > 0
    ) {
      const localidadesWithGeo = props.regiones.map(region => {
        return (
          <Overlay key={region.id} checked name={`Region ${region.nombre_de_region}`}>
            <LayerGroup>
              {getRegionCom(region.id, props.comunidades)}
            </LayerGroup>
          </Overlay>
        )
      })

      const localidadesNOGeo = props.comunidades
        .filter(it => it.ermita !== null && it.ubicacion === null)
        .map(it => {
          if (it.ubicacion === null) {
            return (
              <div key={it.id} className={classes.DataContainer}>
                <h5>Comunidad {it.nombre_de_comunidad} - Región {it.nombre_region} - Ermita  {it.ermita}</h5>
              </div>
            )
          }
          return null
        })
      const localidadesNOErmita = props.comunidades
        .filter(it => it.ermita === null)
        .map(it => {
          if (it.ubicacion === null) {
            return (
              <div key={it.id} className={classes.DataContainer}>
                <h5>Comunidad {it.nombre_de_comunidad} - Región {it.nombre_region}</h5>
              </div>
            )
          }
          return null
        })

      setLocalidades(localidadesWithGeo)
      setLocalSinGeo(localidadesNOGeo)
      setLocalSinErmita(localidadesNOErmita)
      setCuenta({
          total: props.comunidades.length,
          asignadas: props.comunidades.length - localidadesNOGeo.length - localidadesNOErmita.length,
          sinErmita: localidadesNOErmita.length,
          sinInegi: localidadesNOGeo.length
        })
    }
  }, [props.comunidades, props.regiones])

  // useCallback en vez de esto?? o render normal?
  useEffect(() => {
     setRegiones(regionData.map(r => {
       return (
             <Polygon key={r.id} color={r.color} positions={r.coordinates}>
               <Tooltip>
                 <p>{r.name}</p>
               </Tooltip>
             </Polygon>
           )
    }))
  }, [])

  return (
    <div>
      <div className={classes.Container}>
        <Map center={center} zoom={10} scrollWheelZoom={false}>
          <LayersControl position="topright">
            <BaseLayer checked name="General">
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            <BaseLayer name="General 2">
              <TileLayer
                attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=af769fd7fa0d4afe8692e33802d311e5'
              />
            </BaseLayer>
            <BaseLayer name="Satelital">
              <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              />
            </BaseLayer>

            <BaseLayer name="Topográfico">
              <TileLayer
                attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>

            {localidades}
            <Overlay name="Polígonos">
              <LayerGroup>
                {regiones}
              </LayerGroup>
            </Overlay>
          </LayersControl>

        </Map>
      </div>
      <div className={classes.Container}>
        <h2 className={classes.Subtitle}>Comunidades Ubicadas {cuenta.asignadas}</h2>
        <h2 className={classes.Subtitle}>Comunidades Sin Ermita {cuenta.sinErmita}</h2>
        <h2 className={classes.Subtitle}>Comunidades Sin INEGI {cuenta.sinInegi}</h2>
        <hr/>
        <h2 className={classes.Subtitle}>LISTADO de Comunidades Sin Ermita</h2>
        {localSinErmita}
        <hr/>
        <h2 className={classes.Subtitle}>LISTADO de Comunidades sin INEGI</h2>
        {localSinGeo}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    comunidades: state.generalData.comunidades,
    regiones: state.generalData.regiones
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sandbox, axios)
