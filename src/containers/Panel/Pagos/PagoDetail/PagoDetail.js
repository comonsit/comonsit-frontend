import React from 'react';
import classes from './PagoDetail.module.css'

import TextElement from '../../../../components/UI/TextElement/TextElement';


const pagoDetail = props => {

  const items1 = ["id", "credito", "fecha_pago", "cantidad", "autor", "interes_ord", "interes_mor", "abono_capital"]
  const items1Array = items1.map(id => {
    return (<TextElement
              label={"pagos."+id}
              content={props.pago[id]}
              isNum={id === "cantidad" || id === "interes_ord" || id === "interes_mor" || id === "abono_capital" }
              />)
  })

  const items2 = ["fecha_banco", "referencia_banco"]
  const items2Array = items2.map(id => {
    return (<TextElement
              label={"pagos."+id}
              content={props.pago[id]}
              />)
  })

  const items3 = ["estatus_previo", "deuda_prev_total", "deuda_prev_int_ord", "deuda_prev_int_mor"]
  const items3Array = items3.map(id => {
    return (<TextElement
              label={"pagos."+id}
              content={props.pago[id]}
              isNum={ id !== "estatus_previo" }
              />)
  })

  return (
    <div className={classes.Container}>
      <div className={classes.SubSection}>
        {items1Array}
      </div>
      <div className={classes.SubSection}>
        {items2Array}
      </div>
      <div className={classes.SubSection}>
        {items3Array}
      </div>
    </div>
  )
}


export default pagoDetail;
