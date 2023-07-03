import React from 'react'
import { UilArrowUp, UilTear, UilArrowDown, UilTemperature, UilWind, UilSun, UilSunset } from '@iconscout/react-unicons' ;
import { formatToLocalTime, iconURLFromCode } from '../services/services';
function TempDetail({ 
   weather : {
   details,
   icon,
   temp,
   temp_min,
   temp_max,
   sunset,
   humidity,
   timezone,
   feels_like,
   speed,
   sunrise
}
})  {

   return (
    <div>
   <div className="flex items-center justify-center py-6 text-xl text-cyan-300"><p>{details}</p></div>
   <div className="flex flex-row justify-between items-center text-white py-3">
    <img src={iconURLFromCode(icon)} alt="" className="w-20" />
    <p className="text-5xl">{temp.toFixed()}°</p>
    <div className='flex flex-col space-y-2'>

     <div className="flex font-light items-center justify-center text-sm">
        <UilTemperature size={18} className="mr-1"/> 
        Real feel: <span className='font-medium ml-1'>{feels_like.toFixed()}°</span>
     </div>

     <div className="flex font-light items-center justify-center text-sm">
        <UilWind size={18} className="mr-1"/> 
        Wind: <span className='font-medium ml-1'>{speed.toFixed()} km/hr</span>
     </div>

     <div className="flex font-light items-center justify-center text-sm">
        <UilTear size={18} className="mr-1"/> 
       Humidity: <span className='font-medium ml-1'>{humidity.toFixed()} %</span>
     </div>

    </div>

   </div>
   
   <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">

   <UilSun/>
   <p className='font-light'>Rise: <span className='font-medium'>{formatToLocalTime(sunrise,timezone,"hh:mm a")}</span></p>
   <p className='font-light'>|</p>

   <UilSunset/>
   <p className='font-light'>Set: <span className='font-medium'>{formatToLocalTime(sunset,timezone,"hh:mm a")}</span></p>
   <p className='font-light'>|</p>

   <UilArrowUp/>
   <p className='font-light'>High: <span className='font-medium'>{temp_max.toFixed()}°</span></p>
   <p className='font-light'>|</p>

   <UilArrowDown/>
   <p className='font-light'>Low: <span className='font-medium'>{temp_min.toFixed()}°</span></p>
 

   </div>
   
   </div>
  )
}

export default TempDetail ;