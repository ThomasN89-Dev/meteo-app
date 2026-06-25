import dayjs from "dayjs";
import { Card, CardTitle } from "../ui/card";
import type { DailyWeather } from "@/models/model";
import { wmoDescription } from "@/lib/weatherUtils";

function ForecastCard({
  forecastCardProps,
}: {
  forecastCardProps: DailyWeather;
}) {
  const parseTime = dayjs(forecastCardProps.time).format("DD/MM/YYYY");
  const parseDay = dayjs(forecastCardProps.time).format("dddd");

  const capitalizedDay = parseDay.charAt(0).toUpperCase() + parseDay.slice(1);
  return (
    <Card className="w-full backdrop-blur-xl bg-white/60 dark:bg-black/50 border border-white/30 shadow-lg">
      <CardTitle className="flex items-center justify-between px-6 py-3">
        <div className="flex-1">
          <p>{parseTime}</p>
          <p>{capitalizedDay}</p>
        </div>
        <p className="flex-1 flex justify-center">
          {wmoDescription[forecastCardProps.wmoCode]}
        </p>
        <div className="flex-1">
          <p>Minima: {forecastCardProps.tempMin} °C</p>
          <p>Massima: {forecastCardProps.tempMax} °C</p>
        </div>
      </CardTitle>
    </Card>
  );
}

export default ForecastCard;
