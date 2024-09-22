
import './App.css';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api.js';
import '../src/components/ToggleButton/ToggleButton.css';
import ToggleButton from './components/ToggleButton/ToggleButton.js';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather.js';
import Forecast from './components/forecast/forecast.js';
import PullToRefresh from './components/Refreshfunctionality';
import { useState, useEffect } from 'react';
// import UseOnlineStatus from '../src/components/OnlineStatusCheck'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [lastSearch, setLastSearch] = useState({});
  // const isOnline = UseOnlineStatus()

  useEffect(() => {
    const storedWeather = localStorage.getItem('currentWeather');
    const storedForecast = localStorage.getItem('forecast');
    const storedLastSearch = localStorage.getItem('lastSearch');
    if (storedWeather && storedForecast && storedLastSearch) {
      setCurrentWeather(JSON.parse(storedWeather));
      setForecast(JSON.parse(storedForecast));
      setLastSearch(JSON.parse(storedLastSearch));
    }
  }, []);
  console.log("noorain", lastSearch)

  const handleOnSearchChange = (searchData) => {

    console.log("kokok", searchData)
    const [lat, lon] = searchData.value.split(' ');
    console.log("Latitude:", lat, "Longitude:", lon);

    const CurrentWeatherfetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([CurrentWeatherfetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        const currentWeatherData = { city: searchData.label, ...weatherResponse };
        const forecastData = { city: searchData.label, ...forecastResponse };

        setCurrentWeather(currentWeatherData);
        setForecast(forecastData);
        setLastSearch({ lat, lon, name: searchData.label });

        // Save to localStorage
        localStorage.setItem('currentWeather', JSON.stringify(currentWeatherData));
        localStorage.setItem('forecast', JSON.stringify(forecastData));
        localStorage.setItem('lastSearch', JSON.stringify({ lat, lon, name: searchData.label }));
      })
      .catch((err) => {
        console.log(err);

        const storedWeather = localStorage.getItem('currentWeather');
        const storedForecast = localStorage.getItem('forecast');
        if (storedWeather && storedForecast) {
          setCurrentWeather(JSON.parse(storedWeather));
          setForecast(JSON.parse(storedForecast));
        }
      });
  };

  const handleUnitToggle = (newUnit) => {
    setUnit(newUnit === 'Celsius' ? 'metric' : 'imperial');
  };

  return (
    <div className="container">
      <PullToRefresh onRefresh={handleOnSearchChange} city={lastSearch} />
      <div className="main-header">
        <Search onSearchChange={handleOnSearchChange} lastSearch={lastSearch} />
        <ToggleButton onToggle={handleUnitToggle} />
      </div>
      {currentWeather && <CurrentWeather data={currentWeather} unit={unit} />}
      {forecast && <Forecast data={forecast} unit={unit} />}
    </div>
  );
}

export default App;







