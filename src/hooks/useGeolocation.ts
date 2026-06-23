import { useEffect, useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useGeoLocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    setIsLoading(false);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { coordinates, isLoading };
};

export default useGeoLocation;
