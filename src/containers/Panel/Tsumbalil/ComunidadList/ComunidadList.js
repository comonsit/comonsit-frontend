import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import SelectColumnFilter from '../../../../components/Tables/RTable/Filters/SelectColumnFilter';


const comunidadList = (props) => {

  const columns = [
    {
      Header: '# C',
      accessor: 'id',
      Filter: '',
      filter: ''
    },
    {
      Header: <FormattedMessage id="comunidad"/>,
      accessor: 'nombre_de_comunidad'
    },
    {
      Header: '# R',
      accessor: 'region',
      Filter: SelectColumnFilter,
      filter: 'equals',
    },
    {
      Header: <FormattedMessage id="region"/>,
      accessor: 'nombre_region',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: <FormattedMessage id="ermita"/>,
      accessor: 'ermita',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: <FormattedMessage id="inegiLocalidad"/>,
      accessor: 'inegiLocalidad',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
  ]

  return (
    <RTable
      columns={columns}
      data={props.data}
      onRowClick={props.onClick}
    />
  )
}

export default comunidadList
