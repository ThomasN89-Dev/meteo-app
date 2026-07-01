import type { FavoriteCardProps } from "@/models/model";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import useFavoriteWeather from "@/hooks/useFavoriteWeather";

function FavoriteCard({
  location,
  latitude,
  longitude,
  navigateLocation,
  removeFavorite,
}: FavoriteCardProps) {
  const place = { latitude, longitude, location };
  const favoriteWeatherData = useFavoriteWeather(place);
  return (
    <Card className="w-full px-3" onClick={navigateLocation}>
      <CardTitle className="flex justify-between items-center">
        <div>
          <p> {location}</p>{" "}
          <p>
            {favoriteWeatherData.data?.temperature}{" "}
            {favoriteWeatherData.data?.temperatureUnit}
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
