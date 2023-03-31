import './App.css';
import React, {useRef, useState} from 'react';
import axios from 'axios';

function App() {

  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);

  const api_key = "df3886c4ae0b164958dcf4fd38b1575b";
  
  const gettingWeather = async () =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${api_key}`;
    
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setApiData(null);
      console.log(data);
      setApiData(data);
  })
  .catch((err) =>{
    console.log(err);
  });
}

  return ( 
    <div className="App">
      <input 
      type = "text"
      ref={inputRef}
      placeholder = "Enter your location"
      className='input-loc'
      />
      <button
      onClick={gettingWeather}
      >Click</button>

    <div>
    {apiData && (
        <h2>{apiData?.name + ',' + apiData?.sys?.country}</h2>
                )}
   
    <p>{apiData?.main?.temp}</p>

    </div>



    </div>
  );
  }

export default App;
