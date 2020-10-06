import React from 'react'
import { useTable } from 'react-table'

import classes from './RTablePrint.module.scss'


const RTablePrint = ({ columns, data, central }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table className={classes.Table}  {...getTableProps()}>
      <thead className={classes.TableHead}>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={classes.TableHead} {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          const rowClass = i===central ? classes.Central : null
          return (
            <tr className={rowClass} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


export default RTablePrint
