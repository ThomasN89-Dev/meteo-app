import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/ThemeSwitch.tsx";
import dayjs from "dayjs";
import "dayjs/locale/it.js";
import { FavoriteProvider } from "./context/FavoritesContext.tsx";
import AppRoutes from "./routes/routes.tsx";

dayjs.locale("it");
createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <FavoriteProvider>
      <StrictMode>
        <AppRoutes />
      </StrictMode>
    </FavoriteProvider>
  </ThemeProvider>,
);
