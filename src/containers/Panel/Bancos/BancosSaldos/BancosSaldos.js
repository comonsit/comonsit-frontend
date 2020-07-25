import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'


const bancosSaldos = (props) => {

  const substract = (value, substraend) => {
    if (!isNaN(value) && !isNaN(value) && !isNaN(substraend) && !isNaN(substraend)) {
      return <Currency value={value - substraend}/>
    }
    return 'ERR'
  }

  const columns = [
    {
      Header: <FormattedMessage id="banco.cuenta"/>,
      accessor: 'nombre_cuenta'
    },
    {
      Header: <FormattedMessage id="banco.tot_ingresos"/>,
      accessor: 'tot_ingresos',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
    },
    {
      Header: <FormattedMessage id="banco.tot_egresos"/>,
      accessor: 'tot_egresos',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
    },
    {
      Header: <FormattedMessage id="banco.totales"/>,
      accessor: 'id',
      Cell: (cellInfo) => substract(cellInfo.row.original.tot_ingresos, cellInfo.row.original.tot_egresos)
    }
  ]

  return (<RTable
            columns={columns}
            data={props.data}
            onRowClick={props.onClick}
            hideSearch
          />)
}

export default bancosSaldos
