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
  return (
    <Card className="w-full ">
      <CardTitle className="flex items-center justify-between px-6 py-3">
        <p className="flex-1">{parseTime}</p>
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
