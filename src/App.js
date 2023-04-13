import './App.css';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

function App() {

const [location, setLocation] = useState("London");
const [apiData, setApiData] = useState(null);
const api_key = "1746befa30558443451784583d966d81";

// useEffect(() => { 
//     gettingWeather();
// }, []);

const gettingWeather = async () => {
const url = `https://api.openweathermap.org/data/2.5/forecast/?q=${location}&cnt=60&units=metric&appid=${api_key}`; 

try {
  const response = await axios.get(url);
  setApiData(response.data);
  console.log(response.data);
} catch (err) {
  console.log(err);
}
}

 const weatherIcon = (a) => {
  switch(a) {

    case "Clouds": return <img src={require("./img/Clouds.png")} alt="" className="image-weather"/>;
    case "Snow": return <img src={require("./img/Snow.png")} alt="" className="image-weather"/>;
    case "Clear": return <img src={require("./img/Clear.png")} alt="" className="image-weather"/>;
    case "Rain": return <img src={require("./img/Rain.png")} alt="" className="image-weather"/>;

    default: return <h1>404</h1>
  }
}


useEffect(() => {
const raw = localStorage.getItem("locations") || [];
setLocation(JSON.parse(raw));
}, []);

useEffect(() => {
localStorage.setItem("locations", JSON.stringify(location));
}, [location]);

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
<input 
  type = "text"
  onChange={event => setLocation(event.target.value)}
  placeholder = "Your location ..."
  className ='input-loc'
  />
  <button
  onClick={gettingWeather}
  className='search'
  >Click</button>

{/* {apiData?.list?.map((item, index) => {
if (index % 8 === 0) {
  return ( */}
    {/* <div key={index}>
      {item?.dt_txt}
      <h3>{item?.main?.temp}</h3>
      <h3>{item?.main?.humidity}</h3>
      <h3>{item?.main?.temp_max}</h3>
      <h3>{item?.main?.temp_min}</h3>
      <h3>{item?.main?.feels_like}</h3>
      <h3>{item?.wind?.speed}</h3>
      <h3>{item?.weather[0].main}</h3>
    </div> */}
  {/* );
} else {
  return null;
}
})} */}

<div>
      {apiData?.list[0]?.dt_txt}
      <div className='temp list-item'>
      <p>Temp</p>
      <p>{apiData?.list[0]?.main?.temp}</p>
      </div>
      <div className='humidity list-item'>
      <p>Humidity</p>
      <p>{apiData?.list[0]?.main?.humidity}</p>
      </div>
      <div className='max-temp list-item'>
      <p>Max Temp</p>
      <p>{apiData?.list[0]?.main?.temp_max}</p>
      </div>
      <div className='min-temp list-item'>
      <p>Min Temp</p>
      <p>{apiData?.list[0]?.main?.temp_min}</p>
      </div>
      <div className='feels-weather list-item'>
      <p>Weather Feels</p>
      <p>{apiData?.list[0]?.main?.feels_like}</p>
      </div>
      <div className='wind-item list-item'>
      <p>Wind</p>
      <p>{apiData?.list[0]?.wind?.speed}</p>
      </div>
    </div>

</div>
</div>
);
}

export default App;
