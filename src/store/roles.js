const roles = {
  'SO': "Socio",
  'PR': "Promotor",
  'CO': "Coordinador",
  'GE': "Gerente",
  'VI': "Visitante"
}

export const isGerencia = rl => rl === roles.CO || rl === roles.GE

export default roles
