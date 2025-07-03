import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // base: "/weather-app/", // <-- add this line
  base: "/weather-app/", // important! repo name with slash
  plugins: [react()],
});
