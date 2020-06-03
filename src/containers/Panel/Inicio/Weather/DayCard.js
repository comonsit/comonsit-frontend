import React from 'react';
import classes from './Weather.module.css'

const DayCard = ({ reading }) => {

  let newDate = new Date();
  const weekday = reading.dt * 1000
  newDate.setTime(weekday)

  const imgURL = `owf owf-${reading.weather[0].id} owf-5x`

  return (
    <div className={classes.CardContainer}>
        <h3>{newDate.getUTCDate()}</h3>
        <i className={imgURL}></i>
        <h2>{Math.round(reading.main.temp)} °C</h2>
        <div className={classes.CardBody}>
          <p className="card-text">{reading.weather[0].description}</p>
        </div>
    </div>
  )
}

export default DayCard;
