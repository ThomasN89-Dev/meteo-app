import ForecastContainer from "@/components/custom/ForecastContainer";
import HourlyForecastContainer from "@/components/custom/HourlyForecastContainer";
import Loader from "@/components/custom/Loader";
import MeteoCard from "@/components/custom/MeteoCard";
import SearchBar from "@/components/custom/SearchBar";
import { useFavoriteStore } from "@/context/FavoriteStore";
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
  const [searchedPlace, setSearchedPlace] = useState<FavoriteModel | null>(null);

  const usingGeolocation = !searchedPlace && !location;
  const { coordinates } = useGeoLocation(!usingGeolocation);
  const reverseGeocoding = useReverseGeocoding(coordinates);
  const place = searchedPlace ?? reverseGeocoding.data ?? null;
  const weatherData = useWeather(place);
  const weather = weatherData.data;

  const isLoading =
    weatherData.isLoading || (usingGeolocation && reverseGeocoding.isLoading);
  const onAddFavorite = useFavoriteStore((state) => state.onAddFavorite);
  const onAddFavoriteLocation = (favoriteLocation: FavoriteModel) => {
    const added = onAddFavorite(favoriteLocation);
    if (added) {
      toast(`${favoriteLocation.location} salvato nei preferiti`, {
        position: "top-center",
      });
    } else {
      toast(`${favoriteLocation.location} già presente nei preferiti`, {
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
          <SearchBar onLocationFound={setSearchedPlace} defaultSearch={location} />
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
            {weather?.dailyWeather && weather?.weatherUnits.temperature && (
              <ForecastContainer
                forecast={weather.dailyWeather}
                tempUnit={weather?.weatherUnits.temperature}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default CurrentMeteo;
