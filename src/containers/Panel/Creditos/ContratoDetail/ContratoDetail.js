import React from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './ContratoDetail.module.css'
import { sayTseltal }from '@mauricioinaz/say-tseltal'

import TextElement from '../../../../components/UI/TextElement/TextElement';
import RTablePrint from '../../../../components/UI/RTablePrint/RTablePrint';
import DebtGraph from '../../../../components/Graphs/DebtGraph/DebtGraph';

const contratoDetail = props => {

  const items1 = ["folio", "fecha_inicio", "clave_socio", "nombres", "comunidad", "region", "proceso"]
  const items1Array = items1.map(id => {
    return (<TextElement
              label={id}
              content={props.contrato[id]}
              />)
  })

  const items2 = ["monto", "tipo_credito", "plazo", "intereses", "tasa", "total"]
  const items2Array = items2.map(id => {
    return (<TextElement
              label={id}
              content={props.contrato[id]}
              isNum={id === "monto" || id === "total"}
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
          },
          {
            Header: "Bin sjol smajanel te taqu'in ta jun jun uh (Interés Mensual)",
            accessor: 'tasa',
          },
          {
            Header: "Stojel sjol taqu'in (Intereses)",
            accessor: 'interes',
          },
          {
            Header: "Stojel spisil majanbil taqu'in (Total a Pagar)",
            accessor: 'total',
          },
        ]

  // CREATE TABLE DATA
  const data = []
  let element = {}
  let  interes_ord, interes_mor, plazo_mor
  for (let i=1; i<= props.contrato.plazo*2; i++) {
    interes_ord = props.contrato.monto*(props.contrato.tasa/100)*i
    if (i>props.contrato.plazo) {
      plazo_mor = 1
      interes_mor = props.contrato.monto*(props.contrato.tasa/100)*i
    } else {
      plazo_mor = 0
      interes_mor = 0
    }
    interes_mor = i>props.contrato.plazo ?  props.contrato.monto*(props.contrato.tasa/100)*i : 0
    element = {
      monto: props.contrato.monto,
      tasa: parseInt(props.contrato.tasa) + plazo_mor,
      plazo: i+' '+sayTseltal(i),
      interes: interes_ord,
      total: parseInt(props.contrato.monto) + interes_ord + interes_mor,
    }
    data.push(element)
  }

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>
        <h2>
          <FormattedMessage id="contratoDetail.title"/>
        </h2>
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3>
            <FormattedMessage id="contratoDetail.datos"/>
          </h3>
        </div>
        {items1Array}
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3>
            <FormattedMessage id="contratoDetail.especificaciones"/>
          </h3>
        </div>
        {items2Array}
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3>
            <FormattedMessage id="contratoDetail.informacion"/>
          </h3>
        </div>
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
      <div className={classes.SubSection}>
        <p><FormattedMessage id="contratoDetail.texto1"/></p>
        <p>___________________________________________</p>
        <p>{props.nombres}</p>
        <p><FormattedMessage id="contratoDetail.firma"/></p>
        <p>___________________________________________</p>
        <p>{props.gerente}</p>
        <p><FormattedMessage id="contratoDetail.firma"/></p>
      </div>
    </div>
  )
}


export default contratoDetail;
