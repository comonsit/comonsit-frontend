import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'
import Bee from '../../../../Icons/Bee.js';
import Money from '../../../../Icons/Money.js';
import Soap from '../../../../Icons/Soap.js';
import Coffee from '../../../../Icons/Coffee.js';


const movimientosListConc = (props) => {

  const renderType = cellInfo => {
    if (cellInfo.cell.value) {
      return (<p style={{color: "#2bc71b"}}>A</p>)
    } else {
      return (<p style={{color: "#ec573c"}}>R</p>)
    }
  }

  const renderStatus = cellInfo => {
    switch(cellInfo.cell.value) {
      case "CF": return (<Coffee fill="#243746" width="18px" height="18px"/>)
      case "MI": return (<Bee fill="#243746" width="20px" height="20px"/>)
      case "JA": return (<Soap fill="#243746" width="20px" height="20px"/>)
      case "SL": return (<Money fill="#243746" width="20px" height="20px" />)
      default:
        return (<p>?{cellInfo.cell.value}</p>)
    }
 };

  const columns = [
    {
      Header: <FormattedMessage id="movimientos.aportacion_retiro"/>,
      accessor: 'tipo_de_movimiento',
      Cell: renderType
    },
    {
      Header: <FormattedMessage id="credito"/>,
      accessor: 'nombre_socio'
    },
    {
      Header: <FormattedMessage id="nombres"/>,
      accessor: 'fecha_entrega'
    },
    {
      Header: <FormattedMessage id="monto"/>,
      accessor: 'monto',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>
    },
    {
      Header: <FormattedMessage id="movimientos.fecha_banco"/>,
      accessor: 'fecha_banco',
    },
    {
      Header: <FormattedMessage id="movimientosForm.referencia_banco"/>,
      accessor: 'referencia_banco',
    },
    {
      Header: <FormattedMessage id="proceso_nombre"/>,
      accessor: 'proceso',
      Cell: renderStatus
    }
  ]

  return (<RTable
            columns={columns}
            data={props.data}
            onRowClick={props.onClick}
            selectableRow
          />)
}

export default movimientosListConc
