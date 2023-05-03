import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import WeatherMainNow from './Components/WeatherMainNow';
import Search from './Components/Search';

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


function weatherIcon (a) {
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

return ( 
<div className="container">
<WeatherMainNow apiData={apiData} weatherIcon={weatherIcon} />
<Search apiData={apiData} weatherIcon={weatherIcon} gettingWeather={gettingWeather} setLocation={setLocation} />
</div>
);
}

export default App;