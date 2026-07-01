import type { DailyWeather } from "@/models/model";
import ForecastCard from "./ForecastCard";

function ForecastContainer({
  forecast,
  tempUnit,
}: {
  forecast: DailyWeather[];
  tempUnit: string;
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      {forecast.map((day) => (
        <ForecastCard
          forecastCardProps={day}
          key={day.time}
          tempUnit={tempUnit}
        />
      ))}
    </div>
  );
}

export default ForecastContainer;
