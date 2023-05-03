import React, {useEffect, useState} from 'react';

const WeatherMainNow = ({apiData, weatherIcon}) => {

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
  )
}

export default WeatherMainNow;
