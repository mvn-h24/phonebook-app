import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@app/components": resolve(__dirname, "src/components"),
      "@app/store": resolve(__dirname, "src/store/index.ts"),
      "@app/types": resolve(__dirname, "src/types/index.ts"),
      "@app/directive": resolve(__dirname, "src/directive/index.ts"),
      "@app/db": resolve(__dirname, "src/db/index.ts"),
    },
  },
});
