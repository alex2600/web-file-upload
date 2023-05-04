import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
   root: fileURLToPath(new URL('./vue', import.meta.url)),
   server: {
      host: "127.0.0.1",
   },
   plugins: [vue()],
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./', import.meta.url))
      }
   }
})
