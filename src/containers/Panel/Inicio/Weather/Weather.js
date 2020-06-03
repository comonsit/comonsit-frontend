import React from 'react';
import key from './apiKey';
import classes from './Weather.module.css'

import Spinner from '../../../../components/UI/Spinner/Spinner';
import DayCard from './DayCard';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: null,
      dailyData: null
    }
  }

  componentDidMount = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=17.07&lon=-91.62&units=metric&lang=es&APPID=${key}`
    fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          this.setState({
            fullData: data.list,
            dailyData: dailyData
          }, () => console.log(this.state))
        })
  }

  render() {

    const formatDayCards = (this.state.dailyData) ?
      this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />) :
      <Spinner/>

    console.log(key)

    return (
      <div>
        <div className={classes.ForecastContainer}>
          {formatDayCards}
        </div>
      </div>
    )
  }
}

export default Weather;
