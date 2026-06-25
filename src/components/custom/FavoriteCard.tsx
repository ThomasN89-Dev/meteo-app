import type { FavoriteCardProps } from "@/models/model";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

function FavoriteCard({
  location,
  latitude,
  longitude,
  navigateLocation,
  removeFavorite,
}: FavoriteCardProps) {
  const [temp, setTemp] = useState<{
    temperature: number | null;
    temperatureUnit: string | null;
  }>({
    temperature: null,
    temperatureUnit: null,
  });
  useEffect(() => {
    const fetchFavoriteWeather = async () => {
      const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
      const response = await fetch(meteoUrl);
      const data = await response.json();
      const temperature = data.current.temperature_2m;
      const temperatureUnit = data.current_units.temperature_2m;

      setTemp({
        temperature,
        temperatureUnit,
      });
    };
    fetchFavoriteWeather();
  }, [latitude, longitude]);
  return (
    <Card className="w-full px-3" onClick={navigateLocation}>
      <CardTitle className="flex justify-between items-center">
        <div>
          <p> {location}</p>{" "}
          <p>
            {temp.temperature} {temp.temperatureUnit}
          </p>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            removeFavorite();
          }}
        >
          <Trash2Icon />
        </Button>
      </CardTitle>
    </Card>
  );
}

export default FavoriteCard;
