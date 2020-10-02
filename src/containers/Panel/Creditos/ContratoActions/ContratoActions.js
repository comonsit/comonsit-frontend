import React from 'react'
import _ from 'lodash';
import {FormattedMessage} from 'react-intl';
import { Route } from 'react-router-dom';
import classes from './ContratoActions.module.scss'

import ContratoDetail from '../ContratoDetail/ContratoDetail'
// import PagosList from '../..//Pagos/PagosList/PagosList'
import CreditoHistorial from '../CreditoHistorial/CreditoHistorial'
import Button from '../../../../components/UI/Button/Button'
import RenderStatus from '../../../../components/Tables/RenderStatus/RenderStatus'
import Currency from '../../../../components/UI/Formatting/Currency'
import FrmtedDate from '../../../../components/UI/Formatting/FrmtedDate'
import { isGerencia } from '../../../../store/roles'
import vidaCartera from '../../Carteras/VidaCartera'


const contratoActions = props => {

  let gerenteButtons, actionButtons = null

  const deuda = props.selContrato.deuda_al_dia ? props.selContrato.deuda_al_dia.total_deuda : null

  const vida = vidaCartera(props.selContrato.fecha_inicio, props.selContrato.fecha_vencimiento)

  if (props.role === 'Gerente') {
    gerenteButtons = (
      <>
        <Button
          disabled
          clicked={() => {}}
          btnType="Medium"
          ><FormattedMessage id="creditos.condonacionButton"/></Button>
        <Button
          disabled
          clicked={() => {}}
          btnType="Medium"
          ><FormattedMessage id="creditos.prorrogaButton"/></Button>
      </>
    )
  }

  if (isGerencia(props.role)) {
    actionButtons = (
      <Route render={({ history}) => (
        <>
        <Button
          clicked={() => history.push('/credito-activar')}
          btnType="Medium"
          ><FormattedMessage id="creditos.iniciarContrato"/></Button>
        <Button
          clicked={() => history.push('/credito-imprimir')}
          btnType="Medium"
          ><FormattedMessage id="creditos.imprimirContrato"/></Button>
        </>
      )} />
    )
  }

  let paymentHistory = null
  if (vida.inicio){
    if(!_.isEmpty(props.selContrato.deuda_al_dia)){
      paymentHistory = (<CreditoHistorial data={props.pagos} credito={props.selContrato}/>)
    } else if (props.selContrato.estatus_detail === 'PA') {
      paymentHistory = (<CreditoHistorial data={props.pagos} credito={props.selContrato} payed/>)
    }
  }


  return (
  <div className={classes.Container}>
    <div className={classes.ContentContainer}>
      <div className={classes.ContratoContainer}>
        <div className={classes.ContratoDetail}>
          <ContratoDetail contrato={props.selContrato}/>
        </div>
        <div className={classes.SubTitle}>
          <h3>
            <p><FormattedMessage id="creditos.historialCredito"/></p>
          </h3>
        </div>
        <div className={classes.PaymentContainer}>
          {paymentHistory}
        </div>
      </div>
      <div className={classes.ButtonGroup}>
        <Route render={({ history}) => (
          <>
          <Button
            clicked={() => history.push('/pago-formato')}
            btnType="Medium"
            ><FormattedMessage id="creditos.registrarPago"/></Button>
          </>
        )} />
        {actionButtons}
        {gerenteButtons}
      </div>
    </div>
    <div className={classes.StatusContainer}>
      <div className={classes.StatusDataContainer}>
        <p><FormattedMessage id="creditos.deuda_al_dia"/>: <Currency value={deuda}/></p>
        <p><FormattedMessage id="creditos.fecha_vencimiento"/>: <FrmtedDate value={vida.vencimiento.toString()}/></p>
        <p><FormattedMessage id="creditos.pagado"/>: <Currency value={props.selContrato.pagado}/></p>
      </div>
      <div className={classes.StatusDataContainer}>
        <p><FormattedMessage id="creditos.vida_credito"/>: {vida.vida_credito}</p>
        <p><FormattedMessage id="creditos.cartera_vigente"/>: {vida.cartera_vigente}</p>
        <p><FormattedMessage id="creditos.cartera_vencida"/>: {vida.cartera_vencida}</p>
      </div>
      <div className={classes.StatusDetail}>
        <RenderStatus value={props.selContrato.estatus_detail} idLabel={"creditos.status."}/>
        <RenderStatus value={props.selContrato.estatus_ejecucion} idLabel={"creditos.status."}/>
     </div>
    </div>
  </div>)
}

export default contratoActions
