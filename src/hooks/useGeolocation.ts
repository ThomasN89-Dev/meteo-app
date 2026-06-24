import { useEffect, useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useGeoLocation = (skip: boolean = false) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!skip);

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
    if (skip) return;
    navigator.geolocation.getCurrentPosition(success, error);
  }, [skip]);

  return { coordinates, isLoading };
};

export default useGeoLocation;
