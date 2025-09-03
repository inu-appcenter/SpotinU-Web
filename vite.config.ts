import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [],
  },

  server: {
    host: true, // 0.0.0.0 바인딩
    port: 5173,
    strictPort: true, // 5173 고정 (바뀌지 않게)
  },
})
