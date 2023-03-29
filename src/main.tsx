import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layouts/index";
import AppRoutes from "@/router/AppRoutes";
import routerConfig from "@/router/index";
import AppRouter from "@/router/index";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <AppRouter />
    </Layout>
  </React.StrictMode>
);
