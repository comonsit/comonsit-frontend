import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'
import RenderStatus from '../../../../components/Tables/RenderStatus/RenderStatus';
import SelectColumnFilter from '../../../../components/Tables/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../../components/Tables/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../../components/Tables/RTable/Filters/FilterGreaterThan';


const creditoListCont = (props) => {
  const columns = [
    {
      Header: '#',
      accessor: 'id',
      Filter: '',
      filter: ''
    },
    {
      Header: <FormattedMessage id="nombres"/>,
      accessor: 'nombres'
    },
    {
      Header: <FormattedMessage id="region"/>,
      accessor: 'region'
    },
    {
      Header: <FormattedMessage id="creditos.fecha_inicio"/>,
      accessor: 'fecha_inicio'
    },
    {
      Header: <FormattedMessage id="estatus"/>,
      accessor: 'estatus',
      Cell: (cellInfo) => <RenderStatus value={cellInfo.cell.value} idLabel={"creditos.status."}/>,
      Filter: SelectColumnFilter,
      filter: 'equals'
    },
    {
      Header: <FormattedMessage id="creditos.estatus_ejecucion"/>,
      accessor: 'estatus_ejecucion',
      Cell: (cellInfo) => <RenderStatus value={cellInfo.cell.value} idLabel={"creditos.status."}/>,
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: <FormattedMessage id="monto"/>,
      accessor: 'monto',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="creditos.fecha_banco"/>,
      accessor: 'fecha_banco'
    },
    {
      Header: <FormattedMessage id="creditos.referencia_banco"/>,
      accessor: 'referencia_banco'
    },
  ]

  return (
    <RTable
      columns={columns}
      data={props.data}
      onRowClick={() => {}}
      selectableRow={props.selectable}
    />
  )
}

export default creditoListCont
