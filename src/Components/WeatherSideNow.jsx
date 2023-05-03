import React from 'react'

const WeatherSideNow = ({apiData}) => {
  return (
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
  )
}

export default WeatherSideNow
