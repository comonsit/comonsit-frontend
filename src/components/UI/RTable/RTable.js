import React from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import classes from './RTable.module.css'
import GlobalFilter from './Filters/GlobalFilter'

// Create a default prop getter
const defaultPropGetter = () => ({});

const RTable = ({ columns, data, onRowClick, getCellProps = defaultPropGetter }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      },
    useGlobalFilter,
    useSortBy
)

  // Render the UI for your table
  return (
    <table className={classes.TablaSocios} {...getTableProps()}>
      <thead>
        <tr>
          <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
        </tr>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ''}
                  </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => onRowClick(row)}
                >
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps([
                      {
                        className: classes[cell.value]
                      },
                      getCellProps(cell)
                    ])}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
  )
}

export default RTable
