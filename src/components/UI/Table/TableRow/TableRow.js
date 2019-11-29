import React from 'react'
import classes from './TableRow.module.css'

const tableRow = (props) => {
  let row = []
  if (props.rowData) {
    row = props.rowOrder.map(k => {
      if (k in props.colors) {
        return <td><div className={classes[props.colors[k][props.rowData[k]]]}></div></td>
      } else {
        return <td>{props.rowData[k]}</td>
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
