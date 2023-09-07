import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "@/router/index";
// https://www.npmjs.com/package/pepjs
import "pepjs";
import "./styles/lib.scss";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
