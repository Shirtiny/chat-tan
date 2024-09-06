import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { internalIpV4 } from "internal-ip";
import pxToRemOrVwPlugin from "./plugin/vite-plugin-css-px2rem";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  console.log({ command, mode, nodeEnv: process.env.NODE_ENV });
  const isAndroid = mode === "ad";
  const isDev = mode === "development";
  const host = isAndroid ? await internalIpV4() : "localhost";

  /** @type {import('vite').UserConfig} */
  const config: import("vite").UserConfig = {
    plugins: [
      react(),
      !isDev &&
        VitePWA({
          registerType: "autoUpdate",
          devOptions: {
            enabled: true,
          },
        }),
      pxToRemOrVwPlugin({
        options: {
          rootValue: 100,
          propList: ["*", "!letter-spacing"],
          exclude: (path) => {
            console.log(path);
            const isExclude = [
              ".yarn",
              "node_modules",
              "src/styles/lib.scss",
              "src/styles/mixins/screen.scss",
            ].some((p) => path.includes(p));
            if (isExclude) {
              console.log("exclude:", path);
              return true;
            }

            return false;
          },
        },
      }),
    ],
    server: {
      host: "0.0.0.0", // listen on all addresses
      port: 2023,
      strictPort: true,
      hmr: {
        protocol: "ws",
        host,
        port: 5183,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: ["es2015"],
      minify: "terser",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: { someLib: ["lodash", "rxdb"] },
        },
      },
    },
    base: "./",
  };
  return config;
});
