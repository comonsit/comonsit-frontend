import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'


const bancosSaldos = (props) => {

  const check = value => !isNaN(value) && !isNaN(value)

  const substract = (value, substraend) => {
    if (check(value) && check(substraend)) {
      return <Currency value={+value - +substraend}/>
    }
    return 'ERR'
  }

  const sum_all = (ing1, egr1, ing2, egr2) => {
    if (check(ing1) && check(egr1) && check(ing2) && check(egr2)) {
      return <Currency value={+ing1 - +egr1 + +ing2 -+egr2}/>
    }
    return 'ERR'
  }

  const columns = [
    {
      Header: <FormattedMessage id="banco.cuenta"/>,
      accessor: 'nombre_cuenta',
      Footer: <strong>Totales</strong>
    },
    {
      Header: <FormattedMessage id="banco.tot_prev"/>,
      accessor: 'tot_ingresos_prev',
      Cell: (cellInfo) => substract(cellInfo.cell.value, cellInfo.row.original.tot_egresos_prev),
      Footer: info => {
              const total = React.useMemo(
                () =>
                  info.rows.reduce((sum, row) => +row.original.tot_ingresos_prev - +row.original.tot_egresos_prev + sum, 0),
                [info.rows]
              )

              return <strong><Currency value={total}/></strong>
            },
    },
    {
      Header: <FormattedMessage id="banco.tot_ingresos"/>,
      accessor: 'tot_ingresos',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Footer: info => {
              // Only calculate total visits if rows change
              const total = React.useMemo(
                () =>
                  info.rows.reduce((sum, row) => +row.values.tot_ingresos + sum, 0),
                [info.rows]
              )

              return <strong><Currency value={total}/></strong>
            },
    },
    {
      Header: <FormattedMessage id="banco.tot_egresos"/>,
      accessor: 'tot_egresos',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Footer: info => {
              // Only calculate total visits if rows change
              const total = React.useMemo(
                () =>
                  info.rows.reduce((sum, row) => +row.values.tot_egresos + sum, 0),
                [info.rows]
              )

              return <strong><Currency value={total}/></strong>
            },
    },
    {
      Header: <FormattedMessage id="banco.total_periodo"/>,
      id: 'total_periodo',
      Cell: (cellInfo) => substract(cellInfo.row.original.tot_ingresos, cellInfo.row.original.tot_egresos),
      Footer: info => {
              // Only calculate total visits if rows change
              const total = React.useMemo(
                () =>
                  info.rows.reduce((sum, row) => +row.values.tot_ingresos - +row.values.tot_egresos + sum, 0),
                [info.rows]
              )

              return <strong><Currency value={total}/></strong>
            },
    },
    {
      Header: <FormattedMessage id="banco.totales"/>,
      id: 'total',
      Cell: (cellInfo) => sum_all(cellInfo.row.original.tot_ingresos_prev, cellInfo.row.original.tot_egresos_prev, cellInfo.row.original.tot_ingresos, cellInfo.row.original.tot_egresos),
      Footer: info => {
              // Only calculate total visits if rows change
              const total = React.useMemo(
                () =>
                  info.rows.reduce((sum, row) => +row.values.tot_ingresos - +row.values.tot_egresos + +row.original.tot_ingresos_prev - +row.original.tot_egresos_prev + sum, 0),
                [info.rows]
              )

              return <strong><Currency value={total}/></strong>
            },
    }
  ]

  return (<RTable
            columns={columns}
            data={props.data}
            onRowClick={props.onClick}
            hideSearch
            hasFooter
          />)
}

export default bancosSaldos
