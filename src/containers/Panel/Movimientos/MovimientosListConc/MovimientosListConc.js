import React from 'react'
import { FormattedMessage } from 'react-intl';

import classes from './MovimientosListConc.module.scss'
import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'
import FrmtedDate from '../../../../components/UI/Formatting/FrmtedDate'
import Bee from '../../../../Icons/Bee.js';
import Money from '../../../../Icons/Money.js';
import Soap from '../../../../Icons/Soap.js';
import Coffee from '../../../../Icons/Coffee.js';


const movimientosListConc = (props) => {
  const renderType = cellInfo => {
    if (cellInfo.cell.value) {
      return (<p style={{color: classes.intenseGreen}}>APORT</p>)
    } else {
      return (<p style={{color: classes.secLightRred}}>RETIR</p>)
    }
  }

  const renderStatus = cellInfo => {
    switch(cellInfo.cell.value) {
      case "CF": return (<Coffee fill={classes.prDarkBlue} width="18px" height="18px"/>)
      case "MI": return (<Bee fill={classes.prDarkBlue} width="20px" height="20px"/>)
      case "JA": return (<Soap fill={classes.prDarkBlue} width="20px" height="20px"/>)
      case "SL": return (<Money fill={classes.prDarkBlue} width="20px" height="20px" />)
      default:
        return (<p>?{cellInfo.cell.value}</p>)
    }
  }

  const columns = [
    {
      Header: <FormattedMessage id="movimientos.aportacion_retiro"/>,
      accessor: 'aportacion',
      Cell: renderType
    },
    {
      Header: <FormattedMessage id="nombres"/>,
      accessor: 'nombre_socio'
    },
    {
      Header: <FormattedMessage id="monto"/>,
      accessor: 'monto',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>
    },
    {
      Header: <FormattedMessage id="movimiento.clase"/>,
      accessor: 'ordinario',
      Cell: cellInfo => cellInfo.cell.value ? "ORDIN" : "Extra"
    },
    {
      Header: <FormattedMessage id="proceso_nombre"/>,
      accessor: 'proceso',
      Cell: renderStatus
    },
    {
      Header: <FormattedMessage id="movimientos.fecha_banco"/>,
      accessor: 'fecha_banco',
      Cell: (cellInfo) => <FrmtedDate value={cellInfo.cell.value}/>,
    },
    {
      Header: <FormattedMessage id="movimiento.tipo_de_movimiento"/>,
      accessor: 'tipo_de_movimiento',
    }
  ]

  if (props.bankDetail) {
    columns.push({
      Header: <FormattedMessage id="referencia_banco"/>,
      accessor: 'referencia_banco',
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

export default movimientosListConc
