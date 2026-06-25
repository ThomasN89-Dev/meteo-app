import type { HourlyWeather } from "@/models/model";
import { Card } from "../ui/card";
import dayjs from "dayjs";
import { wmoDescription } from "@/lib/weatherUtils";

function HourlyForecast({
  hourlyWeatherData,
}: {
  hourlyWeatherData: HourlyWeather;
}) {
  const parseTime = dayjs(hourlyWeatherData.time).format("HH:mm");

  return (
    <Card className="min-w-40 flex flex-col items-center p-4 backdrop-blur-xl bg-white/60 dark:bg-black/50 border border-white/30 shadow-lg">
      <p>{parseTime}</p>
      <p>{wmoDescription[hourlyWeatherData.wmoCode]}</p>
      <p>{hourlyWeatherData.temperature}</p>
    </Card>
  );
}

export default HourlyForecast;
