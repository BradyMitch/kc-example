import "css/common.css";

import { KeycloakProvider } from "@bcgov/kc-react";
import AppRouter from "AppRouter";
import React from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "state/providers";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <KeycloakProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </KeycloakProvider>
  </React.StrictMode>
);
