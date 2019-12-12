import React from 'react'
import classes from './TableRow.module.css'

const tableRow = (props) => {
  let row = []
  if (props.rowData) {
    row = props.rowOrder.map((k, i) => {
      if (props.colors && k in props.colors) {
        return <td key={i}><div className={classes[props.colors[k][props.rowData[k]]]}></div></td>
      } else {
        return <td key={i}>{props.rowData[k]}</td>
      }
    })
  }

  return (
    <>
      {row}
    </>
  )

}

export default tableRow
