import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/ThemeSwitch.tsx";
import dayjs from "dayjs";
import "dayjs/locale/it.js";
import AppRoutes from "./routes/routes.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

dayjs.locale("it");
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <StrictMode>
        <AppRoutes />
        <Toaster />
      </StrictMode>
    </ThemeProvider>
  </QueryClientProvider>,
);
