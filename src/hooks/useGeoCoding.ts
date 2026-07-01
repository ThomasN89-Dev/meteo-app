import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface GeocodingResult {
  location: string;
  latitude: number;
  longitude: number;
}

const useGeocoding = (searchLocation: string) => {
  return useQuery<GeocodingResult>({
    queryKey: ["geocoding", searchLocation],
    queryFn: async () => {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchLocation)}&count=10&language=it&format=json`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.results?.length) {
        toast(`Località non trovata`, {
          position: "top-center",
          style: { background: "red", color: "white" },
        });
        throw new Error("Località non trovata");
      }

      return {
        location: data.results[0].name,
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
      };
    },
    enabled: searchLocation !== "" && searchLocation !== null,
    retry: false,
  });
};

export default useGeocoding;
