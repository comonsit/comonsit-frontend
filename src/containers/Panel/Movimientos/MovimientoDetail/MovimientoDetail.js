import React from 'react';
import classes from './MovimientoDetail.module.scss'

import TextElement from '../../../../components/UI/TextElement/TextElement';


const movimientoDetail = props => {

  const items1 = ["nombre_socio", "fecha_entrega", "monto", "proceso"]
  const items1Array = items1.map(id => {
    return (<TextElement
              label={"movimiento."+id}
              content={props.pago[id]}
              isNum={id === "monto"}
              />)
  })

  const items2 = ["tipo_de_movimiento", "fecha_banco", "referencia_banco"]
  const items2Array = props.pago.fecha_banco ? items2.map(id => {
    return (<TextElement
              label={id}
              content={props.pago[id]}
              />)
  }) : null

  return (
    <div className={classes.Container}>
      <div className={classes.SubSection}>
        {items1Array}
      </div>
      <div className={classes.SubSection}>
        {items2Array}
      </div>
    </div>
  )
}


export default movimientoDetail;
