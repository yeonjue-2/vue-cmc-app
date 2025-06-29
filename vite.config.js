import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/v1': {                            // v1으로 시작하는 요청은 프록시 대상이 됨
        target: 'http://localhost:8080',  // Spring 서버 주소
        changeOrigin: true,
      },
    },
  },
})
