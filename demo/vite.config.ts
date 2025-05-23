import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    outDir: "dist",
  },
  server: {
    host: true,
    port: 5173,
  },
});
