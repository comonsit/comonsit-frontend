import React from 'react'
import {FormattedMessage} from 'react-intl';
import Spinner from '../Spinner/Spinner';
import classes from './Table.module.css'
import TableRow from './TableRow/TableRow'

const table = (props) => {
  let tableHeaders = null
  let tableData = <Spinner/>
  if (props.headers) {
    tableHeaders = props.headers.map(h => (
      <th><FormattedMessage id={h}/></th>
    ))
  }

  if (props.data) {
    tableData = props.data.map(row => (
      <tr
        onClick={() => props.clicked(row[props.clickId])}
        id={row[props.clickId]}
        >
        <TableRow
          rowOrder={props.headers}
          rowData={row}
          colors={props.colors}
        />
      </tr>
    ))
  }


  return (
    <div className={classes.TableContainer}>
      <table className={classes.TablaSocios}>
        <tr>
          {tableHeaders}
        </tr>
        <tbody>
          {tableData}
        </tbody>
      </table>
    </div>
  )
}

export default table
