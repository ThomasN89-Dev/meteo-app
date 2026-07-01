import type { Coordinates } from "@/models/model";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface ReverseGeocodingResult {
  location: string;
  latitude: number;
  longitude: number;
}

const useReverseGeocoding = (coordinates: Coordinates | null) => {
  return useQuery<ReverseGeocodingResult | null>({
    queryKey: ["reverseGeoCoding", coordinates],
    queryFn: async () => {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&format=json`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data) {
        toast(`Impossibile trovare la posizione`, {
          position: "top-center",
          style: { background: "red", color: "white" },
        });
        throw new Error("Impossibile trovare la posizione");
      }

      function getLocation() {
        if (data.address.village && data.address.town) {
          return `${data.address.town} (${data.address.village})`;
        } else if (data.address.village && data.address.city) {
          return `${data.address.city} (${data.address.village})`;
        } else {
          return data.address.village || data.address.town || data.address.city;
        }
      }

      return {
        latitude: coordinates!.latitude,
        longitude: coordinates!.longitude,
        location: getLocation(),
      };
    },
    enabled: coordinates !== null,
  });
};

export default useReverseGeocoding;
