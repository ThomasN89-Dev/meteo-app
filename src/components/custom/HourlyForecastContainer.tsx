import type { HourlyWeather } from "@/models/model";
import HourlyForecast from "./HourlyForecast";
import dayjs from "dayjs";

function HourlyForecastContainer({
  hourlyForecast,
}: {
  hourlyForecast: HourlyWeather[];
}) {
  const currentHour = dayjs().hour();

  return (
    <div className="w-full flex gap-2 overflow-x-auto mb-8">
      {hourlyForecast
        .filter((day) => dayjs(day.time).hour() >= currentHour)
        .map((day) => (
          <HourlyForecast hourlyWeatherData={day} key={day.time} />
        ))}
    </div>
  );
}

export default HourlyForecastContainer;
