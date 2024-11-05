import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Router from "./routes/index.tsx";
import Providers from "./components/provider/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Router />
    </Providers>
  </StrictMode>
);
