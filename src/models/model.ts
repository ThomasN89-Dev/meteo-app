export interface WeatherData {
  location: string;
  temperature: number;
  time: string;
  humidity: number;
  windSpeed: number;
  wmoCode: number;
}

export interface WeatherUnitData {
  temperature: string;
  humidity: string;
  windSpeed: string;
}

export interface DailyWeather {
  tempMin: number;
  tempMax: number;
  wmoCode: number;
  time: string;
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  wmoCode: number;
}

export interface searchBarProps {
  onSearch: (location: string) => void;
}
