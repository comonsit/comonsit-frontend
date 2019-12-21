import React from 'react';
import classes from './Role.module.css';


const role = (props) =>{
  const roles = {
    'SO': "Socio",
    'PR': "Promotor",
    'CO': "Coordinador",
    'GE': "Gerente"
  }
  const attachedClasses = [classes.Container, classes[props.userRole]]

  return (
    <div>
      <div className={attachedClasses.join(' ')}>{roles[props.userRole]}</div>
    </div>
  )
}

export default role;
