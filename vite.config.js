import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'lucide-react'],
      output: {
        format: 'es',
        paths: {
          'react': 'https://esm.sh/react@19',
          'react-dom/client': 'https://esm.sh/react-dom@19/client',
          'react-dom': 'https://esm.sh/react-dom@19',
          'lucide-react': 'https://esm.sh/lucide-react@0.469.0'
        },
        manualChunks(id) {
          if (id.includes('regionsData')) return 'geo-regions';
          if (id.includes('basketOptimizer')) return 'optimizer';
        }
      }
    }
  },
  server: {
    port: 3000,
    open: false,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api/maxstock': {
        target: 'https://online.maxstock.co.il',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/maxstock/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      },
      '/api/stockonline': {
        target: 'https://stock-online.co.il',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stockonline/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      },
      '/api/ramilevy-prices': {
        target: 'https://url.publishedprices.co.il',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ramilevy-prices/, '')
      },
      '/api/ramilevy': {
        target: 'https://www.rami-levy.co.il',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ramilevy/, '')
      },
      '/api/published-prices': {
        target: 'https://url.publishedprices.co.il',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/published-prices/, '')
      }
    }
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: true
  }
});
