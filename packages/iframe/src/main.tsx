import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { MessageProvider } from "./messaging/MessageContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MessageProvider>
      <App />
    </MessageProvider>
  </React.StrictMode>
);
