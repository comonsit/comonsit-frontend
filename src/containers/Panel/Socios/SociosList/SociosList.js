import React from 'react'
import {FormattedMessage} from 'react-intl';
import RTable from '../../../../components/UI/RTable/RTable';
import SelectColumnFilter from '../../../../components/UI/RTable/Filters/SelectColumnFilter';

const sociosList = (props) => {

  const renderStatus = cellInfo => {
    const colors = {
      "AC": "#2bc71b",
      "BA": "#ec573c",
      "NP": "#868a86"
    }

     return (
       <div
        style={{
          borderRadius: "2rem",
          width: "2rem",
          height: "2rem",
          backgroundColor: colors[cellInfo.cell.value] }}
       />
     );
 };

  const columns = [
          {
            Header: 'Clave',
            accessor: 'clave_socio',
          },
          {
            Header: <FormattedMessage id="socios.nombre"/>,
            accessor: 'nombres',
          },
          {
            Header: <FormattedMessage id="apellido_paterno"/>,
            accessor: 'apellido_paterno',
          },
          {
            Header: <FormattedMessage id="apellido_materno"/>,
            accessor: 'apellido_materno',
          },
          {
            Header: <FormattedMessage id="socios.region"/>,
            accessor: 'region',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: <FormattedMessage id="socios.comunidad"/>,
            accessor: 'nombre_comunidad',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: <FormattedMessage id="socios.claveCafe"/>,
            accessor: 'clave_anterior',
          },
          {
            Header: <FormattedMessage id="socios.cafe"/>,
            accessor: 'estatus_cafe',
            Cell: renderStatus,
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: <FormattedMessage id="socios.miel"/>,
            accessor: 'estatus_miel',
            Cell: renderStatus,
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: <FormattedMessage id="socios.jabon"/>,
            accessor: 'estatus_yip',
            Cell: renderStatus,
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: <FormattedMessage id="socios.trabajador"/>,
            accessor: 'estatus_trabajador',
            Cell: renderStatus,
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: <FormattedMessage id="socios.general"/>,
            accessor: 'estatus_gral',
            Cell: renderStatus,
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
        ]
  return (<RTable
              columns={columns}
              data={props.listaSocios}
              onRowClick={props.onClick}
              />)
}

export default sociosList
