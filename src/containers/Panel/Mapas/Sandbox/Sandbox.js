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
import axios from '../../../../store/axios-be.js';
import { connect } from 'react-redux';
import classes from './Sandbox.module.scss'
import L from 'leaflet'
import r1 from "../../../../assets/Icons/Regions/placeholder.1.svg";
import r2 from "../../../../assets/Icons/Regions/placeholder.2.svg";
import r3 from "../../../../assets/Icons/Regions/placeholder.3.svg";
import r4 from "../../../../assets/Icons/Regions/placeholder.4.svg";
import r5 from "../../../../assets/Icons/Regions/placeholder.5.svg";
import r6 from "../../../../assets/Icons/Regions/placeholder.6.svg";
import r7 from "../../../../assets/Icons/Regions/placeholder.7.svg";
import r8 from "../../../../assets/Icons/Regions/placeholder.8.svg";
import r9 from "../../../../assets/Icons/Regions/placeholder.9.svg";
import r10 from "../../../../assets/Icons/Regions/placeholder.10.svg";
import regionData from '../poligons'
const { Overlay } = LayersControl

const center = [17.17, -92.0]

const icons = {
  '1': new L.Icon({
    iconUrl:  r1,
    iconRetinaUrl: r1,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
  '2': new L.Icon({
    iconUrl:  r2,
    iconRetinaUrl: r2,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
  '3': new L.Icon({
    iconUrl:  r3,
    iconRetinaUrl: r3,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
  '4': new L.Icon({
    iconUrl:  r4,
    iconRetinaUrl: r4,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
  '5': new L.Icon({
    iconUrl:  r5,
    iconRetinaUrl: r5,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
  '6': new L.Icon({
    iconUrl:  r6,
    iconRetinaUrl: r6,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
  '7': new L.Icon({
    iconUrl:  r7,
    iconRetinaUrl: r7,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
  '8': new L.Icon({
    iconUrl:  r8,
    iconRetinaUrl: r8,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
  '9': new L.Icon({
    iconUrl:  r9,
    iconRetinaUrl: r9,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
  '10': new L.Icon({
    iconUrl:  r10,
    iconRetinaUrl: r10,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
  }),
}

const getRegionCom = (region, comunidades) => {
  return comunidades.filter(it => it.ubicacion !== null && it.region === region).map(it => {
            return (
              <Marker position={it.ubicacion} icon={icons[it.region]}>
                <Popup>
                {it.nombre_de_comunidad} <br /> Región {it.nombre_region} <br/> Ermita  {it.ermita} <br/> LocInegi: {it.inegiLocalidad}
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
  const [regiones, setRegiones] = useState(null)

  useEffect(() => {

    if (props.comunidades && props.comunidades.length > 0 &&
      props.regiones && props.regiones.length > 0
    ) {

      const localidadesWithGeo = props.regiones.map(region => {
        return (
          <Overlay checked name={`Region ${region.nombre_de_region}`}>
            <LayerGroup>
              {getRegionCom(region.id, props.comunidades)}
            </LayerGroup>
          </Overlay>
        )
      })

      const localidadesNOGeo = props.comunidades.filter(it => it.ubicacion === null).map(it => {
        if (it.ubicacion === null) {
          return (
            <div className={classes.DataContainer}>
              <h4>Comunidad {it.nombre_de_comunidad}</h4>
              <p className={classes.DataContainer_Texto}>Región {it.nombre_region}</p>
              <p className={classes.DataContainer_Texto}>Ermita  {it.ermita}</p>
            </div>
          )
        }
        return null
      })

      setLocalidades(localidadesWithGeo)
      setLocalSinGeo(localidadesNOGeo)
    }
  }, [props.comunidades, props.regiones])

  // useCallback en vez de esto?? o render normal?
  useEffect(() => {
     setRegiones(regionData.map(r => {
       return (
             <Polygon color={r.color} positions={r.coordinates}>
               <Tooltip>
                 <p>{r.name}</p>
               </Tooltip>
             </Polygon>
           )
    }))
  }, [])

  return (
    <div className={classes.Container}>
      <Map center={center} zoom={10}>
        <LayersControl position="topright">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        {localidades}
        <Overlay name="Polígonos">
          <LayerGroup>
            {regiones}
          </LayerGroup>
        </Overlay>
        </LayersControl>

      </Map>
      <h2 className={classes.Subtitle}>Localidades Ubicadas {localidades && localidades.length}</h2>
      <h2 className={classes.Subtitle}>Localidades sin Ubicar {localSinGeo && localSinGeo.length}</h2>
      {localSinGeo}
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
