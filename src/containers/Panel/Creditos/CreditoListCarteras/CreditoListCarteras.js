import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'
import RenderStatus from '../../../../components/Tables/RenderStatus/RenderStatus';
import SelectColumnFilter from '../../../../components/Tables/RTable/Filters/SelectColumnFilter';
import SliderColumnFilter from '../../../../components/Tables/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../../components/Tables/RTable/Filters/FilterGreaterThan';
import vidaCartera from '../../Carteras/VidaCartera'

const creditoList = (props) => {
  // Add detailed days of credit data
  const modData = props.data.map(row => {
    return {
      ...row,
      ...vidaCartera(row.fecha_inicio, row.fecha_vencimiento)
    }
  })

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
      Header: <FormattedMessage id="estatus"/>,
      accessor: 'estatus_detail',
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
    accessor: 'deuda_al_dia.interes_ordinario_deuda',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="creditos.interes_moratorio"/>,
      accessor: 'deuda_al_dia.interes_moratorio_deuda',
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
      accessor: 'deuda_al_dia.total_deuda',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="creditos.vida_credito"/>,
    accessor: 'vida_credito',
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="creditos.cartera_vigente"/>,
      accessor: 'cartera_vigente',
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
    {
      Header: <FormattedMessage id="creditos.cartera_vencida"/>,
      accessor: 'cartera_vencida',
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    }
  ]

  return (<RTable
            columns={columns}
            data={modData}
            onRowClick={() => {}}
          />)
}

export default creditoList
