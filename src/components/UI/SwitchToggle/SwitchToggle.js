import React from 'react'

import classes from './SwitchToggle.module.scss'


const switchButton = props => {
  return (
    <label className={classes.Switch}>
      <input type="checkbox" onChange={props.clicked}/>
      <span className={classes.RoundSlider}></span>
    </label>
  )
}

export default switchButton
