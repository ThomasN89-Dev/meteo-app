import FavoriteCard from "@/components/custom/FavoriteCard";
import { useFavorite } from "@/context/FavoritesContext";
import type { FavoriteModel } from "@/models/model";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Favorites() {
  const { state, dispatch } = useFavorite();
  const navigate = useNavigate();

  const navigateToLocation = (location: string) => {
    navigate(`/favorites/${location}`);
  };

  const removeFavorite = (favorite: FavoriteModel) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: favorite });
    toast(`${favorite.location} rimosso dai preferiti`, {
      position: "top-center",
    });
  };
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center bg-accent p-6">
      {state.favorites.length === 0 ? (
        <div className="flex flex-1 justify-center items-center h-full w-full">
          <p>Nessun preferito presente</p>
        </div>
      ) : (
        state.favorites.map((f) => (
          <FavoriteCard
            location={f.location}
            key={`${f.latitude} - ${f.longitude}`}
            navigateLocation={() => navigateToLocation(f.location)}
            removeFavorite={() => removeFavorite(f)}
            latitude={f.latitude}
            longitude={f.longitude}
          />
        ))
      )}
    </div>
  );
}

export default Favorites;
