import type { WeatherData, WeatherUnitData } from "@/models/model";
import { Card, CardContent, CardTitle } from "../ui/card";
import dayjs from "dayjs";
import { wmoDescription } from "@/lib/weatherUtils";

function MeteoCard({
  weatherData,
  weatherUnits,
}: {
  weatherData: WeatherData;
  weatherUnits: WeatherUnitData;
}) {
  const parseData = dayjs(weatherData.time).format("dddd DD/MM/YYYY HH:mm");

  return (
    <Card className="w-full max-w-96 p-4 flex flex-col items-center my-8">
      <CardTitle className="flex justify-between w-full">
        <h2>{weatherData.location}</h2>
        <h2>{wmoDescription[weatherData.wmoCode]}</h2>
      </CardTitle>
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
