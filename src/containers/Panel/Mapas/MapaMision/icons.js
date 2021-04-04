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
import r11 from "../../../../assets/Icons/Regions/placeholder.11.svg";
import L from 'leaflet'

const iconSize = {
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
}

export const icons = {
  '1': new L.Icon({
    iconUrl:  r1,
    iconRetinaUrl: r1,
    ...iconSize
  }),
  '2': new L.Icon({
    iconUrl:  r6,
    iconRetinaUrl: r6,
    ...iconSize
  }),
  '3': new L.Icon({
    iconUrl:  r3,
    iconRetinaUrl: r3,
    ...iconSize
  }),
  '4': new L.Icon({
    iconUrl:  r4,
    iconRetinaUrl: r4,
    ...iconSize
  }),
  '5': new L.Icon({
    iconUrl:  r5,
    iconRetinaUrl: r5,
    ...iconSize
  }),
  '6': new L.Icon({
    iconUrl:  r2,
    iconRetinaUrl: r2,
    ...iconSize
  }),
  '7': new L.Icon({
    iconUrl:  r7,
    iconRetinaUrl: r7,
    ...iconSize
  }),
  '8': new L.Icon({
    iconUrl:  r8,
    iconRetinaUrl: r8,
    ...iconSize
  }),
  '9': new L.Icon({
    iconUrl:  r9,
    iconRetinaUrl: r9,
    ...iconSize
  }),
  '10': new L.Icon({
    iconUrl:  r10,
    iconRetinaUrl: r10,
    ...iconSize
  }),
  '11': new L.Icon({
    iconUrl:  r11,
    iconRetinaUrl: r11,
    ...iconSize,
    iconAnchor: [0, 35],
  }),
}

export default icons
