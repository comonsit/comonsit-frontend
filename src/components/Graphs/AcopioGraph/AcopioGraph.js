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

import classes from './AcopioGraph.module.scss';
import Currency from '../../UI/Formatting/Currency';

const acopioGraph = (props) => {
  return (
  <div className={classes.Container}>
    <div className={classes.Label}>
      <label><FormattedMessage id={props.label}/></label>
    </div>
    <XYPlot
      yPadding={10}
      width={400}
      height={200}
      margin={{left: 75}}
      xType="ordinal"
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
                            <p style={{fontSize: ".8em"}}><Currency value={props.hint.y}/> en {props.hint.x}</p>
                          </div>
                        </Hint> ): null}
    </XYPlot>
  </div>
  )
}


export default acopioGraph;
