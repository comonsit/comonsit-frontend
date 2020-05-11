import React from 'react'
import { FormattedMessage } from 'react-intl';

import RTable from '../../../../components/Tables/RTable/RTable';
import Currency from '../../../../components/UI/Formatting/Currency'


const creditoHistorial = (props) => {

  // TODO: is this required here?
  if (!props.credito){
    return 'Error al buscar información del crédito'
  }

  const inicio = (isNaN(props.credito.fecha_inicio) && !isNaN(Date.parse(props.credito.fecha_inicio))) ? new Date(props.credito.fecha_inicio) : null
  const modifiedData = props.data.reverse()
  if (!modifiedData.find(item => item.id === 'INICIO')) {
    modifiedData.unshift({
      id: 'INICIO',
      fecha_pago: inicio ? inicio.toISOString().substring(0, 10) : null,
      cantidad: 0,
      interes_ord: 0,
      interes_mor: 0,
      abono_capital: 0,
      deuda_prev_int_ord: 0,
      deuda_prev_int_mor: 0,
      deuda_prev_capital: 0,
      deuda_prev_total: props.credito.monto
    })
    const today = new Date()
    modifiedData.push({
      id: 'HOY',
      fecha_pago: today.toISOString().substring(0, 10),
      cantidad: 0,
      interes_ord: 0,
      interes_mor: 0,
      abono_capital: 0,
      deuda_prev_int_ord: props.credito.deuda_al_dia.interes_ordinario_deuda,
      deuda_prev_int_mor: props.credito.deuda_al_dia.interes_moratorio_deuda,
      deuda_prev_capital: props.credito.deuda_al_dia.capital_por_pagar,
      deuda_prev_total: props.credito.deuda_al_dia.total_deuda
    })
  }

  const countDays = date => {
    if (isNaN(date) && !isNaN(Date.parse(date)) && inicio) {
      const oneDay = 24 * 60 * 60 * 1000;
      const eventDate = new Date(date)
      // return eventDate + ' ' + inicio
      return Math.round(Math.abs((eventDate - inicio) / oneDay));
    }
    return 'ERR'
  }

  // const interesDiario = (interes, fecha) => {
  //   const days = countDays(fecha)
  //   if (days === 'ERR') { return days }
  //
  //   return <Currency value={interes / days}/>
  // }

  const substract = (value, substraend) => {
    if (!isNaN(value) && !isNaN(value) && !isNaN(substraend) && !isNaN(substraend)) {
      return <Currency value={value - substraend}/>
    }
    return 'ERR'
  }

  const columns = [
    {
      Header: 'Evento',
      accessor: 'id',
      Cell: (cellInfo) => isNaN(cellInfo.cell.value) ? cellInfo.cell.value : 'Pago '
    },
    {
      Header: <FormattedMessage id="fecha"/>,
      accessor: 'fecha_pago'
    },
    {
      Header: <FormattedMessage id="creditoHistorial.diasTranscurridos"/>,
      id: 'dias_transcurridos',
      accessor: data => data.fecha_pago,
      Cell: (cellInfo) => countDays(cellInfo.cell.value)
    },
    {
      Header: <FormattedMessage id="creditoHistorial.pago"/>,
      accessor: 'cantidad',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value} hideZero/>,
    },
    {
      Header: <FormattedMessage id="creditoHistorial.pago_interes_ord"/>,
      accessor: 'interes_ord',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value} hideZero/>,
    },
    {
      Header: <FormattedMessage id="creditoHistorial.pago_interes_mor"/>,
      accessor: 'interes_mor',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value} hideZero/>,
    },
    {
      Header: <FormattedMessage id="creditoHistorial.abono_capital"/>,
      accessor: 'abono_capital',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value} hideZero/>,
    },
    {
      Header: <FormattedMessage id="creditoHistorial.pendienteIntOrd"/>,
      accessor: 'deuda_prev_int_ord',
      // Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Cell: (cellInfo) => substract(cellInfo.cell.value, cellInfo.row.original.interes_ord)
    },
    {
      Header: <FormattedMessage id="creditoHistorial.pendienteIntMor"/>,
      accessor: 'deuda_prev_int_mor',
      // Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Cell: (cellInfo) => substract(cellInfo.cell.value, cellInfo.row.original.interes_mor)
    },
    {
      Header: <FormattedMessage id="creditoHistorial.pendienteCapital"/>,
      accessor: 'deuda_prev_capital',
      // Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Cell: (cellInfo) => substract(cellInfo.cell.value, cellInfo.row.original.abono_capital)
    },
    {
      Header: <FormattedMessage id="creditoHistorial.saldoInsoluto"/>,
      accessor: 'deuda_prev_total',
      // Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
      Cell: (cellInfo) => substract(cellInfo.cell.value, cellInfo.row.original.cantidad)
    }
  ]

  console.log(modifiedData)

  return (<RTable
            columns={columns}
            data={modifiedData}
            onRowClick={() => {}}
            hideSearch
          />)
}

export default creditoHistorial
