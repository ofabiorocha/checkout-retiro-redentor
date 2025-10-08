import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Caminho base (ajuste se o projeto for hospedado em subdiretório)
  base: '/retiroredentor2026/',

  // Aliases para facilitar imports (ex: import X from "@/components/X")
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  // Configuração do servidor local
  server: {
    port: 5173,
    open: true,
    strictPort: true,
    proxy: {
      // Exemplo: redirecionar chamadas à API localmente
      '/api': {
        target: 'https://sandbox.asaas.com/api/v3',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // Build de produção
  build: {
    outDir: 'dist',
    sourcemap: false, // pode ativar true se quiser debugar
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
