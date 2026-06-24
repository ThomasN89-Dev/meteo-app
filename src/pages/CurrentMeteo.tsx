import ForecastContainer from "@/components/custom/ForecastContainer";
import HourlyForecastContainer from "@/components/custom/HourlyForecastContainer";
import Loader from "@/components/custom/Loader";
import MeteoCard from "@/components/custom/MeteoCard";
import SearchBar from "@/components/custom/SearchBar";
import { useFavorite } from "@/context/FavoritesContext";
import useWeather from "@/hooks/useWeather";
import type { FavoriteModel } from "@/models/model";
import { useState } from "react";
import { useParams } from "react-router";

function CurrentMeteo() {
  const { location } = useParams();
  const [searchLocation, setSearchLocation] = useState<string>(
    location ? location : "",
  );
  const { dispatch } = useFavorite();
  const {
    weather,
    weatherUnits,
    dailyWeather,
    hourlyWeather,
    isLoading,
    favoriteLocation,
  } = useWeather(searchLocation);

  const handleSearch = (location: string) => {
    setSearchLocation(location.trim());
  };

  const onAddFavoriteLocation = (favoriteLocation: FavoriteModel) => {
    dispatch({ type: "ADD_FAVORITE", payload: favoriteLocation });
  };
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center bg-accent px-6 pb-10">
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            {weather && weatherUnits && favoriteLocation && (
              <MeteoCard
                weatherData={weather}
                weatherUnits={weatherUnits}
                onAddFavorite={() => onAddFavoriteLocation(favoriteLocation)}
              />
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

export default CurrentMeteo;
