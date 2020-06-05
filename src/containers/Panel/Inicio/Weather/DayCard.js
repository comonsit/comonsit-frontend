import React from 'react';
import classes from './Weather.module.css'
// import { useIntl } from 'react-intl';
import FrmtedDate from '../../../../components/UI/Formatting/FrmtedDate';

const DayCard = props => {

  // console.log(useIntl().locale)

  const imgURL = `owf owf-${props.reading.icon} owf-5x`

  return (
    <div className={classes.CardContainer}>
        <h3><FrmtedDate value={props.day+" 00:00:00"} noYear/></h3>
        <i className={imgURL}></i>
        <h2>{Math.round(props.reading.maxTemp)}/{Math.round(props.reading.minTemp)} °C</h2>
        <div className={classes.CardBody}>
          <p className="card-text">{props.reading.description}</p>
        </div>
    </div>
  )
}

export default DayCard;
