import type { WeatherData } from "@/models/model";
import { Card, CardContent, CardTitle } from "../ui/card";
import dayjs from "dayjs";

function MeteoCard({ weatherData }: { weatherData: WeatherData }) {
  const parseData = dayjs(weatherData.time).format("DD/MM/YYYY");
  return (
    <Card>
      <CardTitle>{weatherData.location}</CardTitle>
      <CardContent>
        <p>{weatherData.temperature}</p>
        <p>{parseData}</p>
      </CardContent>
    </Card>
  );
}

export default MeteoCard;
