import React from 'react';
import classes from './BancoDetail.module.scss'

import TextElement from '../../../../components/UI/TextElement/TextElement';


const bancoDetail = props => {



  const items1 = ["id", "fecha", "referencia_banco", "referencia_alf", "fecha_captura","usuario",
                  "subcuenta_nombre", "subcuenta_id", "banco_cuenta", "banco_nombre", "relacion_sistema",
                  "cantidad", "ingr_egr"]
  const items1Array = items1.map(id => {
    let content = props.registro[id]
    if (id === "ingr_egr") {
      content = props.registro[id] ? "Ingreso" : "Egreso"
    }
    return (<TextElement
              label={"registro."+id}
              content={content}
              isNum={id === "cantidad"}
              />)
  })

  const items2 = ["aport_retiro", "pago", "ej_credito"]
  const items2Array = items2.map(id => {
    return (<TextElement
              label={"registro."+id}
              content={props.registro[id]}
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
    </div>
  )
}


export default bancoDetail;
