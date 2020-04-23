import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'
import SliderColumnFilter from '../../../../components/Tables/RTable/Filters/SliderColumnFilter';
import filterGreaterThan from '../../../../components/Tables/RTable/Filters/FilterGreaterThan';


const pagosList = (props) => {

  const columns = [
    {
      Header: '#',
      accessor: 'folio',
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
      accessor: 'region'
    },
    {
      Header: <FormattedMessage id="cantidad"/>,
      accessor: 'cantidad',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Filter: SliderColumnFilter,
      filter: filterGreaterThan
    },
  ]

  return (<RTable
            columns={columns}
            data={props.data}
            onRowClick={props.onClick}
          />)
}

export default pagosList
