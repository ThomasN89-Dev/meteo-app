import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeSwitch.tsx";
import dayjs from "dayjs";
import "dayjs/locale/it.js";

dayjs.locale("it");
createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>,
);
