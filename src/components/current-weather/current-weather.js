
import "./current-weather.css"

const CurrentWeather = ({ data, unit }) => {

  const getTemperature = (temp) => {
    return unit === 'imperial' ? Math.round(temp * (9 / 5) + 32) : Math.round(temp);
  };


  if (!data || !data.main || !data.weather) {
    return <p>Data is not available. Please try again later.</p>;
  }

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>

        <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
      </div>

      <div className="bottom">
        <p className="temperature">{getTemperature(data.main.temp)}°{unit === 'imperial' ? 'F' : 'C'}</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Feels Like</span>
            <span className="parameter-value">{getTemperature(data.main.feels_like)}°{unit === 'imperial' ? 'F' : 'C'}</span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

