import React, { useState } from 'react'
import { UilSearch, UilLocationPinAlt } from '@iconscout/react-unicons'


function Input({setQuery,units,setUnits}) {
  const [city,setCity]  = useState('') ;
  const handleSearchClick = ()=>{ 
    if(city!=='') setQuery({q:city}) ;

  }
  const handleLocationClick = ()=>{
   if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=> {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      setQuery({
        lat,
        lon,
      });
    });
   }

  }

  const handleUnitChange = (e)=> {
    const selectedUnit = e.currentTarget.name ; 
    if(units!==selectedUnit) setUnits(selectedUnit);

  }

  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input value={city} onChange={(e)=>{
              setCity(e.currentTarget.value)
            }} type="text" placeholder='Search for city...' className='text-xl font-light p-2 w-full shodow-xl outline-none rounded capitalize placeholder:lowercase '/>
            <UilSearch size={25} onClick={handleSearchClick}   className="text-white cursor-pointer transition ease-in-out hover:scale-100"/>
            <UilLocationPinAlt size={25} onClick={handleLocationClick} className="text-white cursor-pointer transition ease-in-out hover:scale-110"/>
        </div>
        <div className="flex flex-row w-1/4 items-center justify-center">
            <button name='metric' onClick={handleUnitChange} className='text-xl text-white font-light transition ease-in-out hover:scale-100'>°C</button>
            <p className="text-xl text-white mx-1"> | </p>
            <button name='imperial' onClick={handleUnitChange} className='text-xl text-white font-light transition ease-in-out hover:scale-100'>°F</button>
        </div>
    </div>
    
  )
}

export default Input