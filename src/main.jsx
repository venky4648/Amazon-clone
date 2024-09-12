import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </StrictMode>
);
