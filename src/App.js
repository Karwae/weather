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
  } catch (err) {
    console.log(err);
  }
}


useEffect(() => {
  const raw = localStorage.getItem("locations") || [];
  setLocation(JSON.parse(raw));
}, []);

useEffect(() => {
  localStorage.setItem("locations", JSON.stringify(location));
}, [location]);




return ( 
  <div className="App">
  <div className='container'>
    <div className="general-data">
        <h2>{apiData?.city?.name}</h2>
      </div>
<div className='side-box'>
<input 
    type = "text"
    onChange={event => setLocation(event.target.value)}
    placeholder = "Your location ..."
    className ='input-loc'
    />
    <button
    // onClick={gettingWeather}
    className='search'
    >Click</button>

{apiData?.list?.map((item, index) => {
  if (index % 8 === 0) {
    return (
      <div key={index}>
        {item?.dt_txt}
        <h3>{item?.main.temp}</h3>
      </div>
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
