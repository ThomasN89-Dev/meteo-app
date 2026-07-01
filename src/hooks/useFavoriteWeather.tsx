import type { FavoriteModel } from "@/models/model";
import { useQuery } from "@tanstack/react-query";

interface FavoriteCardProps {
  temperature: number;
  temperatureUnit: string;
}

const useFavoriteWeather = (place: FavoriteModel | null) => {
  return useQuery<FavoriteCardProps>({
    queryKey: ["fetchFavoriteWeather", place],
    queryFn: async () => {
      const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place!.latitude}&longitude=${place!.longitude}&current=temperature_2m`;
      const response = await fetch(meteoUrl);
      const data = await response.json();
      const temperature = data.current.temperature_2m;
      const temperatureUnit = data.current_units.temperature_2m;

      return {
        temperature: temperature,
        temperatureUnit: temperatureUnit,
      };
    },
    enabled: place !== null,
  });
};

export default useFavoriteWeather;
