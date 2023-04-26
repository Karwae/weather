import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

const [location, setLocation] = useState('');
const [apiData, setApiData] = useState(null);
const api_key = "1746befa30558443451784583d966d81";

const gettingWeather = React.useCallback( async () => {
  const url = `https://api.openweathermap.org/data/2.5/forecast/?q=${location}&cnt=60&units=metric&appid=${api_key}`; 

try {
  const response = await axios.get(url);
  setApiData(response.data);
} catch (err) {
  console.log(err);
}
},[location])

 const weatherIcon = (a) => {
  switch(a) {

    case "Clouds": return <img src={require("./img/Clouds.png")} alt="" className="image-weather"/>;
    case "Snow": return <img src={require("./img/Snow.png")} alt="" className="image-weather"/>;
    case "Clear": return <img src={require("./img/Clear.png")} alt="" className="image-weather"/>;
    case "Rain": return <img src={require("./img/Rain.png")} alt="" className="image-weather"/>;
    case "Smoke": return <img src={require("./img/Smoke.png")} alt="" className="image-weather"/>;
    case "Drizzle": return <img src={require("./img/Drizzle.png")} alt="" className="image-weather"/>;
    case "Haze": return <img src={require("./img/Haze.png")} alt="" className="image-weather"/>;
    case "Mist": return <img src={require("./img/Mist.png")} alt="" className="image-weather"/>;
    case "Snow": return <img src={require("./img/Snow.png")} alt="" className="image-weather"/>;

    default: return <h1>404</h1>
  }
}

/*Local Storage*/ 

useEffect(() => {
  const storedLocation = localStorage.getItem('location');
  if (storedLocation) {
    setLocation(storedLocation);
  }
}, [])

useEffect(() => {
  const timer = setTimeout(() => {
    gettingWeather();
    
  }, 1000);
  return () => clearTimeout(timer); 
}, [gettingWeather]);


useEffect(() => {
  localStorage.setItem('location', location);
}, [location])


/*TIME*/ 

const [currentTime, setCurrentTime] = useState(getFormattedDate());

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(getFormattedDate());
  }, 1000);

  return () => clearInterval(interval);
}, []);

function getFormattedDate() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  const dayOfMonth = date.getDate();
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
  const year = date.getFullYear();

  return `${hours}:${minutes} - ${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}

const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);
const timestamp = endOfToday.getTime();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var panels_weather  = document.createElement("div");
panels_weather.classList.add("panels-weather");

return ( 
<div className="container">
  <div className="general-data">
      <h2 className='main-temp'>{Math.floor(apiData?.list[0]?.main.temp)}&deg;</h2>
      <div className='description'>
      <h3 className='city'>{apiData?.city?.name}</h3>
      <h4 className='time'>{currentTime}</h4>
      </div>
      <div className='weather-image-city'>
      {apiData?.list ? weatherIcon(apiData?.list[0].weather[0].main) : null}
      <h4 className='sub-image'>{apiData?.list[0]?.weather[0]?.main}</h4>
      </div>
    </div>
<div className='side-box'>
<div className='search'>
<input 
  type = "text"
  onChange = {event => setLocation(event.target.value)}
  placeholder = "Your location"
  className ='input-loc'
  />
  <button onClick={ gettingWeather} className='search-button' >
  <img src={require("./img/search.png")} alt="" className="panel-image"/>
  </button>


</div>

<div className='data-weather'>
      <h2 className='details-title'>Weather Details</h2>
      <div className='temp list-item'>
      <p>Temperature</p>
      <p>{Math.floor(apiData?.list[0]?.main?.temp)}&deg;</p>
      </div>
      <div className='humidity list-item'>
      <p>Humidity</p>
      <p>{Math.floor(apiData?.list[0]?.main?.humidity)}%</p>
      </div>
      <div className='feels-weather list-item'>
      <p>Weather Feels</p>
      <p>{Math.floor(apiData?.list[0]?.main?.feels_like)}&deg;</p>
      </div>
      <div className='pressure list-item'>
      <p>Pressure</p>
      <p>{Math.floor(apiData?.list[0]?.main?.pressure)}</p>
      </div>
      <div className='wind-item list-item'>
      <p>Wind</p>
      <p>{apiData?.list[0]?.wind?.speed.toFixed(1)}</p>
      </div>
    </div>


    <div className='panels-weather'>
{apiData?.list?.map((item, index) => {
  const itemTimestamp = new Date(item?.dt_txt).getTime();
  if (itemTimestamp < timestamp) {
    return ( 
      <div className='panel-item' key={index}>
        <div className='panel-time'>{item?.dt_txt.slice(11, 16)}</div>
        {weatherIcon(item?.weather[0].main)}
        <div className='panel-temp'>{Math.floor(item?.main?.temp)}
        <img src={require("./img/thermometer-half.png")} alt="" className="panel-image"/>
        </div>
      </div> 
    );
  } else {
    return null;
  }
})}
</div>
<div className='panels-weather'>
{apiData?.list?.map((item, index) => {
  const timeInMs = Date.parse(item?.dt_txt);
  const date = new Date(item?.dt_txt.slice(0, 10));
  const dayOfWeek = date.getDay();
  const dayOfWeekName = daysOfWeek[dayOfWeek];
  const matchingIndex = apiData?.list?.findIndex((item) => Date.parse(item?.dt_txt) > timestamp);
  if (timestamp < timeInMs) {
    return (
      <React.Fragment key={index}>
      {(index > matchingIndex && index % 8 === matchingIndex || index % 8 === matchingIndex) && <div className='panel_date'>{dayOfWeekName}, {item?.dt_txt.slice(0, 10)} </div>}
        <div className='panel-item'>
          <div className='panel-time'>{item?.dt_txt.slice(11, 16)}</div>
          {weatherIcon(item?.weather[0].main)}
          <div className='panel-temp'>
            {Math.floor(item?.main?.temp)}
            <img src={require('./img/thermometer-half.png')} alt='' className='panel-image' />
       </div>
      </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
})}
</div>
</div>
</div>
);
}

export default App;


