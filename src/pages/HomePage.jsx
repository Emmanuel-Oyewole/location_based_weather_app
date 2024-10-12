import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WeatherCard from "../components/Weather";
import { ClipLoader } from "react-spinners";

const HomePage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [coords, setCoords] = useState({
    lat: null,
    lon: null,
  });
  const [error, setError] = useState(null);
  const location = useLocation();
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  //Get user's location
  useEffect(() => {
    if (!searchTriggered && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setError("Error getting location", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [searchTriggered]);
  // Fetch weather date once coordinate are available
  useEffect(() => {
    if ((coords.lat, coords.lon)) {
      fetchWeatherData(coords.lat, coords.lon);
    }
  }, [coords]);
  // Fetch weather data based on search coordinates
  const fetchWeatherData = async (lat, lon) => {
    try {
      setIsLoading(true); // start loading
      const apiKey = import.meta.env.VITE_API_KEY;
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  //Handle query parameters from search page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lat = params.get("lat");
    const lon = params.get("lon");

    if (lat && lon) {
      setCoords({ lat, lon });
      setSearchTriggered(true); // Indicates that a search was triggered
      fetchWeatherData(lat, lon);
    }
  }, [location.search]);

  return (
    <div>
      <div className="flex items-center">
        {isloading ? (
          <ClipLoader color="white" loading={isloading} size={100} />
        ) : !weatherData ? (
          <p>{error}</p>
        ) : weatherData ? (
          <div className="">
            <WeatherCard data={weatherData} />
            <Link to="/search">
              <button>Search A Specific Location</button>
            </Link>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
