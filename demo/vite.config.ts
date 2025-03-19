import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        outDir: "../distdemo",
        lib: {
            entry: "src/main.ts",
            formats: ["es"],
        },
    },
    server: {
        host: true,
        port: 5173,
    },
});
