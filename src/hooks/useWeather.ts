import type {
  WeatherData,
  WeatherUnitData,
  DailyWeather,
} from "@/models/model";
import { useEffect, useState } from "react";

const useWeather = (searchLocation: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherUnits, setWeatherUnits] = useState<WeatherUnitData | null>(
    null,
  );
  const [dailyWeather, setDailyWeather] = useState<DailyWeather[] | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (searchLocation === null || searchLocation === "") {
        return;
      }
      const geoCodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchLocation}&count=10&language=it&format=json`;
      const geoResponse = await fetch(geoCodingUrl);
      const geoData = await geoResponse.json();

      const location = geoData.results[0].name;
      const latitude = geoData.results[0].latitude;
      const longitude = geoData.results[0].longitude;

      const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=auto&daily=temperature_2m_max,temperature_2m_min,weather_code`;
      const response = await fetch(meteoUrl);
      const data = await response.json();
      const weatherData = data.current;
      const weatherUnitsData = data.current_units;
      const dailyTime = data.daily;

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

      setDailyWeather(dailyForecast);
      console.log(dailyForecast.shift());
    };

    fetchWeather();
  }, [searchLocation]);

  return { weather, weatherUnits, dailyWeather };
};

export default useWeather;
