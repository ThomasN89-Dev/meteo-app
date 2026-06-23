import type { HourlyWeather } from "@/models/model";
import HourlyForecast from "./HourlyForecast";

function HourlyForecastContainer({
  hourlyForecast,
}: {
  hourlyForecast: HourlyWeather[];
}) {
  return (
    <div className="w-full flex gap-2 overflow-x-auto mb-8">
      {hourlyForecast.map((day) => (
        <HourlyForecast hourlyWeatherData={day} key={day.time} />
      ))}
    </div>
  );
}

export default HourlyForecastContainer;
