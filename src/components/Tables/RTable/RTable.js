import React, { useState, useEffect } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import { useDispatch } from "react-redux";

import classes from './RTable.module.scss'
import GlobalFilter from './Filters/GlobalFilter'
import fuzzyTextFilterFn from './Filters/FuzzyTextFilterFn'
import DefaultColumnFilter from './Filters/DefaultColumnFilter'
import SwitchToggle from '../../UI/SwitchToggle/SwitchToggle'
import * as actions from '../../../store/actions'

const RTable = ({ columns, data, onRowClick, hideSearch, selectableRow, hasFooter }) => {

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

  const dispatch = useDispatch();


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
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
    state: { pageIndex, pageSize, selectedRowIds },

  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: hideSearch? 40 : 20 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      if (selectableRow) {
      hooks.visibleColumns.push(columns => [
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ])
      }
    }
  )

  useEffect(() => {
    const selectedIds = Object.keys(selectedRowIds);
    const selectedRowsData = selectedIds
        .map(x => data[x])
        .filter(function(x) {
            return x != null;
        });
    dispatch(actions.setSelList(selectedRowsData));
  }, [selectedRowIds, dispatch, data]);


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
      <button onClick={e => {
          e.preventDefault();
          gotoPage(0)
        }} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={e => {
          e.preventDefault();
          previousPage();
        }} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={e => {
          e.preventDefault();
          nextPage();
        }} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <button onClick={e => {
          e.preventDefault();
          gotoPage(pageCount - 1);
        }} disabled={!canNextPage}>
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


  const showFooter = hasFooter ? (
    <tfoot>
      {footerGroups.map(group => (
        <tr{...group.getFooterGroupProps()}>
          {group.headers.map(column => (
            <td className={classes.TableFooter}  {...column.getFooterProps()}>{column.render('Footer')}</td>
          ))}
        </tr>
      ))}
    </tfoot>
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
          {showFooter}
        </table>
      </div>
      {paginationButtons}
    </>
  )
}


export default RTable
