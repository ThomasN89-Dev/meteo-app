import {
  type WeatherData,
  type WeatherUnitData,
  type DailyWeather,
  type HourlyWeather,
  type FavoriteModel,
} from "@/models/model";
import { useEffect, useState } from "react";
import useGeoLocation from "./useGeolocation";

const useWeather = (searchLocation: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherUnits, setWeatherUnits] = useState<WeatherUnitData | null>(
    null,
  );
  const [dailyWeather, setDailyWeather] = useState<DailyWeather[] | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[] | null>(
    null,
  );
  const [favoriteLocation, setFavoriteLocation] =
    useState<FavoriteModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { coordinates, isLoading: isGeoLoading } = useGeoLocation(searchLocation !== "");

  useEffect(() => {
    const fetchWeather = async () => {
      if (searchLocation === "" && isGeoLoading) {
        return;
      }
      setIsLoading(true);
      let latitude;
      let longitude;
      let location;
      if (searchLocation !== null && searchLocation !== "") {
        const geoCodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchLocation}&count=10&language=it&format=json`;
        const geoResponse = await fetch(geoCodingUrl);
        const geoData = await geoResponse.json();

        location = geoData.results[0].name;
        latitude = geoData.results[0].latitude;
        longitude = geoData.results[0].longitude;
      } else if (coordinates) {
        const placeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json`;
        const placeResponse = await fetch(placeUrl);
        const placeData = await placeResponse.json();

        latitude = coordinates.latitude;
        longitude = coordinates.longitude;
        location = placeData.address.town;
      } else {
        setIsLoading(false);
        return;
      }

      const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=auto&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=weather_code,temperature_2m`;
      const response = await fetch(meteoUrl);
      const data = await response.json();
      const weatherData = data.current;
      const weatherUnitsData = data.current_units;
      const dailyTime = data.daily;
      const hourlyTime = data.hourly;

      setWeather({
        location: location,
        temperature: weatherData.temperature_2m,
        time: weatherData.time,
        humidity: weatherData.relative_humidity_2m,
        windSpeed: weatherData.wind_speed_10m,
        wmoCode: weatherData.weather_code,
      });

      setWeatherUnits({
        temperature: weatherUnitsData.temperature_2m,
        humidity: weatherUnitsData.relative_humidity_2m,
        windSpeed: weatherUnitsData.wind_speed_10m,
      });

      const dailyForecast = dailyTime.time.map((time: string, i: number) => ({
        time: time,
        tempMax: dailyTime.temperature_2m_max[i],
        tempMin: dailyTime.temperature_2m_min[i],
        wmoCode: dailyTime.weather_code[i],
      }));
      const weekWeather = dailyForecast.slice(1);
      setDailyWeather(weekWeather);

      const hourlyForecast = hourlyTime.time.map((time: string, i: number) => ({
        time: time,
        temperature: hourlyTime.temperature_2m[i],
        wmoCode: hourlyTime.weather_code[i],
      }));
      const hourly24 = hourlyForecast.slice(0, 24);
      setHourlyWeather(hourly24);
      setFavoriteLocation({
        location: location,
        latitude: latitude,
        longitude: longitude,
      });
      setIsLoading(false);
    };

    fetchWeather();
  }, [coordinates, isGeoLoading, searchLocation]);

  return {
    weather,
    weatherUnits,
    dailyWeather,
    hourlyWeather,
    favoriteLocation,
    isLoading: isLoading || isGeoLoading,
  };
};

export default useWeather;
