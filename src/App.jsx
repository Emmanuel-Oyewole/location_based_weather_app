import  { useState, useEffect } from 'react';
import WeatherCard from './components/Weather';


const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [coords, setCoords] = useState(
    {
      lat: null,
      lon: null
    }
  );
  const [error, setError] = useState(null);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.error('Error fetching geolocation:', err);
          setError('Geolocation permission denied or not available.');
        }
      );
    } else {
      setError('Geolocation not supported by this browser.');
    }
  }, []);

  // Fetch weather data once coordinates are available
  useEffect(() => {
    if (coords.lat && coords.lon) {
      const fetchWeatherData = async () => {
        try {
          const apiKey = import.meta.env.VITE_API_KEY;
          const apiUrl = import.meta.env.VITE_API_URL;

          const response = await fetch(
            `${apiUrl}lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
          );
          const data = await response.json();
          console.log(data);
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching the weather data:', error);
        }
      };

      fetchWeatherData();
    }
  }, [coords]);

  return (
    <div
      style={{
        backgroundColor: '#00B4DB', // Fallback for old browsers
        backgroundImage: 'linear-gradient(to left, #0083B0, #00B4DB)', // Standard CSS
        background: '-webkit-linear-gradient(to left, #0083B0, #00B4DB)', // Fallback for older browsers like Chrome 10-25, Safari 5.1-6
      }}
      className='min-h-screen flex f justify-center items-center'>
        <div>
        {!weatherData ? (
          <p>{ error }</p>
        ) : weatherData ? (
            <div className='flex flex-col lg:flex-row md:flex-row'>
              <WeatherCard data={weatherData} />
            </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default App;
