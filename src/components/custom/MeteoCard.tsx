import type { WeatherData, WeatherUnitData } from "@/models/model";
import { Card, CardContent, CardTitle } from "../ui/card";
import dayjs from "dayjs";

function MeteoCard({
  weatherData,
  weatherUnits,
}: {
  weatherData: WeatherData;
  weatherUnits: WeatherUnitData;
}) {
  const parseData = dayjs(weatherData.time).format("DD/MM/YYYY HH:mm");
  return (
    <Card className="w-full max-w-96 p-4 flex flex-col items-center">
      <CardTitle>{weatherData.location}</CardTitle>
      <CardContent>
        <p>
          Temperatura corrente: {weatherData.temperature}{" "}
          {weatherUnits.temperature}{" "}
        </p>
        <p>Data & ora: {parseData}</p>
        <p>
          Umidità: {weatherData.humidity} {weatherUnits.humidity}
        </p>
        <p>
          Vento: {weatherData.windSpeed} {weatherUnits.windSpeed}
        </p>
      </CardContent>
    </Card>
  );
}

export default MeteoCard;
