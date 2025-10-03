// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
      // "/api": {
      //   // Any request starting with /api
      //   target: "http://localhost:5000", // Your backend server's address
      //   changeOrigin: true, // Needed for virtual hosted sites
      // },
    },
  },
});
