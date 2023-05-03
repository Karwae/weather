import React from 'react'

const PanelsWeatherNow = ({apiData, weatherIcon, timestamp}) => {
return (
    <div className='panels-weather'>
    {apiData?.list?.map((item, index) => {
    const itemTimestamp = new Date(item?.dt_txt).getTime();
    if (itemTimestamp < timestamp) {
    return ( 
        <div className='panel-item' key={index}>
        <div className='panel-time'>{item?.dt_txt.slice(11, 16)}</div>
        {weatherIcon(item?.weather[0].main)}
        <div className='panel-temp'>{Math.floor(item?.main?.temp)}
        <img src={require("../img/thermometer-half.png")} alt="" className="panel-image"/>
        </div>
        </div> 
    );
    } else {
        return null;
    }
    })}
    </div>
)
}

export default PanelsWeatherNow;
