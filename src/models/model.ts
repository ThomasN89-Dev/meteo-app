export interface WeatherData {
  location: string;
  temperature: number;
  time: string;
}

export interface searchBarProps {
  onSearch: (location: string) => void;
}
