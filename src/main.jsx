import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { setTheme } from "./utils/theme";


// Init theme globally (single source of truth)
const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";
document.documentElement.classList.toggle("dark", initialTheme === "dark");
localStorage.setItem("theme", initialTheme);
const saved = localStorage.getItem("theme") || "light";
setTheme(saved);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);