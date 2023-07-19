import React from "react";
import ReactDOM from "react-dom/client";

import axios from "axios";
import App from "./App/App";
import "./App/Styles/App.css";
import "./index.css";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
