import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] as const,  // Add type assertion here
  server: {
    port: 5174, // vite dev server port
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001', // assuming your backend runs on 3001
        changeOrigin: true,
        secure: false,
      },
    },
  },
})