import React from 'react';
import {
  TileLayer,
  LayersControl
} from 'react-leaflet';

const { BaseLayer } = LayersControl


const mapLayers = props => {

  return (
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
      {props.children}
    </LayersControl>
  )
}

export default mapLayers;
