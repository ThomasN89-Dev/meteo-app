import ChangeMapView from "@/components/custom/ChangeMapView";
import Loader from "@/components/custom/Loader";
import SearchBar from "@/components/custom/SearchBar";
import useGeoLocation from "@/hooks/useGeolocation";
import useReverseGeocoding from "@/hooks/useReverseGeocoding";
import useWeather from "@/hooks/useWeather";
import type { Coordinates, FavoriteModel, WeatherDataComplete } from "@/models/model";
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
  const [clickedCoords, setClickedCoords] = useState<Coordinates | null>(null);
  const reverseGeocoding = useReverseGeocoding(clickedCoords);
  const activePlace = searchedPlace ?? reverseGeocoding.data ?? null;
  const weatherData = useWeather(activePlace);

  const handleMapClick = (lat: number, long: number) => {
    setSearchedPlace(null);
    setClickedCoords({ latitude: lat, longitude: long });
  };

  const lat = coordinates?.latitude;
  const long = coordinates?.longitude;

  const renderPopup = (weather: WeatherDataComplete) => {
    return (
      <div>
        <h2 className="text-xl font-bold">{weather.weather.location}</h2>
        <div className="border-t-2 border-black">
          <p>
            Temperatura:
            {weather.weather.temperature}
            {weather.weatherUnits.temperature}
          </p>
          <p>
            Unidità:
            {weather.weather.humidity}
            {weather.weatherUnits.humidity}{" "}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <SearchBar defaultSearch={location} onLocationFound={(place) => {
        setClickedCoords(null);
        setSearchedPlace(place);
      }} />

      {!coordinates ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <MapContainer
          center={[lat!, long!]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-150 w-full"
        >
          <ChangeMapView
            lat={activePlace?.latitude ?? lat!}
            long={activePlace?.longitude ?? long!}
            onMapClick={handleMapClick}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {activePlace && (
            <Marker
              position={[activePlace.latitude, activePlace.longitude]}
            >
              {weatherData.data && (
                <Popup>{renderPopup(weatherData.data)}</Popup>
              )}
            </Marker>
          )}
        </MapContainer>
      )}
    </>
  );
}

export default WeatherMap;
