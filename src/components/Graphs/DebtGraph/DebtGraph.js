import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  XYPlot,
  YAxis,
  DiscreteColorLegend,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';
import classes from './DebtGraph.module.css'


const debtGraph = (props) => {
  return (
  <div className={classes.Container}>
    <div className={classes.Label}>
      <label><FormattedMessage id={props.labelTitle}/></label>
    </div>
    <XYPlot
      margin={{left: 75}}
      yPadding={20}
      stackBy="y"
      width={200}
      height={400}
      className={classes.Graphs}
    >
    <DiscreteColorLegend
           style={{position: 'absolute', right: '-100px', top: '10px'}}
           orientation="vertical"
           items={[
             {
               title: <FormattedMessage id={props.labelIntereses}/> ,
               color: "#cba031"
             },
             {
               title: <FormattedMessage id={props.labelPrestamo}/> ,
               color: "#4074cc"
             }
           ]}
         />
      <VerticalGridLines />
      <HorizontalGridLines />
      <YAxis/>
      <VerticalBarSeries
        data={[{x: 1, y: props.dataMonto}]}
        color="#4074cc"/>
      <VerticalBarSeries
        data={[{x: 1, y: props.dataInteres}]}
        color="#cba031"/>
    </XYPlot>
  </div>
  )
}


export default debtGraph;
