import React, { useState } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import classes from './RTable.module.css'
import GlobalFilter from './Filters/GlobalFilter'
import fuzzyTextFilterFn from './Filters/FuzzyTextFilterFn'
import DefaultColumnFilter from './Filters/DefaultColumnFilter'

const RTable = ({ columns, data, onRowClick}) => {

  const [advancedSearch, setAdvancedSearch] = useState(false);

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

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
        defaultColumn,
        filterTypes,
      },
      useFilters,
      useGlobalFilter,
      useSortBy
  )


  // Render the UI for your table
  return (
    <table className={classes.TablaSocios} {...getTableProps()}>
      <thead>
        <tr>
          <th className={classes.SearchHeader} colSpan="2">
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
          </th>
          <th
            colSpan="0">
            <label className={classes.Switch}>
              <input type="checkbox" onChange={event => setAdvancedSearch(advancedSearch => !advancedSearch)}/>
              <span className={classes.RoundSlider}></span>
            </label>
          </th>
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

                <div>{advancedSearch && column.canFilter ? column.render('Filter') : null}</div>
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
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
  )
}

export default RTable
