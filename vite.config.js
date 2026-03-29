import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Dev: '/' so /src/main.jsx resolves reliably. Build: './' so dist works from any folder / static hosts.
  base: command === 'build' ? './' : '/',
}))
