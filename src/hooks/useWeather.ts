import { type FavoriteModel, type WeatherDataComplete } from "@/models/model";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useWeather = (place: FavoriteModel | null) => {
  return useQuery<WeatherDataComplete>({
    queryKey: ["fetchWeather", place],
    queryFn: async () => {
      const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place!.latitude}&longitude=${place!.longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=auto&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=weather_code,temperature_2m`;
      const response = await fetch(meteoUrl);
      const data = await response.json();

      if (!data) {
        toast(`Recupero dati meteo non riuscito`, {
          position: "top-center",
          style: { background: "red", color: "white" },
        });
        throw new Error("Recupero dati meteo non riuscito");
      }

      const weatherData = data.current;
      const weatherUnitsData = data.current_units;
      const dailyTime = data.daily;
      const hourlyTime = data.hourly;

      const dailyForecast = dailyTime.time.map((time: string, i: number) => ({
        time: time,
        tempMax: dailyTime.temperature_2m_max[i],
        tempMin: dailyTime.temperature_2m_min[i],
        wmoCode: dailyTime.weather_code[i],
      }));
      const weekWeather = dailyForecast.slice(1);

      const hourlyForecast = hourlyTime.time.map((time: string, i: number) => ({
        time: time,
        temperature: hourlyTime.temperature_2m[i],
        wmoCode: hourlyTime.weather_code[i],
      }));
      const hourly24 = hourlyForecast.slice(0, 24);

      return {
        weather: {
          location: place!.location,
          temperature: weatherData.temperature_2m,
          time: weatherData.time,
          humidity: weatherData.relative_humidity_2m,
          windSpeed: weatherData.wind_speed_10m,
          wmoCode: weatherData.weather_code,
        },
        weatherUnits: {
          temperature: weatherUnitsData.temperature_2m,
          humidity: weatherUnitsData.relative_humidity_2m,
          windSpeed: weatherUnitsData.wind_speed_10m,
        },
        dailyWeather: weekWeather,
        hourlyWeather: hourly24,
      };
    },
    enabled: place !== null,
  });
};

export default useWeather;
