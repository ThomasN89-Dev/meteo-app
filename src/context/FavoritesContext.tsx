import type { FavoriteModel } from "@/models/model";
import { createContext, useContext, useReducer } from "react";

type FavoriteAction = "ADD_FAVORITE" | "REMOVE_FAVORITE";
type Favorite = FavoriteModel;

interface FavoriteState {
  favorites: Favorite[];
}

interface FavoriteActionType {
  type: FavoriteAction;
  payload: Favorite;
}

interface FavoriteContextType {
  state: FavoriteState;
  dispatch: React.Dispatch<FavoriteActionType>;
}

const FavoriteContext = createContext<FavoriteContextType | null>(null);

function reducer(
  state: FavoriteState,
  action: FavoriteActionType,
): FavoriteState {
  switch (action.type) {
    case "ADD_FAVORITE": {
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites,
      };
    }
    case "REMOVE_FAVORITE": {
      const newFavorites = state.favorites.filter(
        (f) =>
          f.latitude !== action.payload.latitude ||
          f.longitude !== action.payload.longitude,
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites,
      };
    }
    default:
      return state;
  }
}

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const localStorageItems = localStorage.getItem("favorites");
  const [state, dispatch] = useReducer(reducer, {
    favorites: localStorageItems ? JSON.parse(localStorageItems) : [],
  });

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite deve essere usato dentro un FavoriteProvider");
  }
  return context;
}
