import type { ReactNode } from "react";
import {
  CloudFog,
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
  61: <CloudRain />,
  63: <CloudRain />,
  65: <CloudRain />,
  71: <CloudSnow />,
  73: <CloudSnow />,
  75: <CloudSnow />,
  80: <CloudRain />,
  81: <CloudRain />,
  82: <CloudRain />,
  95: <CloudLightning />,
};
