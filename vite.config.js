// vite.config.js
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Proxy /api requests to your backend server
      '/api': {
        target: 'https://professorsite-00y5b33e.b4a.run/', // Your backend URL
        changeOrigin: true,
      },
    },
  },
})
