import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  DiscreteColorLegend,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
  // Hint
} from 'react-vis';
import classes from './SolicSaldosGraph.module.css'


const solicSaldosGraph = (props) => {

  const coffeeData = []
  const honeyData = []
  const soapData = []
  const moneyData = []

  const allData = [
    {
      title: 'Monto Solicitado',
      color: '#5056ac',
      data: [{x: 'Monto', y: parseInt(props.monto)}]
    },
    {
      title: 'Café',
      color: '#92c3c0',
      data: coffeeData
    },
    {
      title: 'Miel',
      color: '#D5B49E',
      data: honeyData
    },
    {
      title: 'Jabones',
      color: '#ac92c3',
      data: soapData
    },
    {
      title: 'Salarios',
      color: '#BBC392',
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
    return (<VerticalBarSeries key={item.title} data={item.data} color={item.color} style={{}} />)
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
      </XYPlot>
</div>
  )
}

export default solicSaldosGraph;