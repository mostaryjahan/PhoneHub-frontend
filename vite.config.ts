import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: {
      protocol: 'ws', // Use 'ws' or 'wss' depending on your setup
      host: 'localhost',
      port: 5173, // Ensure this matches your Vite server port
    },
  },
})
