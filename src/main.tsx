import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

// Register PWA service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("PWA Service Worker registered: ", registration);

        // Check for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New content is available, refresh the page
                window.location.reload();
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log(
          "PWA Service Worker registration failed: ",
          registrationError,
        );
      });
  });
}

// Create a context for network status
export const NetworkStatusContext = React.createContext({
  isOnline: navigator.onLine,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NetworkStatusContext.Provider value={{ isOnline: navigator.onLine }}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </NetworkStatusContext.Provider>
  </React.StrictMode>,
);
