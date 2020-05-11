import React, { useState } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table'
import classes from './RTable.module.css'
import SwitchToggle from '../../UI/SwitchToggle/SwitchToggle'
import GlobalFilter from './Filters/GlobalFilter'
import fuzzyTextFilterFn from './Filters/FuzzyTextFilterFn'
import DefaultColumnFilter from './Filters/DefaultColumnFilter'

const RTable = ({ columns, data, onRowClick, hideSearch}) => {

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
      page,
      prepareRow,
      state,
      preGlobalFilteredRows,
      setGlobalFilter,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },

    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        filterTypes,
        initialState: { pageIndex: 0 },
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination
  )

  const globFilter = !hideSearch ? (
    <tr>

      <th className={classes.SearchHeader} colSpan="4">
        <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
      </th>
      <th
        colSpan="0">
        <SwitchToggle clicked={event => setAdvancedSearch(advancedSearch => !advancedSearch)}/>
      </th>

    </tr>
  ) : null

  const paginationButtons = !hideSearch ? (
    <div className={classes.Pagination}>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>{' '}
      <span>
        {' '}
        <strong>
          {pageIndex + 1} de {pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Ir a:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Mostrar {pageSize}
          </option>
        ))}
      </select>
    </div>
  ) : null

  // Render the UI for your table
  return (
    <>
      <div className={classes.TableContainer}>
        <table className={classes.TablaSocios} {...getTableProps()}>
          <thead>
            {globFilter}
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
            {page.map(
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
      </div>
      {paginationButtons}
    </>

  )
}

export default RTable
