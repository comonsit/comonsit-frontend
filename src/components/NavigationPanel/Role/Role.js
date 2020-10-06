import React from 'react';

import classes from './Role.module.scss';
import roles from '../../../store/roles'


const role = (props) =>{
  const attachedClasses = [classes.Container, classes[props.userRole]]

  return (
    <div>
      <div className={attachedClasses.join(' ')}>{roles[props.userRole]}</div>
    </div>
  )
}


export default role;
