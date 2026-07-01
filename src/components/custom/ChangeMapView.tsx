import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

interface ChangeMapViewProps {
  lat: number;
  long: number;
  onMapClick?: (lat: number, long: number) => void;
}

function ChangeMapView({ lat, long, onMapClick }: ChangeMapViewProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, long], map.getZoom());
  }, [lat, long]);

  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  return null;
}

export default ChangeMapView;
