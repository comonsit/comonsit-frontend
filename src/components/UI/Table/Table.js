import React from 'react'
import {FormattedMessage} from 'react-intl';
import Spinner from '../Spinner/Spinner';
import classes from './Table.module.css'
import TableRow from './TableRow/TableRow'

const table = (props) => {
  let tableHeaders = null
  let tableData  = <tr><td><Spinner/></td></tr>  // TODO: add default value if no data
  if (props.headers) {
    tableHeaders = props.headers.map((h, i) => (
      <td key={i}><FormattedMessage id={h}/></td>
    ))
  }

  if (props.data) {
    tableData = props.data.map((row, i) => (
      <tr
        onClick={() => props.clicked(row[props.clickId])}
        id={row[props.clickId]}
        key={i}
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
        <thead>
          <tr>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </table>
    </div>
  )
}

export default table
