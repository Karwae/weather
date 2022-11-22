import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {

// const [data, setData] = useState({});
// const [location, setLocation] = useState();

// const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=bd791c17f5db20e1ea766717c1a0536c`;
// const searchLocation = (event) => {
//   if (event.key === 'Enter') {
//     axios.get(url).then((response) => {
//       setData(response.data)
//       console.log(response.data)
//     })
//     setLocation('');
//   }
//}
  return ( 
    <div className="App">
      {/* <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />


    <div className='information'>
      <h2>{data.name}</h2>
      <h4>Temperature</h4>
    </div> */}


    </div>
  );
  }

export default App;
