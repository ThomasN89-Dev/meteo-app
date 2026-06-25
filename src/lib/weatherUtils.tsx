import type { ReactNode } from "react";
import {
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudyIcon,
  SunIcon,
} from "lucide-react";

export const wmoDescription: Record<number, ReactNode> = {
  0: <SunIcon />,
  1: <CloudyIcon />,
  2: <CloudyIcon />,
  3: <CloudyIcon />,
  45: <CloudFog />,
  48: <CloudFog />,
  51: <CloudDrizzle />,
  53: <CloudDrizzle />,
  55: <CloudDrizzle />,
  56: <CloudDrizzle />,
  57: <CloudDrizzle />,
  61: <CloudRain />,
  63: <CloudRain />,
  65: <CloudRain />,
  66: <CloudRain />,
  67: <CloudRain />,
  71: <CloudSnow />,
  73: <CloudSnow />,
  75: <CloudSnow />,
  77: <CloudSnow />,
  80: <CloudRain />,
  81: <CloudRain />,
  82: <CloudRain />,
  85: <CloudSnow />,
  86: <CloudSnow />,
  95: <CloudLightning />,
  96: <CloudHail />,
  99: <CloudHail />,
};

import sunnyDay from "@/assets/sunny-day.jpg";
import cloudySky from "@/assets/cloudy-sky.jpg";
import fog from "@/assets/fog.jpg";
import drizzle from "@/assets/drizzle.jpg";
import rain from "@/assets/rain.jpg";
import snow from "@/assets/snow.jpg";
import thunderstorm from "@/assets/thunderstorm.jpg";
import cloudHail from "@/assets/cloud-hail.jpg";

const wmoBackground: Record<number, string> = {
  0: sunnyDay,
  1: sunnyDay,
  2: cloudySky,
  3: cloudySky,
  45: fog,
  48: fog,
  51: drizzle,
  53: drizzle,
  55: drizzle,
  56: drizzle,
  57: drizzle,
  61: rain,
  63: rain,
  65: rain,
  66: rain,
  67: rain,
  71: snow,
  73: snow,
  75: snow,
  77: snow,
  80: rain,
  81: rain,
  82: rain,
  85: snow,
  86: snow,
  95: thunderstorm,
  96: cloudHail,
  99: cloudHail,
};

export function getWeatherBackground(wmoCode: number): string {
  return wmoBackground[wmoCode] ?? sunnyDay;
}
