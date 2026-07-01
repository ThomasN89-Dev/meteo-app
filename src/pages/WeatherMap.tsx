import ChangeMapView from "@/components/custom/ChangeMapView";
import Loader from "@/components/custom/Loader";
import SearchBar from "@/components/custom/SearchBar";
import useGeoLocation from "@/hooks/useGeolocation";
import type { FavoriteModel } from "@/models/model";
import { useState } from "react";
import { Marker, Popup, TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { useParams } from "react-router";

function WeatherMap() {
  const { location } = useParams();
  const { coordinates } = useGeoLocation();
  const [searchedPlace, setSearchedPlace] = useState<FavoriteModel | null>(
    null,
  );
  const lat = coordinates?.latitude;
  const long = coordinates?.longitude;

  return (
    <>
      <SearchBar defaultSearch={location} onLocationFound={setSearchedPlace} />

      {!coordinates ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <MapContainer
          center={[lat!, long!]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-125 w-full"
        >
          {searchedPlace && (
            <ChangeMapView
              lat={searchedPlace.latitude}
              long={searchedPlace.longitude}
            />
          )}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OWM_API_KEY}`}
          />
          {searchedPlace && (
            <Marker
              position={[searchedPlace.latitude, searchedPlace.longitude]}
            >
              <Popup>{searchedPlace.location}</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </>
  );
}

export default WeatherMap;
