import { Card } from "semantic-ui-react";
import PropTypes from "prop-types";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json"; // Import the English locale
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiFog,
  WiHumidity,
} from "react-icons/wi";
import DateTime from "./DateTime";

// Register English language for full country names
countries.registerLocale(enLocale);

const WeatherCard = ({ data }) => {
  const temp = data.main.temp;
  const countryCode = data.sys.country;
  const condition = data.weather[0].main;

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny/>;
      case "Clouds":
        return <WiCloudy />;
      case "Rain":
        return <WiRain />;
      case "Snow":
        return <WiSnow />;
      case "Fog":
        return <WiFog />;
      default:
        return <WiCloudy />; // Default to cloudy if condition is unknown
    }
  };

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15); // Convert to Celsius and round to nearest integer
  };

  const getCountryName = (code) => {
    return countries.getName(code, "en"); // Convert country code to full name
  };

  if (!data) return <p>Loading weather data ....</p>;

  return (
    <Card className="">
      <Card.Content className="flex flex-col items-center h-screen w-screen">
        <div className="flex flex-col justify-between items-center mt-10 mb-7">
          <DateTime className={"text-white flex flex-col items-center mb-2"} />
          <p className="text-white font-quicksand ">
            {getCountryName(countryCode)}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-white">{condition}</p>
          <div className="mb-8">
            <span className="text-[13rem] text-white">
              {getWeatherIcon(condition)}
            </span>
            <span className="font-quicksand text-2xl text-white flex flex-col justify-center items-center">
              {data.weather[0].description}
            </span>
          </div>
          <span className="text-white text-6xl font-thin mb-9">
            {kelvinToCelsius(temp)}°
          </span>
        </div>
        <hr className="border-t-2 border-white w-64" />
        <div className="flex items-center text-white text-xs font-quicksand mt-4 gap-8 ">
          <div className="flex flex-col items-center">
            <WiHumidity className="text-4xl"/>
            <p>Humidity</p>
            <span>{data.main.humidity}%</span>
          </div>
          <div className="flex flex-col items-center">
            <WiHumidity className="text-4xl"/>
            <p>Pressure</p>
            <span>{data.main.pressure}</span>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

WeatherCard.propTypes = {
  data: PropTypes.object.isRequired,
};
export default WeatherCard;
