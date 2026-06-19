import { useState } from "react";

import SearchBar from "./components/custom/SearchBar";
import useWeather from "./hooks/useWeather";
import MeteoCard from "./components/custom/MeteoCard";
import Header from "./components/custom/Header";

function App() {
  const [searchLocation, setSearchLocation] = useState<string>("");
  const { weather, weatherUnits } = useWeather(searchLocation);

  console.log(weather);

  const handleSearch = (location: string) => {
    setSearchLocation(location.trim());
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-accent px-6">
      <Header title="Meteo app" />
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      {weather && weatherUnits ? (
        <MeteoCard weatherData={weather} weatherUnits={weatherUnits} />
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
}

export default App;
