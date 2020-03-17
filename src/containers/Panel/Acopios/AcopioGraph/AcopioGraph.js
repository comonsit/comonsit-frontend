import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  DiscreteColorLegend,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  Hint
} from 'react-vis';
import classes from './AcopioGraph.module.css'


const acopioGraph = (props) => {
  return (
    <XYPlot yDomain={[0, 5000]} xType="ordinal"  width={450} height={200} className={classes.Graphs}>
      <DiscreteColorLegend
        style={{position: 'absolute', left: '50px', top: '10px'}}
        orientation="horizontal"
        items={[
          {
            title: props.label,
            color: props.color
          }
        ]}
      />
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis tickPadding={0} />
      <VerticalBarSeries
        data={props.data}
        color={props.color}
        onValueMouseOver={props.mouseOver}
        onValueMouseOut={props.mouseOut}/>
      {props.hint ? (<Hint value={props.hint}>
                          <div style={{background: '#656564', padding: '.5rem', borderRadius: "1rem"}}>
                            <p style={{fontSize: ".8em"}}>${props.hint.y} en {props.hint.x}</p>
                          </div>
                        </Hint> ): null}
    </XYPlot>
  )
}


export default acopioGraph;
