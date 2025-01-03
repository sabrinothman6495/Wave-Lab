import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, //vite dev server port
    proxy: {
      '/graphql': 'http://localhost:3001', //server port
    },
  },

})

