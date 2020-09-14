import React from 'react';
import { FormattedMessage, FormattedDate, IntlProvider } from 'react-intl';
import classes from './SolicitudDetail.module.scss'

import SolicSaldosGraph from '../../../../components/Graphs/SolicSaldosGraph/SolicSaldosGraph';
import TextElement from '../../../../components/UI/TextElement/TextElement';


const solicitudDetail = (props) => {
  const items1 = ["nombre_productor", "clave_socio", "comunidad", "region", "area_proceso", "cargo", "cargo_coop", "fecha_ingr_yomol_atel"]
  const items1Array = items1.map(id => {
    return (<TextElement
              label={id}
              content={props.solicitud[id]}
              />)
  })

  const items2 = ["monto_solicitado", "proceso_nombre", "tipo_credito_nombre", "act_productiva_nombre", "mot_credito_nombre", "plazo_de_pago_solicitado", "fecha_solicitud"]
  let content
  const items2Array = items2.map(id => {
    if ((id === "act_productiva_nombre" || id === "mot_credito_nombre") && props.solicitud[id] === 'Otro') {
      // slice to covert: "act_productiva_nombre" into "act_productiva_otro"
      content = props.solicitud[id]+': '+props.solicitud[id.slice(0,-7)+"_otro"]
    } else if (id === "mot_credito_nombre" && props.solicitud[id] === 'Salud') {
      const emergency = props.solicitud.emergencia_medica ? ' (emergencia)' : ''
      content = props.solicitud[id]+ emergency
    } else {
      content = props.solicitud[id]
    }
    return (<TextElement
              label={id}
              content={content}
              isNum={id === "monto_solicitado"}
              />)
  })
  // TODO: FIX!!
  // code duplicated with TextElement... just to avoid <p><div></div></p>
  items2Array.push(<div key={'graph_montoVsacopios'} className={classes.ContentContainer}>
                    <div className={classes.Label}>
                      <label><FormattedMessage id={'graph_montoVsacopios'}/></label>
                    </div>
                    <div className={classes.Content}>
                      <SolicSaldosGraph data={props.saldos} monto={props.solicitud.monto_solicitado}/>
                    </div>
                  </div>)

  const items3 = ["aval_nombre", "familiar_responsable", "justificacion_credito", "promotor", "irregularidades"]
  const items3Array = items3.map(id => {
    return (<TextElement
              label={id}
              content={props.solicitud[id]}
              />)
  })

  const preguntas_mesa = ["pregunta_1", "pregunta_2", "pregunta_3", "pregunta_4"]
  const preguntas_mesaArray = preguntas_mesa.map((id, index) => {
    if (props.solicitud[id] === null) {
      return(<span key={index} className={classes.Question}>{index+1}. &nbsp;&nbsp;&nbsp; </span>)
    } else if (props.solicitud[id] === true) {
      return(<span key={index} className={classes.Question}>{index+1}. <span className={classes.Checkmark}>&#10004;</span>&nbsp;&nbsp; </span>)
    } else {
      return(<span key={index} className={classes.Question}>{index+1}. <span className={classes.Cross}>&#10006;</span>&nbsp;&nbsp; </span>)
    }
  })

  items3Array.push(<TextElement label={'preguntas_mesa'} content={preguntas_mesaArray}/>)


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
