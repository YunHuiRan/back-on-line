import { defineConfig } from 'vite'
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()], resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
