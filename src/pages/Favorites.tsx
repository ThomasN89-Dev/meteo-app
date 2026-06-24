import FavoriteCard from "@/components/custom/FavoriteCard";
import { useFavorite } from "@/context/FavoritesContext";
import type { FavoriteModel } from "@/models/model";
import { useNavigate } from "react-router";

function Favorites() {
  const { state, dispatch } = useFavorite();
  const navigate = useNavigate();

  const navigateToLocation = (location: string) => {
    navigate(`/favorites/${location}`);
  };

  const removeFavorite = (favorite: FavoriteModel) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: favorite });
  };
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center bg-accent p-6">
      {state.favorites.map((f) => (
        <FavoriteCard
          location={f.location}
          key={f.location}
          navigateLocation={() => navigateToLocation(f.location)}
          removeFavorite={() => removeFavorite(f)}
        />
      ))}
    </div>
  );
}

export default Favorites;
