import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  // SVGOverlay,
  Tooltip,
  Marker,
  Polygon,
  Popup,
  LayersControl,
  LayerGroup,
  ZoomControl
} from 'react-leaflet';

import classes from './Sandbox.module.scss'
import axios from '../../../../store/axios-be.js';
import { connect } from 'react-redux';
import icons from './icons'
const { Overlay, BaseLayer } = LayersControl


const center = [17.17, -92.0]
const colores = [
  "#00ff00",
  "#1315a1ff",
  "#aa0000",
  "#555555",
  "#999900",
  "#04bbcc",
  "#aa5533",
  "#079977",
  "#c014f0",
  "#cee713"
]


const getRegionCom = (region, comunidades) => {
  return comunidades.filter(it => it.ubicacion !== null && it.region === region)
    .map(it => {
      const ic = icons[it.region] ? icons[it.region] : icons[11]
      return (
        <Marker key={it.id} position={it.ubicacion} icon={ic}>
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
  const [zona, setZona] = useState(null)
  const [encuesta, setEncuesta] = useState()

  useEffect(() => {
    const authData = {
      headers: { 'Authorization': `Bearer ${props.token}` }
    }
    let tmpZonas
    axios.get('/zonas/' , authData)
      .then(response => {
        tmpZonas = response.data
        const zonasPolygons = tmpZonas.map(z => {
          if (z.poly) {
            const multipoly = z.poly.coordinates.map(pl => pl[0].map(geoIt => [geoIt[1], geoIt[0]]))
            return (
              <Polygon
                key={z.id}
                positions={multipoly}
              >
                <Tooltip sticky>
                  <h5>{z.zona_id} - {z.nombre}</h5>
                  <p>Interzona: {z.interzona}</p>
                </Tooltip>
              </Polygon>
            )
          } else {
            return null
          }
        })
        const encuestaPolygons = tmpZonas.map(z => {
          if (z.poly_encuesta) {
            const multipoly = z.poly_encuesta.coordinates.map(pl => pl[0].map(geoIt => [geoIt[1], geoIt[0]]))
            return (
              <Polygon
                key={z.id}
                positions={multipoly}
                color={"#ec9e19"}
              >
                <Tooltip sticky>
                  <h5>{z.zona_id} - {z.nombre}</h5>
                </Tooltip>
              </Polygon>
            )
          } else {
            return null
          }
        })
        setZona(zonasPolygons)
        setEncuesta(encuestaPolygons)
      })
      .catch(error => {

      })
  }, [props.token])

  useEffect(() => {
    if (
      props.comunidades
      && props.comunidades.length > 0
      && props.regiones
      && props.regiones.length > 0
    ) {
      const localidadesWithGeo = props.regiones.map(region => {
        // const coms_of_region =
        // console.log(`REGION ${region.id} ${region.nombre_de_region} #${coms_of_region.length}`);
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
  //
  useEffect(() => {
    if (props.regiones) {
      setRegiones(props.regiones.map(r => {
        if (r.poly) {
          // console.log(`REGIÓN ${r.nombre_de_region} en ${r.poly.coordinates[0][0]}`);
          return (
            <Polygon
              key={r.id}
              color={colores[+r.id-1]}
              positions={r.poly.coordinates[0].map(geoIt => [geoIt[1], geoIt[0]])}
            >
              <Tooltip>
                <h5>{r.nombre_de_region}</h5>
              </Tooltip>
            </Polygon>
          )
        } else {
          return null
        }
      }))
    }
  }, [props.regiones])

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
            <Overlay name="Regiones Comon">
              <LayerGroup>
                {regiones}
              </LayerGroup>
            </Overlay>
            <Overlay name="Zonas Misión">
              <LayerGroup>
                {zona}
              </LayerGroup>
            </Overlay>
            <Overlay name="Zonas Encuestadas">
              <LayerGroup>
                {encuesta}
              </LayerGroup>
            </Overlay>
          </LayersControl>

        </MapContainer>
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
    token: state.auth.token,
    comunidades: state.generalData.comunidades,
    regiones: state.generalData.regiones
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sandbox, axios)
