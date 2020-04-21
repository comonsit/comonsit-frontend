import React from 'react'
import {FormattedMessage} from 'react-intl';
import classes from './ContratoActions.module.css'

import ContratoDetail from '../ContratoDetail/ContratoDetail'
import Button from '../../../../components/UI/Button/Button'
import RenderStatus from '../../../../components/Tables/RenderStatus/RenderStatus'
import Currency from '../../../../components/UI/Formatting/Currency'
import FrmtedDate from '../../../../components/UI/Formatting/FrmtedDate'
import { isGerencia } from '../../../../store/roles'


const contratoActions = props => {

  let gerenteButtons, actionButtons = null

  const deuda = props.selContrato.deuda_al_dia ? props.selContrato.deuda_al_dia.total : null
  const inicio = (isNaN(props.selContrato.fecha_inicio) && !isNaN(Date.parse(props.selContrato.fecha_inicio))) ? new Date(props.selContrato.fecha_inicio) : null
  const vencimiento = (isNaN(props.selContrato.fecha_vencimiento) && !isNaN(Date.parse(props.selContrato.fecha_vencimiento))) ? new Date(props.selContrato.fecha_vencimiento) : null
  let cartera_vigente, cartera_vencida, vida_credito
  if (inicio && vencimiento) {
    const today = new Date()
    const oneDay = 24 * 60 * 60 * 1000;
    vida_credito = Math.round(Math.abs((today - inicio) / oneDay));
    if (today > vencimiento) {
      cartera_vencida = Math.round(Math.abs((vencimiento - today) / oneDay));
      cartera_vigente = vida_credito - cartera_vencida
    } else {
      cartera_vencida = vida_credito
      cartera_vigente = 0
    }
  }

  if (props.role === 'Gerente') {
    gerenteButtons = (
      <>
        <Button
          disabled
          clicked={() => {}}
          btnType="Success"
          ><FormattedMessage id="creditos.condonacionButton"/></Button>
        <Button
          disabled
          clicked={() => {}}
          btnType="Success"
          ><FormattedMessage id="creditos.prorrogaButton"/></Button>
      </>
    )
  }

  if (isGerencia(props.role)) {
    actionButtons = (
      <Button
        clicked={() => {}}
        btnType="Success"
        ><FormattedMessage id="creditos.iniciarContrato"/></Button>
    )
  }

  // TODO: cambiar por un PagosList
  const pagos = props.pagos.map(pago => {
    return (
      <div key={pago.id}>
        <p>{pago.id} - fecha: {pago.fecha_pago} - cantidad: {pago.cantidad}</p>
      </div>
    )
  })

  return (
  <div className={classes.Container}>
    <div className={classes.StatusContainer}>
      <div className={classes.StatusDataContainer}>
        <p><FormattedMessage id="creditos.deuda_al_dia"/>: <Currency value={deuda}/></p>
        <p><FormattedMessage id="creditos.fecha_vencimiento"/>: <FrmtedDate value={props.selContrato.fecha_vencimiento}/></p>
      </div>
      <div className={classes.StatusDataContainer}>
        <p><FormattedMessage id="creditos.vida_credito"/>: {vida_credito}</p>
        <p><FormattedMessage id="creditos.cartera_vigente"/>: {cartera_vigente}</p>
        <p><FormattedMessage id="creditos.cartera_vencida"/>: {cartera_vencida}</p>
      </div>
      <div className={classes.StatusDetail}>
        <RenderStatus value={props.selContrato.estatus_detail} idLabel={"creditos.status."}/>
        <RenderStatus value={props.selContrato.estatus_ejecucion} idLabel={"creditos.status."}/>
     </div>
    </div>
    <div className={classes.ContentContainer}>
      <div className={classes.InfoContainer}>
        <ContratoDetail contrato={props.selContrato}/>
      </div>
      <div className={classes.ButtonGroup}>
        <Button
          clicked={() => {}}
          btnType="Success"
          ><FormattedMessage id="creditos.registrarPago"/></Button>
        {actionButtons}
        {gerenteButtons}
      </div>
    </div>
    <p><FormattedMessage id="creditos.pagado"/>: <Currency value={props.selContrato.pagado}/></p>
    {pagos}
  </div>)
}

export default contratoActions
