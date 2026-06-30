import FavoriteCard from "@/components/custom/FavoriteCard";
import { useFavoriteStore } from "@/context/FavoriteStore";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Favorites() {
  const navigate = useNavigate();

  const navigateToLocation = (location: string) => {
    navigate(`/favorites/${location}`);
  };

  const favoriteLocations = useFavoriteStore((favorite) => favorite.favorites);
  const removeFavorite = useFavoriteStore(
    (favorite) => favorite.onRemoveFavorite,
  );

  const removeToast = (location: string) => {
    return toast(`${location} rimosso dai preferiti`, {
      position: "top-center",
    });
  };
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center bg-accent p-6">
      {favoriteLocations.length === 0 ? (
        <div className="flex flex-1 justify-center items-center h-full w-full">
          <p>Nessun preferito presente</p>
        </div>
      ) : (
        favoriteLocations.map((f) => (
          <FavoriteCard
            location={f.location}
            key={`${f.latitude} - ${f.longitude}`}
            navigateLocation={() => navigateToLocation(f.location)}
            removeFavorite={() => {
              removeFavorite(f);
              removeToast(f.location);
            }}
            latitude={f.latitude}
            longitude={f.longitude}
          />
        ))
      )}
    </div>
  );
}

export default Favorites;
