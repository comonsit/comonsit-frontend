import React from 'react';
import _ from 'lodash';

import classes from './Weather.module.scss'
import Spinner from '../../../../components/UI/Spinner/Spinner';
import DayCard from './DayCard';


class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyData: null
    }
  }

  componentDidMount() {
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=17.07&lon=-91.62&units=metric&lang=es&APPID=${process.env.REACT_APP_WEATHER_KEY}`
    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const daysData = data.list
        const dates = new Set(daysData.map(i => i.dt_txt.slice(0, 10)))
        const maxTemps = {}
        const minTemps = {}
        const icons = {}
        const descriptions = {}
        const dailyData = {}

        dates.forEach(i => maxTemps[i] = [])
        dates.forEach(i => minTemps[i] = [])
        dates.forEach(i => icons[i] = [])
        dates.forEach(i => descriptions[i] = [])

        daysData.forEach(i => {
          maxTemps[i.dt_txt.slice(0, 10)].push(i.main.temp_max)
          minTemps[i.dt_txt.slice(0, 10)].push(i.main.temp_min)
          icons[i.dt_txt.slice(0, 10)].push(i.weather[0].id)
          descriptions[i.dt_txt.slice(0, 10)].push(i.weather[0].description)
        })

        dates.forEach(i => {
          dailyData[i] = {
            maxTemp: Math.max(...maxTemps[i]),
            minTemp: Math.min(...minTemps[i]),
            icon: _.head(_(icons[i]).countBy().entries().maxBy(_.last)),
            description: _.head(_(descriptions[i]).countBy().entries().maxBy(_.last))
          }
        })

        this.setState({ dailyData: dailyData})
      })
  }

  render() {
    let formatDayCards = <Spinner/>
    const tmp = []
    if (this.state.dailyData) {
      let i = 0
      for (let day in this.state.dailyData) {
        tmp.push(<DayCard day={day} reading={this.state.dailyData[day]} key={i++} />)
      }
      formatDayCards = tmp
    }

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
