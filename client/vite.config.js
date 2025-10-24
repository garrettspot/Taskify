import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = dotenv.config({ path: `.env.${mode}` }).parsed

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'http://127.0.0.1:5000',
          changeOrigin: true,
        },
      },
    },
    define: {
      // Expose environment variables to the client
      'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    },
  }
})