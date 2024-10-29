import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "@/router/index";
import env from "./utils/env";
// https://www.npmjs.com/package/pepjs
import "pepjs";
import "./styles/lib.scss";
import "./styles/global.scss";
import "./styles/common.scss";

async function beforeRender() {
  if (!env.isDev()) {
    return;
  }

  const { worker } = await import("../mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

beforeRender().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement, {
    onUncaughtError: (error, errorInfo) => {
      console.error(error);
    },
    onCaughtError: (error, errorInfo) => {
      console.error(error);
    },
  }).render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>,
  );
});
