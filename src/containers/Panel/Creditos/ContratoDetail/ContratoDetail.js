import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { sayTseltal }from '@mauricioinaz/say-tseltal'

import classes from './ContratoDetail.module.scss'
import Currency from '../../../../components/UI/Formatting/Currency'
import Percent from '../../../../components/UI/Formatting/Percent'
import TextElement from '../../../../components/UI/TextElement/TextElement';
import RTablePrint from '../../../../components/Tables/RTablePrint/RTablePrint';
import DebtGraph from '../../../../components/Graphs/DebtGraph/DebtGraph';
import messages_es from '../../../../translations/es.json'
import messages_tz from '../../../../translations/tz.json'


const messages = {
  'es': messages_es,
  'tz': messages_tz
}


const contratoDetail = props => {
  const items1 = [
    "id",
    "fecha_inicio",
    "clave_socio",
    "nombres",
    "comunidad",
    "region",
    "proceso"
  ]
  const items1Array = items1.map(id => {
    return (
      <TextElement
        label={id}
        content={props.contrato[id]}
        twoLanguages={props.forPrinting}
        key={id}
        isDate={id === "fecha_inicio"}
      />
    )
  })

  const special_content = ["tipo_tasa", "intereses", "total"]
  const tipoTasa = {'FI': 'Fija', 'VA': 'Variable'}

  const get_special = id => {
    if (id === "tipo_tasa") {
      return tipoTasa[props.contrato[id]]
    }
    // TODO: IMPROVE OR MOVE TO BACKEND!
    const plazo = parseInt(props.contrato.plazo) + parseInt(props.contrato.prorroga)
    const intereses = parseInt(props.contrato.monto*(props.contrato.tasa/100)*plazo)
    if (id === "intereses") {
      return intereses
    }
    if (id === "total") {
      return parseInt(intereses)+ parseInt(props.contrato.monto)
    }
  }

  const items2 = [
    "monto",
    "tipo_credito",
    "plazo_disp",
    "intereses",
    "tasa",
    "tasa_moratoria",
    "tipo_tasa",
    "total"
  ]
  const items2Array = items2.map(id => {
    return (
      <TextElement
        label={id}
        content={special_content.includes(id) ? get_special(id) : props.contrato[id]}
        isNum={id === "monto" || id === "total" || id === "intereses"}
        isPerc={id === "tasa" || id === "tasa_moratoria"}
        twoLanguages={props.forPrinting}
        key={id}
      />
    )
  })

  const prorroga_justificacion = props.contrato.prorroga 
    ? 
      (
        <TextElement
          label={"prorroga_justificacion"}
          content={props.contrato.prorroga_justificacion}
        />
      )
    : null

  const columns = [
    {
      Header: "Jayeb Sc'ahc'alel (Plazo)",
      accessor: 'plazo',
    },
    {
      Header: "Smajanel (Pr??stamo)",
      accessor: 'monto',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
    },
    {
      Header: "Bin sjol smajanel te taqu'in ta jun jun uh (Inter??s Mensual)",
      accessor: 'tasa',
      Cell: (cellInfo) => <Percent value={cellInfo.cell.value}/>,
    },
    {
      Header: "Stojel sjol taqu'in (Intereses)",
      accessor: 'interes',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
    },
    {
      Header: "Stojel spisil majanbil taqu'in (Total a Pagar)",
      accessor: 'total',
      Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
    },
  ]


  const titles = [
    "contratoDetail.title",
    "contratoDetail.datos",
    "contratoDetail.especificaciones",
    "contratoDetail.informacion",
    "contratoDetail.texto1"
  ]
  const titlesArray = titles.map(id => {
    if (props.forPrinting) {
      return (
        <label key={id}>
          <IntlProvider
            locale={'es'}
            messages={messages.es}
          >
            <FormattedMessage id={id}/>
          </IntlProvider>
          /
          <IntlProvider
            locale='tz'
            messages={messages.tz}
          >
            <FormattedMessage id={id}/>
          </IntlProvider>
        </label>
      )
    } else {
      return <FormattedMessage key={id} id={id}/>
    }
  })

  // CREATE TABLE and GRAPH
  let tableAndGraph = null
  if (props.forPrinting) {
    const data = []
    let element = {}
    let interes_ord, interes_mor, plazo_mor
    for (let i=1; i<= props.contrato.plazo*2; i++) {
      interes_ord = props.contrato.monto*(props.contrato.tasa/100)*i
      if (i > props.contrato.plazo) {
        plazo_mor = parseInt(props.contrato.tasa_moratoria)
        interes_mor = props.contrato.monto*(plazo_mor/100)*(i-props.contrato.plazo)
      } else {
        plazo_mor = 0
        interes_mor = 0
      }
      element = {
        monto: props.contrato.monto,
        tasa: parseInt(props.contrato.tasa) + plazo_mor,
        plazo: i+' '+sayTseltal(i),
        interes: interes_ord + interes_mor,
        total: parseInt(props.contrato.monto) + interes_ord + interes_mor,
      }
      data.push(element)
    }

    tableAndGraph = (
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3>
            {titlesArray[3]}
          </h3>
        </div>
        <div className={classes.TableGraph}>
          <RTablePrint
            columns={columns}
            data={data}
            central={props.contrato.plazo-1}
          />
          <DebtGraph
            labelTitle="contratoDetail.graphTitle"
            labelIntereses="intereses"
            labelPrestamo="contratoDetail.prestamo"
            dataMonto={parseInt(props.contrato.monto)}
            dataInteres={parseInt(props.contrato.intereses)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>
        <h2>
          {props.forPrinting ? titlesArray[1] : ''}
        </h2>
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3>
            {titlesArray[1]}
          </h3>
        </div>
        {items1Array}
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3>
            {titlesArray[2]}
          </h3>
        </div>
        {items2Array}
        {prorroga_justificacion}
      </div>
      {tableAndGraph}
      <p>{props.forPrinting ? titlesArray[4] : ''}</p>
    </div>
  )
}

export default contratoDetail;
