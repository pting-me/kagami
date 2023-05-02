import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { NodeProvider } from "./nodes/NodeContext";
import { IS_MOCK } from "./utils/env";

if (IS_MOCK) {
  void import("../mock/figma.css");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NodeProvider>
      <App />
    </NodeProvider>
  </React.StrictMode>
);
