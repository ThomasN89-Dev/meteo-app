import type { DailyWeather } from "@/models/model";
import ForecastCard from "./ForecastCard";

function ForecastContainer({ forecast }: { forecast: DailyWeather[] }) {
  return (
    <div className="w-full flex flex-col gap-4">
      {forecast.map((day) => (
        <ForecastCard forecastCardProps={day} key={day.time} />
      ))}
    </div>
  );
}

export default ForecastContainer;
