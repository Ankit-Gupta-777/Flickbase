import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {esbuildCommonjs} from '@originjs/vite-plugin-commonjs';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
        secure:false
      }
    }
  },
  optimizeDeps:{
    esbuildOptions:{
      plugins:[esbuildCommonjs(['react-moment'])]
    }
  }
})
