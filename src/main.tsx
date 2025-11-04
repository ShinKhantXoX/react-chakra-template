import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ThemeProvider } from "@/components/ui/provider";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { stores } from "./stores";
import "./index.css";
import { router } from "./router.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { ServiceProvider } from "./shares/ServiceProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={stores}>
        <Toaster />
        <ServiceProvider>
          <RouterProvider router={router} />
        </ServiceProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
