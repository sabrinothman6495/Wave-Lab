import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, //vite dev server port
    proxy: {
      '/graphql': 'http://localhost:5174', //server port
    },
  },

})

