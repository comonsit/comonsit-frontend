import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'


const bancosList = (props) => {
  const selectColumn = (cantidad, type, column) => {
    if (type === column) {
      return <Currency value={cantidad}/>
    }
    return null
  }

  const columns = [
    {
      Header: <FormattedMessage id="bancos.fecha"/>,
      accessor: 'fecha'
    },
    {
      Header: <FormattedMessage id="bancos.subcuenta"/>,
    accessor: 'subcuenta_id_cont'
    },
    {
      Header: <FormattedMessage id="bancos.subcuenta_nombre"/>,
      accessor: 'subcuenta_nombre'
    },
    {
      Header: <FormattedMessage id="bancos.referencia"/>,
      accessor: 'referencia'
    },
    {
      Header: <FormattedMessage id="bancos.ingreso"/>,
      accessor: 'cantidad',
      Cell: (cellInfo) => selectColumn(cellInfo.cell.value, cellInfo.row.original.ingr_egr, true)
    },
    {
      Header: <FormattedMessage id="bancos.egreso"/>,
      accessor: 'ingr_egr',
      Cell: (cellInfo) => selectColumn(cellInfo.row.original.cantidad, cellInfo.cell.value, false)
    }
  ]

  return (
    <RTable
      columns={columns}
      data={props.data}
      onRowClick={props.onClick}
    />
  )
}

export default bancosList
