import React from 'react'
import WeatherSideNow from './WeatherSideNow';
import PanelsWeatherNow from './PanelsWeatherNow';
import WeatherOnFiveDays from './WeatherOnFiveDays';

const Search = ({apiData, weatherIcon, gettingWeather, setLocation}) => {  

/*TIME*/ 
const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);
const timestamp = endOfToday.getTime();

  return (
<div className='side-box'>
<div className='search'>
<input 
  type = "text"
  onChange = {event => setLocation(event.target.value)}
  placeholder = "Your location"
  className ='input-loc'
  />
  <button onClick={ gettingWeather} className='search-button' >
  <img src={require("../img/search.png")} alt="" className="panel-image"/>
  </button>
</div>

<WeatherSideNow apiData={apiData} />
<PanelsWeatherNow apiData={apiData} weatherIcon={weatherIcon} timestamp={timestamp} />
<WeatherOnFiveDays apiData={apiData} weatherIcon={weatherIcon} timestamp={timestamp} />
</div>
  )
}

export default Search;
