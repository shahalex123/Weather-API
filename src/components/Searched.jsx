import React, { useEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import "./searched.css";
import Loader from "./Loader";

function Searched() {

  // declaring useStates here each work like a variable

  const [isload, setIsload] = useState(false);            //use to display loading circle 
  const [isSearch, setIsSearch] = useState("");           //use for city name
  const [apiArr, setApiArr] = useState({});              //use to copy whole arr coming from api
  const [weather, setWeather] = useState({});           //use for weather condition, weather icon, description of current weather
  const [weatherMain, setWeatherMain] = useState({});  //use for getting wind speed, temp, humidity etc
  
// useLoction is use to accept value coming from its calling page
// calling page use useNavigate to redirect from one to other page and also pass value (optional)
// here useNavigate which we use i use in Welcome.jsx page to redirect from welcome page to Searched.jsx page, aslo pass city name with it

  const location = useLocation();
  const [searchCity, setSearchCity] = useState(location.state.city);

  //it is use for side effect, its remember like calling fn
  useEffect(() => {Converter()}, [searchCity]);


// Converter fn help firstly to get city latitude and longitude further use for weather api 

  const Converter = async () => {
    setIsload(true);
    const geocodingUrl = "https://api.api-ninjas.com/v1/geocoding?city=" + searchCity;

      // passing api address with key using header method to get latitude and longitute of given city
    const fetchRes = await fetch(geocodingUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": "QUv2RDgyzFetIBvgj0gq7Q==2bti5QeytEi80k1Z",
      },
      contentType: "application/json",
    });

    const result = await fetchRes.json();

    // fetching weather api with the hepl of latitude and longitude present in result variable

    const webLink =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      result[0]?.latitude +
      "&lon=" +
      result[0]?.longitude;
    const key = "5ee0577a6005eccd24e8789462a91df8&units=metric";   //key for my weather api
    const url = webLink + "&APPID=" + key;

    const fetchedApi = await fetch(url);
    const res = await fetchedApi.json();
    setApiArr(res);
    setWeather(res.weather ? res.weather[0] : {});  // ternery condition shortcut of if-else
    setWeatherMain(res.main ? res.main : {});
    setIsload(false);
  };

  // fn to set searchCity variable value called by search button present with search-bar in this page at top

  const handleSearch = () => {
    setSearchCity(isSearch);
  };

  // return of the main fn called Searched()
  return (
    <div className="main">
      <div className="box">
        <div className="top-search-bar">
          <input
            type="text"
            placeholder="Search City"
            className="search-bar"
            required
            value={isSearch}
            onChange={(e) => setIsSearch(e.target.value)}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="weather-heading">
          <h3>Current Weather of {apiArr.name}</h3>
        </div>
        <div className="sec-1">
          <div className="left-sec-1">
            <div className="main-weather-report">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  {/* Current weather image given by api*/}
                  {weather.icon && (
                    <img
                      className="weather-icon"
                      src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                      alt="Weather Icon"
                    />
                  )}
                </div>
              </div>
              <div className="temp-sec">
                <p className="temp">{Math.floor(weatherMain.feels_like)}<span style={{position:'relative', bottom:'20px'}}>C</span></p>
                <p className="temp-cond">{weather.main}</p>
              </div>
              <div style={{ lineHeight: '1.3' }}>
                <h3>Weather</h3>
                <p>Humidity: {weatherMain.humidity} %</p>
                <p>Air Pressure: {weatherMain.pressure} hPa</p>
                <p>Overall: {weather.description}</p>
              </div>
            </div>
          </div>
          <div className="classMed">
            {isload && <Loader />}
          </div>
          <div className="right-sec-1">
            <div className="right-panel" style={{ lineHeight: '1.5', letterSpacing: '1.5px' }}>
              <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>Information</h2>
              <div style={{ padding: '30px', fontSize: '18px', fontWeight: '400' }}>
                <p>Cloud: {apiArr.clouds?.all}%</p>               {/*? mark means if .clouds is fetch then perform next */}
                <p>Visibility: {apiArr.visibility / 1000}km</p>  {/*coverting visibility value into km default value come in meter */}
                <p>Wind: {apiArr.wind?.speed} m/s</p>
                <p>Wind Direction: {apiArr.wind?.deg}deg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searched;
