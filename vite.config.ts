import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { internalIpV4 } from "internal-ip";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const host = await internalIpV4();

  /** @type {import('vite').UserConfig} */
  const config: import("vite").UserConfig = {
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
    },
    base: "./"
  };
  return config;
});
