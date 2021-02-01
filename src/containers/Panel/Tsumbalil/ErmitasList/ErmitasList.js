import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import SelectColumnFilter from '../../../../components/Tables/RTable/Filters/SelectColumnFilter';


const ermitasList = (props) => {

  const columns = [
    {
      Header: '#',
      accessor: 'ermita_id',
      Filter: '',
      filter: ''
    },
    {
      Header: <FormattedMessage id="ermita"/>,
      accessor: 'nombre'
    },
    {
      Header: <FormattedMessage id="zona"/>,
      accessor: 'zona',
      Filter: SelectColumnFilter,
      filter: 'equals',
    },
    {
      Header: <FormattedMessage id="interzona"/>,
      accessor: 'interzona',
      Filter: SelectColumnFilter,
      filter: 'equals',
    },
    {
      Header: <FormattedMessage id="municipio"/>,
      accessor: 'municipio',
      Filter: SelectColumnFilter,
      filter: 'equals',
    },
    {
      Header: <FormattedMessage id="localidad"/>,
      accessor: 'localidad',
      Filter: SelectColumnFilter,
      filter: 'equals',
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

export default ermitasList
