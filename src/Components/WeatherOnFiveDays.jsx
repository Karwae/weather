import React from 'react'

const WeatherOnFiveDays = ({apiData, weatherIcon, timestamp}) => {

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var panels_weather  = document.createElement("div");
panels_weather.classList.add("panels-weather");

  return (
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
            <img src={require('../img/thermometer-half.png')} alt='' className='panel-image' />
       </div>
      </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
})}
</div>
  )
}

export default WeatherOnFiveDays;
