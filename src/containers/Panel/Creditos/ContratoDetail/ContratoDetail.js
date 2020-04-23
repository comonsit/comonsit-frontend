import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import classes from './ContratoDetail.module.css'
import { sayTseltal }from '@mauricioinaz/say-tseltal'

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

  const items1 = ["id", "fecha_inicio", "clave_socio", "nombres", "comunidad", "region", "proceso"]
  const items1Array = items1.map(id => {
    return (<TextElement
              label={id}
              content={props.contrato[id]}
              twoLanguages={props.twoLanguages}
              />)
  })

  const items2 = ["monto", "tipo_credito", "plazo", "intereses", "tasa", "tasa_moratoria", "total"]
  const items2Array = items2.map(id => {
    return (<TextElement
              label={id}
              content={props.contrato[id]}
              isNum={id === "monto" || id === "total" || id === "intereses"}
              isPerc={id === "tasa" || id === "tasa_moratoria"}
              twoLanguages={props.twoLanguages}
              />)
  })

  const columns = [
          {
            Header: "Jayeb Sc'ahc'alel (Plazo)",
            accessor: 'plazo',
          },
          {
            Header: "Smajanel (Préstamo)",
            accessor: 'monto',
            Cell: (cellInfo) => <Currency value={cellInfo.cell.value}/>,
          },
          {
            Header: "Bin sjol smajanel te taqu'in ta jun jun uh (Interés Mensual)",
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

  // CREATE TABLE DATA
  const data = []
  let element = {}
  let  interes_ord, interes_mor, plazo_mor
  for (let i=1; i<= props.contrato.plazo*2; i++) {
    interes_ord = props.contrato.monto*(props.contrato.tasa/100)*i
    if (i>props.contrato.plazo) {
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

  const titles = ["contratoDetail.title", "contratoDetail.datos", "contratoDetail.especificaciones", "contratoDetail.informacion", "contratoDetail.texto1"]
  const titlesArray = titles.map(id => {
    if (props.twoLanguages) {
      return (<label>
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
            </label>)
    } else {
      return <FormattedMessage id={id}/>
    }
  })

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>
        <h2>
          {props.twoLanguages ? titlesArray[1] : ''}
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
      </div>
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
            labelIntereses="contratoDetail.interes"
            labelPrestamo="contratoDetail.prestamo"
            dataMonto={parseInt(props.contrato.monto)}
            dataInteres={parseInt(props.contrato.intereses)}
          />
        </div>
      </div>
      <p>{props.twoLanguages ? titlesArray[4] : ''}</p>
    </div>
  )
}


export default contratoDetail;
