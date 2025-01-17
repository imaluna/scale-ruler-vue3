import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
const url = resolve(__dirname, 'tsconfig.json');
console.log(url);
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    dts({
      rollupTypes: true,
      tsconfigPath: url
    })
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Common',
      fileName: 'index',
      formats: ['es', 'umd', 'cjs']
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
