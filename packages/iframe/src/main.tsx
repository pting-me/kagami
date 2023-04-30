import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { NodesProvider } from "./nodes/NodesContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NodesProvider>
      <App />
    </NodesProvider>
  </React.StrictMode>
);
