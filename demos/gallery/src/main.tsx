import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { App } from "./App.tsx";

import "@hpcc-js/common/font-awesome/css/font-awesome.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </StrictMode>
);
