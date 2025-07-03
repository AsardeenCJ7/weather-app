import "./App.css";
// import images
import searchIcons from "./assets/images/search.png";
import clearIcons from "./assets/images/clear.png";
import cloudIcons from "./assets/images/cloud.png";
import drizzleIcons from "./assets/images/drizzle.png";
import rainIcons from "./assets/images/rain.png";
import windIcons from "./assets/images/wind.png";
import snowIcons from "./assets/images/snow.png";
import humidityIcons from "./assets/images/humidity.png";
import { useEffect, useState } from "react";

const WhetherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  wind,
  humidity,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>
      <div className="temp">{temp}°C</div>{" "}
      {/* Hold Alt + 0176 for Celsius Icon */}
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>

        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcons} alt="humidity" className="icon" />
          <div className="data">
            <div className="humitidy-percent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcons} alt="windIcon" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} Km/h</div>
            <div className="text">windSpeed</div>
          </div>
        </div>
      </div>
    </>
  );
};

//This is also same method
// const WhetherDetails = (props) => {
//const { icon } = props;
//   return (
//     <>
//       <div className="image">
//         <img src={icon} alt="icon" />
//       </div>
//     </>
//   );
// };

function App() {
  const [icon, setIcon] = useState(drizzleIcons);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Colombo");
  const [text, setText] = useState("Colombo");
  const [country, setCountry] = useState("LK");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [wind, setWind] = useState(5);
  const [humidity, setHumitidy] = useState(85);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcons,
    "01n": clearIcons,
    "02d": cloudIcons,
    "02n": cloudIcons,
    "03d": drizzleIcons,
    "03n": drizzleIcons,
    "04d": drizzleIcons,
    "04n": drizzleIcons,
    "09d": rainIcons,
    "09n": rainIcons,
    "10d": rainIcons,
    "10n": rainIcons,
    "13d": snowIcons,
    "13n": snowIcons,
  };

  //  "weather": [
  // {
  //   "id": 500,
  //   "main":"Rain",
  //   "description": "light rain",
  //   "icon": "10n"
  // }
  // ], here Array data - weather[0].icon API Call    (const weatherIconCode = data.weather[0].icon)

  function changeHandler(e) {
    setText(e.target.value); // ✅ This tracks user input
    // setCity(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    setLoading(true);
    const api_key = "2f4e047320c62a007f15ed7081bf700e";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.cod === "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumitidy(data.main.humidity);
      setWind(data.wind.speed);
      setCountry(data.sys.country);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setLat(data.coord.lat);
      setLog(data.coord.lon);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcons);
      console.log(weatherIconMap[weatherIconCode]);
      console.log(weatherIconCode); // 4d
      setCityNotFound(false);
    } catch (error) {
      console.log("An error occured", error.message);
      setError("An error occured While fetching weathe data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={changeHandler}
            onKeyDown={handleKeyDown}
          />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={searchIcons} alt="search" />
          </div>
        </div>
        {!loading && !cityNotFound && (
          <WhetherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={log}
            wind={wind}
            humidity={humidity}
          />
        )}

        {loading && <div className="loading-message">Loading....</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}
        <p className="copyright">
          Designed by <span>AsardeenDev7</span>
        </p>
      </div>
    </>
  );
}

export default App;
