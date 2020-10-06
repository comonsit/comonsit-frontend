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

import classes from './SolicSaldosGraph.module.scss'


const solicSaldosGraph = (props) => {

  const coffeeData = []
  const honeyData = []
  const soapData = []
  const moneyData = []

  const allData = [
    {
      title: 'Monto Solicitado',
      color: classes.strongPurple,
      data: [{x: 'Monto', y: parseInt(props.monto)}]
    },
    {
      title: 'Café',
      color: classes.prCyan,
      data: coffeeData
    },
    {
      title: 'Miel',
      color: classes.prLightPink,
      data: honeyData
    },
    {
      title: 'Jabones',
      color: classes.prLightPurple,
      data: soapData
    },
    {
      title: 'Salarios',
      color: classes.prLightGreen,
      data: moneyData
    }
  ]


  for (let yearData of props.data) {
    coffeeData.push({x: yearData.fecha__year, y: yearData.year_sum_cf})
    honeyData.push({x: yearData.fecha__year, y: yearData.year_sum_mi})
    soapData.push({x: yearData.fecha__year, y: yearData.year_sum_ja})
    moneyData.push({x: yearData.fecha__year, y: yearData.year_sum_sl})
  }

  const labels = allData.filter(item => !item.data.every(element => element.y === null))
  const series = labels.map(item => {
    return (
      <VerticalBarSeries
        key={item.title}
        data={item.data}
        color={item.color}
        style={{}}
        onValueMouseOver={props.mouseOver}
        onValueMouseOut={props.mouseOut}
        />
    )
  })

  return (
    <div className={classes.AllGraphs}>
      <XYPlot yPadding={15} xType="ordinal" width={500} height={300} className={classes.Graphs}>
        <DiscreteColorLegend
          style={{position: 'absolute', left: '50px', top: '0px'}}
          orientation="horizontal"
          items={labels}
        />
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <XAxis yPadding={10} />
        <YAxis tickPadding={0} />
        {series}
        {props.hint ? (
                        <Hint value={props.hint}>
                          <div style={{background: '#656564', padding: '.5rem', borderRadius: "1rem"}}>
                            <p style={{fontSize: ".8em"}}>${props.hint.y} en {props.hint.x}</p>
                          </div>
                        </Hint>
                      ): null
        }
      </XYPlot>
    </div>
  )
}

export default solicSaldosGraph;
