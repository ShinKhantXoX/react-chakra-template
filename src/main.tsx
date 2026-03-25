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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppAbilityProvider } from "./ability/AppAbilityProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Provider store={stores}>
          <AppAbilityProvider>
            <Toaster />
            <ServiceProvider>
              <RouterProvider router={router} />
            </ServiceProvider>
          </AppAbilityProvider>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
