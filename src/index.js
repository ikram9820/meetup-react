import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MeetupContextProvider } from "./store/MeetupStore";
import { FavoriteContextProvoider } from "./store/FavoriteStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MeetupContextProvider>
    <FavoriteContextProvoider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoriteContextProvoider>
  </MeetupContextProvider>
);
