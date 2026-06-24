import { BrowserRouter, Route, Routes } from "react-router";
import App from "@/App";
import CurrentMeteo from "@/pages/CurrentMeteo";
import Favorites from "@/pages/Favorites";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<CurrentMeteo />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="favorites/:location" element={<CurrentMeteo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
