import { useEffect } from "react";
import { useMap } from "react-leaflet";

function ChangeMapView({ lat, long }: { lat: number; long: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, long], map.getZoom());
  }, [lat, long]);
  return null;
}

export default ChangeMapView;
