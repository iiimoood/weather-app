import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = (props) => {
  const [cityData, setCityData] = useState();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    setError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=803bc0c1cfdb4326cbf4e0241763c0e9&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          console.log(data);
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setCityData(weatherData);
          setPending(false);
        });
      } else {
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      {cityData && !pending && !error && <WeatherSummary {...cityData} />}
      {error && <ErrorBox />}
      {!error && pending && <Loader />}
    </section>
  );
};

export default WeatherBox;
