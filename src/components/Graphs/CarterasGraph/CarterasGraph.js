import React from 'react';
import {
  RadialChart
} from 'react-vis';

// import classes from './CarterasGraph.module.scss';

const carterasGraph = (props) => {
  return (
      <RadialChart
       data={props.data}
        width={200}
        height={200}
        innerRadius={40}
        radius={80}
        padAngle={0.04}
        colorType='literal'
      />
  )
}


export default carterasGraph;
