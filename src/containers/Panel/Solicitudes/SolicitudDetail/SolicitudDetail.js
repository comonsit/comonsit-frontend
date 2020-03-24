import React from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './SolicitudDetail.module.css'


const solicitudDetail = (props) => {
  return (
    <div className={classes.infoDiv}>
      <h2><FormattedMessage id="mesaControl.solicitud"/></h2>
      <h3><FormattedMessage id="mesaControl.datos"/></h3>
      <p><b><FormattedMessage id="nombre_productor"/>:</b> {props.solicitud.nombre_productor}</p>
      <p><b><FormattedMessage id="clave"/>:</b> {props.solicitud.clave_socio}</p>
      <p><b><FormattedMessage id="comunidad"/>:</b> {props.solicitud.comunidad}</p>
      <p><b><FormattedMessage id="region"/>:</b> {props.solicitud.region}</p>
      <p><b><FormattedMessage id="folio"/>:</b> {props.solicitud.folio_solicitud}</p>
      <p><b><FormattedMessage id="area_proceso"/>:</b> ¿¿??</p>
      <br/>
      <h3><FormattedMessage id="mesaControl.descripcion"/></h3>
      <p><b><FormattedMessage id="monto"/>:</b> ${props.solicitud.monto_solicitado}</p>
      <p><b><FormattedMessage id="tipo_credito"/>:</b> {props.solicitud.tipo_credito}</p>
      <p><b><FormattedMessage id="interes_mensual"/>:</b> 4% (¿automático?)</p>
      <p><b><FormattedMessage id="forma_pago"/>:</b> Efectivo (¿automático?)</p>
      <p><b><FormattedMessage id="mesaControl.ingresos_de_cooperativa"/>:</b> ¿¿ingresos coop??</p>
      <p><b><FormattedMessage id="prestamo_sobre_ingresos"/>:</b> {props.solicitud.monto_solicitado} / ingresos_cooperativa *100%</p>
      <p><b><FormattedMessage id="mesaControl.tiempoSolicitud"/>:</b> {props.solicitud.plazo_de_pago_solicitado}</p>
      <br/>
      ¡GRAFIQUITA AQUÍ!

      <p><b><FormattedMessage id="aval"/>:</b> {props.solicitud.aval_nombre}</p>
      <p><b><FormattedMessage id="justificacion"/>:</b> ¿¿comentarios promotor?? {props.solicitud.comentarios_promotor} </p>
      <br/>
      <h3><FormattedMessage id="mesaControl.observaciones"/></h3>
      <p><b><FormattedMessage id="mesaControl.promotResponsable"/>:</b> {props.solicitud.promotor}</p>
      <p><b><FormattedMessage id="cargo"/>:</b> {props.solicitud.cargo}</p>
      <p><b><FormattedMessage id="cargo_coop"/>:</b> {props.solicitud.cargo_coop}</p>
      <p><b><FormattedMessage id="cargo_mision"/>:</b> ¿¿cargo misión??</p>
      <p><b><FormattedMessage id="ingreso_a_YA"/>:</b> {props.solicitud.fecha_ingr_yomol_atel}</p>
      <p><b><FormattedMessage id="mesaControl.porc_acopio_por_anio"/>:</b> ¿¿??</p>
      <br/>
      <p><b><FormattedMessage id="mesaControl.familiaresYA"/>:</b> ¿¿??</p>
      <br/>
      <h3>Comentarios</h3>
      {props.solicitud.chat.map(comment => (
          <div key={comment.id}>
            <p>{comment.user}: {comment.comentario}</p>
            <p>{comment.fecha}</p>
          </div>
      ))}
    </div>
  )
}


export default solicitudDetail;
