import React from "react"
import ReactDOM from "react-dom/client"
import "rsuite/dist/rsuite.min.css"
import "./styles/index.css"

import App from "./screens/_App"
import reportWebVitals from "./helpers/default/reportWebVitals"
import { X32ContextProvider } from "./contexts/X32Context"
import { ConnectFormContextProvider } from "./contexts/ConnectFormContext"

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(
  <React.StrictMode>
    <ConnectFormContextProvider>
      <X32ContextProvider>
        <App />
      </X32ContextProvider>
    </ConnectFormContextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
