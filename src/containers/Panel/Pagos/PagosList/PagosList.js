import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'
import FrmtedDate from '../../../../components/UI/Formatting/FrmtedDate'
import RenderStatus from '../../../../components/Tables/RenderStatus/RenderStatus';
import SelectColumnFilter from '../../../../components/Tables/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../../components/Tables/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../../components/Tables/RTable/Filters/FilterGreaterThan';


const pagosList = (props) => {

  const columns = [
    {
      Header: '#',
      accessor: 'id',
      Filter: '',
      filter: ''
    },
    {
      Header: <FormattedMessage id="credito"/>,
      accessor: 'credito'
    },
    {
      Header: <FormattedMessage id="nombres"/>,
      accessor: 'nombres'
    },
    {
      Header: <FormattedMessage id="region"/>,
      accessor: 'region',
      Filter: SelectColumnFilter,
    },
    {
      Header: <FormattedMessage id="pagos.fecha_pago"/>,
      accessor: 'fecha_pago',
      Filter: SelectColumnFilter,
      Cell: (cellInfo) => <FrmtedDate value={cellInfo.cell.value}/>,
    },
    {
      Header: <FormattedMessage id="cantidad"/>,
      accessor: 'cantidad',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="cartera"/>,
      accessor: 'estatus_previo',
      Cell: (cellInfo) => <RenderStatus value={cellInfo.cell.value} idLabel={"creditos.status."}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="pagos.fecha_banco"/>,
      accessor: 'fecha_banco',
      Filter: SelectColumnFilter,
      Cell: (cellInfo) => <FrmtedDate value={cellInfo.cell.value}/>,
    },
  ]

  if (props.selectable) {
    columns.push({
      Header: <FormattedMessage id="pagos.referencia_banco"/>,
      accessor: 'referencia_banco',
      Filter: SelectColumnFilter,
    })
  }

  return (
    <RTable
      columns={columns}
      data={props.data}
      onRowClick={props.onClick}
      selectableRow={props.selectable}
    />
  )
}

export default pagosList
