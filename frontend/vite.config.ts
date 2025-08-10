import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',  // Updated to 3002
        changeOrigin: true,
        secure: false,
      },
      '/health': {
        target: 'http://localhost:3002',  // Health check endpoint
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
