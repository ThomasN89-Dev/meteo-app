import { useState } from "react";

import SearchBar from "./components/custom/SearchBar";
import useWeather from "./hooks/useWeather";
import MeteoCard from "./components/custom/MeteoCard";
import Header from "./components/custom/Header";
import ForecastContainer from "./components/custom/ForecastContainer";

function App() {
  const [searchLocation, setSearchLocation] = useState<string>("");
  const { weather, weatherUnits, dailyWeather } = useWeather(searchLocation);

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
        {weather && weatherUnits ? (
          <MeteoCard weatherData={weather} weatherUnits={weatherUnits} />
        ) : (
          <p>Scegli una località...</p>
        )}
        {dailyWeather && <ForecastContainer forecast={dailyWeather} />}
      </div>
    </>
  );
}

export default App;
