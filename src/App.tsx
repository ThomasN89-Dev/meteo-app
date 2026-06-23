import { useState } from "react";

import SearchBar from "./components/custom/SearchBar";
import useWeather from "./hooks/useWeather";
import MeteoCard from "./components/custom/MeteoCard";
import Header from "./components/custom/Header";
import ForecastContainer from "./components/custom/ForecastContainer";
import HourlyForecastContainer from "./components/custom/HourlyForecastContainer";
import Loader from "./components/custom/Loader";

function App() {
  const [searchLocation, setSearchLocation] = useState<string>("");
  const { weather, weatherUnits, dailyWeather, hourlyWeather, isLoading } =
    useWeather(searchLocation);

  const handleSearch = (location: string) => {
    setSearchLocation(location.trim());
  };

  return (
    <>
      <Header title="Meteo app" />
      <div className="w-full min-h-screen flex flex-col items-center bg-accent px-6 pb-10">
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            {weather && weatherUnits && (
              <MeteoCard weatherData={weather} weatherUnits={weatherUnits} />
            )}
            {hourlyWeather && (
              <HourlyForecastContainer hourlyForecast={hourlyWeather} />
            )}
            {dailyWeather && <ForecastContainer forecast={dailyWeather} />}
          </>
        )}
      </div>
    </>
  );
}

export default App;
