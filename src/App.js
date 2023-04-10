import './App.css';
import React, {useRef, useState} from 'react';
import axios from 'axios';

function App() {

const inputRef = useRef(null);
const [apiData, setApiData] = useState(null);

const api_key = "df3886c4ae0b164958dcf4fd38b1575b";

const gettingWeather= async () =>{

const url = `https://api.openweathermap.org/data/2.5/forecast/?q=${inputRef.current.value}&cnt=60&units=metric&appid=${api_key}`; 
fetch(url)
.then((res) => res.json())
.then((data) => {
  // setApiData(null);
  console.log(data);
  setApiData(data);
})
.catch((err) =>{
console.log(err);
});

}


return ( 
  <div className="App">
    <div className="general-data">
        <h2>{apiData?.city?.name}</h2>
      </div>
<div className='side-box'>
<input 
    type = "text"
    ref={inputRef}
    placeholder = "Your location ..."
    className='input-loc'
    />
    <button
    onClick={gettingWeather}
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
);
}

export default App;
