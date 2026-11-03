import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
      // תמיכה בשרתי שקיפות מחירים של רמי לוי ומזון (חוק שקיפות המחירים)
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
