import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButton from './componet/TopButton';
import Input from './componet/input';
import TimeLocation from './componet/timeLocation';
import TempDetail from './componet/tempDetail';
import Forecast from './componet/Forecast';
import getFormattedWeatherData from './services/services'
import { useEffect, useState } from 'react';

function App() {
  const [query, setQuery] = useState({ q: 'Lucknow' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async()=>{
      await getFormattedWeatherData({...query, units }).then(data => {
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);
 

 const formatBackground = ()=> { 
  if(!weather) return 'from-cyan-700 to bg-blue-700' ;
  const threshold = units=='metric' ? 20 : 60 ;
  if(weather.temp<= threshold) return 'from-cyan-700 to bg-blue-700'
  return 'from-yellow-700 to bg-orange-700'


 }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400`}>
      <TopButton setQuery={setQuery} />
      <Input setQuery={setQuery} units={units} setUnits={setUnits}/>
      {weather && (
        <div>
          <TimeLocation weather={weather} />
          <TempDetail weather={weather} />
          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        
        </div>
      )}
    </div>
  );
}

export default App;
