import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/UI/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'
import Percent from '../../../../components/UI/Formatting/Percent'
import RenderStatus from '../../../../components/Tables/RenderStatus/RenderStatus';
import SelectColumnFilter from '../../../../components/UI/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../../components/UI/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../../components/UI/RTable/Filters/FilterGreaterThan';


const creditoList = (props) => {

  const columns = [
    {
      Header: '#',
      accessor: 'id',
      Filter: '',
      filter: ''
    },
    {
      Header: <FormattedMessage id="clave_socio"/>,
      accessor: 'clave_socio'
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
      Header: <FormattedMessage id="creditos.fecha_vencimiento"/>,
      accessor: 'fecha_vencimiento'
    },
    {
      Header: <FormattedMessage id="plazo"/>,
      accessor: 'plazo_disp',
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="tasa"/>,
      accessor: 'tasa',
      Cell: (cellInfo) => <Percent value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="tasa_moratoria"/>,
      accessor: 'tasa_moratoria',
      Cell: (cellInfo) => <Percent value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
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
      Header: <FormattedMessage id="creditos.interes_ordinario"/>,
      accessor: 'deuda_al_dia.interes_ordinario',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="creditos.interes_moratorio"/>,
      accessor: 'deuda_al_dia.interes_moratorio',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="creditos.pagado"/>,
      accessor: 'pagado',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="creditos.deuda_al_dia"/>,
      accessor: 'deuda_al_dia.total',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    }
  ]

  return (<RTable
            columns={columns}
            data={props.data}
            onRowClick={props.onClick}
          />)
}

export default creditoList
