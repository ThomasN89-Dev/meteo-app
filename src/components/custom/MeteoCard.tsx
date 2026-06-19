import type { WeatherData, WeatherUnitData } from "@/models/model";
import { Card, CardContent, CardTitle } from "../ui/card";
import dayjs from "dayjs";
import type { ReactNode } from "react";
import {
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudyIcon,
  SunIcon,
} from "lucide-react";

function MeteoCard({
  weatherData,
  weatherUnits,
}: {
  weatherData: WeatherData;
  weatherUnits: WeatherUnitData;
}) {
  const parseData = dayjs(weatherData.time).format("DD/MM/YYYY HH:mm");

  const wmoDescription: Record<number, ReactNode> = {
    0: <SunIcon />,
    1: <CloudyIcon />,
    2: <CloudyIcon />,
    3: <CloudyIcon />,
    45: <CloudFog />,
    48: <CloudFog />,
    61: <CloudRain />,
    63: <CloudRain />,
    65: <CloudRain />,
    71: <CloudSnow />,
    73: <CloudSnow />,
    75: <CloudSnow />,
    95: <CloudLightning />,
  };
  return (
    <Card className="w-full max-w-96 p-4 flex flex-col items-center">
      <CardTitle className="flex justify-between w-full">
        <h2>{weatherData.location}</h2>{" "}
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
