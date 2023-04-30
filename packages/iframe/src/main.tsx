import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { NodeProvider } from "./nodes/NodeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NodeProvider>
      <App />
    </NodeProvider>
  </React.StrictMode>
);
