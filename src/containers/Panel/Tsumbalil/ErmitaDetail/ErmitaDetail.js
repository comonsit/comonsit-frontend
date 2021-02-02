import React from 'react';
import {
  MapContainer,
  Marker,
  ZoomControl
} from 'react-leaflet';

import MapLayers from '../../Mapas/MapLayers/MapLayers'
import classes from './ErmitaDetail.module.scss'
import TextElement from '../../../../components/UI/TextElement/TextElement';


const ermitaDetail = props => {
  const items1 = [
    "ermita_id",
    "nombre",
    "zona",
    "interzona",
    "municipio",
    "localidad",
    "localidad_nota"
  ]

  // TODO: improve!
  const items1Array = items1.map(id => {
    return (
      <TextElement
        key={id}
        label={"ermita."+id}
        content={props.ermita[id]}
      />
    )
  })

  let map = null
  if (props.ermita.ubicacion) {
    map =  (
      <div className={classes.SubSection}>
        <div className={classes.MapContainer}>
          <MapContainer
            center={props.ermita.ubicacion}
            zoom={12}
            scrollWheelZoom={false}
            zoomControl={false}
          >
            <ZoomControl position="bottomright"/>
            <MapLayers>
              <Marker position={props.ermita.ubicacion}>
              </Marker>
            </MapLayers>
          </MapContainer>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.Container}>
      <div className={classes.SubSection}>
        {items1Array}
      </div>
      {map}
    </div>
  )
}

export default ermitaDetail;
