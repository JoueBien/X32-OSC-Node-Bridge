import App from "../App";
import React from "react";
import { createRoot } from "react-dom/client";

function render() {
  const domNode = document.getElementById("root");
  const root = createRoot(domNode as Element);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

render();
