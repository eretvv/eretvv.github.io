import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react'],
          'react-dom': ['react-dom'],
        },
      },
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
})
