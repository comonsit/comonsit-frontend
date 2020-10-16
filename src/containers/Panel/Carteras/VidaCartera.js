export const vidaCartera = (fecha_inicio, fecha_vencimiento) => {

  // regex used so that time zone doesn not affect and hour is ignored
  const inicio = (isNaN(fecha_inicio) && !isNaN(Date.parse(fecha_inicio)))
    ? new Date(fecha_inicio.replace(/-/g, '/'))
    : null
  const vencimiento = (isNaN(fecha_vencimiento) && !isNaN(Date.parse(fecha_vencimiento)))
    ? new Date(fecha_vencimiento.replace(/-/g, '/'))
    : null
  let cartera_vigente, cartera_vencida, vida_credito
  if (inicio && vencimiento) {
    const today = new Date()
    today.setHours(0,0,0,0)
    const oneDay = 24 * 60 * 60 * 1000;
    vida_credito = Math.round(Math.abs((today - inicio) / oneDay));
    if (today > vencimiento) {
      cartera_vencida = Math.round(Math.abs((today - vencimiento) / oneDay));
      cartera_vigente = vida_credito - cartera_vencida
    } else {
      cartera_vencida = 0
      cartera_vigente = vida_credito
    }
  }

  return {
    vida_credito: vida_credito,
    cartera_vigente: cartera_vigente,
    cartera_vencida: cartera_vencida,
    inicio: inicio,
    vencimiento: vencimiento
  }
}

export default vidaCartera
