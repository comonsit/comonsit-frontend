import React from 'react';
import classes from './Weather.module.scss'
import { useIntl } from 'react-intl';
import translations from './WeatherTranslations';
import FrmtedDate from '../../../../components/UI/Formatting/FrmtedDate';

const DayCard = props => {

  const imgURL = `owf owf-${props.reading.icon} owf-5x`

  // include Tseltal descriptions
  const description = (useIntl().locale === 'tz') ? translations[props.reading.icon] : props.reading.description

  return (
    <div className={classes.CardContainer}>
        <h3 className={classes.Text}><FrmtedDate value={props.day+" 00:00:00"} noYear/></h3>
        <i className={imgURL}></i>
        <h3 className={classes.Text}>{Math.round(props.reading.maxTemp)} / {Math.round(props.reading.minTemp)} °C</h3>
        <p className={classes.Text}>{description}</p>
    </div>
  )
}

export default DayCard;
