import { DateTime } from "luxon";

// https://api.openweathermap.org/data/3.0/onecall?lat=35.44&lon=-94.04&appid=b01c12d96807563a8d554454f45f5f71

const API_key = "b01c12d96807563a8d554454f45f5f71" ;
const urlBase = "https://api.openweathermap.org/data/2.5"
// /weather?q=Lucknow&appid=83a7b0d299c4ce4c1bfb99e51c89c5ec 
// onecall - " https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key} " 


const getWeatherData = (info,params) => { 
    const url = new URL(urlBase+'/'+info) ; 
    url.search = new URLSearchParams({...params , appid:API_key});
  return fetch(url).then((res)=>res.json());
} ;

const formatCurrentWeather = (data)=> { 
    const {
        coord: {lat,lon} ,
        main: {temp,feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}
     } = data
  
     const {main : details,icon} = weather[0]
     return {lat,lon,temp,feels_like, temp_min, temp_max, humidity, name,
        dt,country,sunrise,sunset,speed, details,icon} ;
}

const formatForecast = (data)=> {
    let {timezone,daily,hourly} = data ;
    daily = daily.slice(1,6).map(d=>{
        return {
            title: formatToLocalTime(d.dt,timezone,'ccc'),
            temp: d.temp.day,
            icon:d.weather[0].icon,
        };
    }) ;

    hourly = hourly.slice(1,6).map(d=>{
        return {
            title: formatToLocalTime(d.dt,timezone,'hh:mm a'),
            temp: d.temp,
            icon:d.weather[0].icon,
        };
    }) ;
         return {timezone,daily,hourly} ;

};
const getFormattedWeatherData = async(params)=> {
    const formatted  = await getWeatherData('weather',params).then(formatCurrentWeather) ;
    const {lat,lon} = formatted ;
    const formattedForecast = await getWeatherData("onecall",{
        lat,lon,exclude:"current,minutely,alerts",units:params.units}).then(formatForecast);

    return {...formatted,...formattedForecast} ;

} ;

const formatToLocalTime = (secs,zone,format="cccc,dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


const iconURLFromCode = (code)=>`http://openweathermap.org/img/wn/${code}@2x.png` ;
// http://openweathermap.org/img/wn/01d@2x.png

export default getFormattedWeatherData ;
export {formatToLocalTime,iconURLFromCode} ;


