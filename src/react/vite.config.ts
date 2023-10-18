import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

const { PORT, BACKEND_PORT, BACKEND_SERVICE } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), viteTsconfigPaths()],
  build: {
    outDir: "build",
  },
  server: {
    host: true,
    port: Number(PORT),
    proxy: {
      "/api": {
        target: "http://express-api:3600/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
