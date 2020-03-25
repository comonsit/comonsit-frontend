import React from 'react';
import { FormattedMessage, FormattedDate, IntlProvider } from 'react-intl';
import classes from './SolicitudDetail.module.css'

import TextElement from '../../../../components/UI/TextElement/TextElement';


const solicitudDetail = (props) => {
  const items1 = ["nombre_productor", "clave_socio", "comunidad", "region", "area_proceso", "cargo", "cargo_coop", "fecha_ingr_yomol_atel", "porc_acopio_por_anio"]
  const items1Array = items1.map(id => {
    return (<TextElement
              label={id}
              content={props.solicitud[id]}
              />)
  })

  const items2 = ["monto_solicitado", "tipo_credito", "actProductiva", "motCredito", "plazo_de_pago_solicitado", "fecha_solicitud"]
  let content
  const items2Array = items2.map(id => {
    if ((id === "act_productiva" || id === "mot_credito") && props.solicitud[id] === 'OT') {
      content = props.solicitud[id+"_otro"]
    } else {
      content = props.solicitud[id]
    }
    return (<TextElement
              label={id}
              content={content}
              isNum={id === "monto_solicitado"}
              />)
  })

  const items3 = ["aval_nombre", "familiar_responsable", "justificacion_credito", "promotor", "irregularidades"]
  const items3Array = items3.map(id => {
    return (<TextElement
              label={id}
              content={props.solicitud[id]}
              />)
  })

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>
        <h2><FormattedMessage id="mesaControl.solicitud"/> {props.solicitud.folio_solicitud}</h2>
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3><FormattedMessage id="mesaControl.datos"/></h3>
        </div>
        {items1Array}
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3><FormattedMessage id="mesaControl.descripcion"/></h3>
        </div>
        {items2Array}
      </div>
      <div className={classes.SubSection}>
        <div className={classes.SubTitle}>
          <h3><FormattedMessage id="mesaControl.observaciones"/></h3>
        </div>
        {items3Array}
      </div>
      <h3>Comentarios</h3>
      {props.solicitud.chat.map(comment => (
          <div
            className={classes.Comment}
            key={comment.id}>
            <div className={classes.Label}>
              <p>{comment.user}:</p>
            </div>
            <div className={classes.ChatContainer}>
              <div className={classes.ChatDate}>
                <p>
                  <IntlProvider locale='es'>
                    <FormattedDate
                      value={new Date(comment.fecha)}
                      day="numeric"
                      month="long"
                      year="numeric"/>
                  </IntlProvider>
                </p>
              </div>
              <p>{comment.comentario}</p>
            </div>
          </div>
      ))}
    </div>
  )
}


export default solicitudDetail;
