import ForecastContainer from "@/components/custom/ForecastContainer";
import HourlyForecastContainer from "@/components/custom/HourlyForecastContainer";
import Loader from "@/components/custom/Loader";
import MeteoCard from "@/components/custom/MeteoCard";
import SearchBar from "@/components/custom/SearchBar";
import { useFavorite } from "@/context/FavoritesContext";
import useGeocoding from "@/hooks/useGeoCoding";
import useGeoLocation from "@/hooks/useGeolocation";
import useReverseGeocoding from "@/hooks/useReverseGeocoding";
import useWeather from "@/hooks/useWeather";
import { getWeatherBackground } from "@/lib/weatherUtils";
import type { FavoriteModel } from "@/models/model";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

function CurrentMeteo() {
  const { location } = useParams();
  const [searchLocation, setSearchLocation] = useState<string>(
    location ? location : "",
  );
  const { dispatch, state } = useFavorite();
  const { coordinates } = useGeoLocation(searchLocation !== "");
  const geoCoding = useGeocoding(searchLocation);
  const reverseGeocoding = useReverseGeocoding(coordinates);
  const place =
    (searchLocation !== "" ? geoCoding.data : reverseGeocoding.data) ?? null;
  const weatherData = useWeather(place);
  const weather = weatherData.data;

  const handleSearch = (location: string) => {
    setSearchLocation(location.trim());
  };
  const isLoading =
    weatherData.isLoading || geoCoding.isLoading || reverseGeocoding.isLoading;
  const onAddFavoriteLocation = (favoriteLocation: FavoriteModel) => {
    if (
      state.favorites.some(
        (f) =>
          f.latitude === favoriteLocation.latitude &&
          f.longitude === favoriteLocation.longitude,
      )
    ) {
      return toast(`${favoriteLocation.location} già presente nei preferiti`, {
        position: "top-center",
      });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: favoriteLocation });
      toast(`${favoriteLocation.location} salvato nei preferiti`, {
        position: "top-center",
      });
    }
  };
  const backgroundImage = weather?.weather
    ? getWeatherBackground(weather?.weather.wmoCode)
    : undefined;

  return (
    <>
      <div
        className="w-full min-h-screen flex flex-col items-center px-6 pb-10 bg-accent bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={
          backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}
        }
      >
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            {weather && weather.weatherUnits && place && (
              <MeteoCard
                weatherData={weather.weather}
                weatherUnits={weather.weatherUnits}
                onAddFavorite={() => onAddFavoriteLocation(place)}
              />
            )}
            {weather?.hourlyWeather && (
              <HourlyForecastContainer hourlyForecast={weather.hourlyWeather} />
            )}
            {weather?.dailyWeather && (
              <ForecastContainer forecast={weather.dailyWeather} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default CurrentMeteo;
