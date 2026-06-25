import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useGeoLocation = (skip: boolean = false) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!skip);

  const renderError = (errorCode: number) => {
    switch (errorCode) {
      case 1:
        return toast(
          "Posizione non disponibile. Si prega di concedere i permessi o passare alla ricerca manuale",
          {
            position: "top-center",
            style: { background: "red", color: "white" },
          },
        );
      case 2:
        return toast(
          "Recupero della posizione non riuscita. Si prega di passare alla ricerca manuale",
          {
            position: "top-center",
            style: { background: "red", color: "white" },
          },
        );
      case 3:
        return toast(
          "Tempo scaduto. Si prega di passare alla ricerca manuale",
          {
            position: "top-center",
            style: { background: "red", color: "white" },
          },
        );
    }
  };

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };

    function success(pos: GeolocationPosition) {
      const crd = pos.coords;

      setCoordinates({
        latitude: crd.latitude,
        longitude: crd.longitude,
      });
      setIsLoading(false);
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      renderError(err.code);
      setIsLoading(false);
    }
    if (skip) return;
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [skip]);

  return { coordinates, isLoading };
};

export default useGeoLocation;
