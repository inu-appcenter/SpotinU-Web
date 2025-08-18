import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // 0.0.0.0 바인딩
    port: 5173,
    strictPort: true, // 5173 고정 (바뀌지 않게)
  },
})
