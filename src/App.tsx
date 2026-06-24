import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./components/custom/Header";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname === "/favorites" ? "favorites" : "currentMeteo";

  return (
    <>
      <Header title="Meteo app" />
      <Tabs value={currentTab}>
        <TabsList>
          <TabsTrigger value="currentMeteo" onClick={() => navigate("/")}>
            Meteo
          </TabsTrigger>
          <TabsTrigger value="favorites" onClick={() => navigate("/favorites")}>
            Preferiti
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Outlet />
    </>
  );
}

export default App;
