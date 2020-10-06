import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  Hint
} from 'react-vis';

import classes from './AcopioGraph.module.scss'


const acopioGraph = (props) => {
  return (
  <div className={classes.Container}>
    <div className={classes.Label}>
      <label><FormattedMessage id={props.label}/></label>
    </div>
    <XYPlot
      yPadding={10}
      xType="ordinal"
      width={400}
      height={200}
      className={classes.Graphs}
      margin={{left: 75}}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis
        title="$MXN"
        tickPadding={0} />
      <VerticalBarSeries
        data={props.data}
        color={props.color}
        onValueMouseOver={props.mouseOver}
        onValueMouseOut={props.mouseOut}/>
      {props.hint ? (<Hint value={props.hint}>
                          <div
                            style={
                              {
                                background: '#656564',
                                padding: '.5rem',
                                borderRadius: "1rem"}
                              }
                          >
                            <p style={{fontSize: ".8em"}}>${props.hint.y} en {props.hint.x}</p>
                          </div>
                        </Hint> ): null}
    </XYPlot>
  </div>
  )
}


export default acopioGraph;
