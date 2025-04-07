import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dynamicImport from 'vite-plugin-dynamic-import';
import { createHtmlPlugin } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';

const https = () => {
  const useHttps = (process.env.npm_lifecycle_event || '').includes(':https');
  const keyPem = `${__dirname}/localhost-key.pem`;
  const certPem = `${__dirname}/localhost.pem`;
  if (!useHttps) return {};
  if (!fs.existsSync(keyPem) || !fs.existsSync(certPem)) return {};
  return {
    https: {
      key: fs.readFileSync(keyPem),
      cert: fs.readFileSync(certPem),
    },
  };
};

const DROP_CONSOLE_MODES = ['beta', 'demo']; // ANCHOR 設定清除 console 的環境
const ENABLE_V_CONSOLE_MODES = ['dev']; // ANCHOR 設定開啟 vConsole 的環境

export default defineConfig(({ mode }) => {
  const basePath = mode === 'development' ? '/' : `/frontend/${mode}/wap/`;
  return {
    base: basePath,
    server: {
      ...https(),
      proxy: {
        '/api': {
          target: 'https://www.com/',
          changeOrigin: true,
        },
      },
    },
    plugins: [
      legacy({
        polyfills: ['es.promise.finally', 'es/map', 'es/set'],
        modernPolyfills: ['es.promise.finally'],
        additionalLegacyPolyfills: ['core-js/proposals/global-this'],
      }),
      react(),
      createHtmlPlugin({
        minify: true,
        /**
         * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
         * @default src/main.ts
         */
        entry: 'src/main.tsx',
        /**
         * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
         * @default index.html
         */
        template: 'index.html',

        /**
         * Data that needs to be injected into the index.html ejs template
         */
        inject: {
          data: {
            timestamp: new Date().toLocaleString('zh-CN'),
            injectScript: ENABLE_V_CONSOLE_MODES.includes(mode)
              ? `<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
            <script>
              // VConsole will be exported to 'window.VConsole' by default.
              var vConsole = new window.VConsole();
            </script>`
              : '',
          },
          tags: [
            {
              injectTo: 'body-prepend',
              tag: 'div',
              attrs: {
                id: 'tag',
              },
            },
          ],
        },
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
        manifest: {
          scope: '/',
          start_url: '/',
          name: 'jia-practice',
          short_name: 'jia-practice',
          description: '稳定安全 实时到帐',
          theme_color: '#5488f8',
          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      tsconfigPaths(),
      dynamicImport(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        '@styles': path.resolve(__dirname, './src/assets/styles'),
        '@images': path.resolve(__dirname, './src/assets/images'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import '@styles/Variables.scss';
          @import '@styles/MixIn.scss';
          @import '@styles/Reset.scss';
          @import '@styles/Base.scss';
        `,
        },
      },
    },
    build: {
      outDir: 'build',
    },
    esbuild: {
      drop: DROP_CONSOLE_MODES.includes(mode) ? ['console', 'debugger'] : [],
    },
    optimizeDeps: {
      include: ['axios', 'lodash'],
    },
  };
});
