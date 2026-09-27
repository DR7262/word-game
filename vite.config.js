import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Necessary if running inside Docker/VMs
    allowedHosts: [
      'word-game-dev.0007262.xyz'
    ],
  },
})
