import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // This is the output directory for your build files
    sourcemap: true, // Optional: Generates source maps for easier debugging
  },
})
