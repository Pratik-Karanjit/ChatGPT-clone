import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import WowProject from "./WowProject";

ReactDOM.render(
  <BrowserRouter>

    <WowProject></WowProject>
    

  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();