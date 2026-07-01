import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./components/custom/Header";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab =
    location.pathname === "/"
      ? "currentMeteo"
      : location.pathname.slice(1);

  return (
    <>
      <Header title="Meteo app" />
      <Tabs value={currentTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="currentMeteo" onClick={() => navigate("/")}>
            Meteo
          </TabsTrigger>
          <TabsTrigger value="favorites" onClick={() => navigate("/favorites")}>
            Preferiti
          </TabsTrigger>
          <TabsTrigger
            value="weather-map"
            onClick={() => navigate("/weather-map")}
          >
            Mappa meteorologica
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Outlet />
    </>
  );
}

export default App;
