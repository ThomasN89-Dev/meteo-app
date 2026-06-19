import type { WeatherData } from "@/models/model";
import { useEffect, useState } from "react";

const useWeather = (searchLocation: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (searchLocation === null || searchLocation === "") {
        return;
      }
      const geoCodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchLocation}&count=10&language=it&format=json`;
      const geoResponse = await fetch(geoCodingUrl);
      const geoData = await geoResponse.json();
      console.log(geoData);

      const location = geoData.results[0].name;
      const latitude = geoData.results[0].latitude;
      const longitude = geoData.results[0].longitude;

      const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
      const response = await fetch(meteoUrl);
      const data = await response.json();
      console.log(data);

      setWeather({
        location: location,
        temperature: data.current.temperature_2m,
        time: data.current.time,
      });
    };

    fetchWeather();
  }, [searchLocation]);

  return { weather };
};

export default useWeather;
