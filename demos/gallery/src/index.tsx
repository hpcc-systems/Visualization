import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { App } from "./App.tsx";

export function main() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <FluentProvider theme={webLightTheme}>
        <App />
      </FluentProvider>
    </StrictMode>
  );
}
