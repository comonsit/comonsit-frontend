import React from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './ContratoDetail.module.css'

import TextElement from '../../../../components/UI/TextElement/TextElement';


const contratoDetail = props => {
  const items1 = ["folio", "fecha_inicio", "clave_socio", "nombres", "comunidad", "region", "area_proceso"]
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

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>
        <h2><FormattedMessage id="contratoDetail.title"/></h2>
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3><FormattedMessage id="contratoDetail.datos"/></h3>
        </div>
        {items1Array}
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3><FormattedMessage id="contratoDetail.especificaciones"/></h3>
        </div>
        {items2Array}
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3><FormattedMessage id="contratoDetail.informacion"/></h3>
        </div>
        <p>----- desglose -----</p>
        <p>----- desglose -----</p>
        <p>----- desglose -----</p>
        <p>----- desglose -----</p>
        <p>----- gráfica -----</p>
        <p>----- gráfica -----</p>
        <p>----- gráfica -----</p>
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
