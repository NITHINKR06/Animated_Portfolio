import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',       // silently updates SW in background
      injectRegister: 'auto',
      workbox: {
        // Cache static assets (JS, CSS, fonts, images) with Cache-First strategy
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2,ttf,otf,pdf,glb,gltf}'],
        // Runtime caching rules
        runtimeCaching: [
          {
            // HTML navigation: Network-first (always try to get fresh HTML)
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Images: Cache-first (images rarely change)
            urlPattern: ({ url }) =>
              url.origin === self.location.origin &&
              /\.(png|jpg|jpeg|svg|gif|webp|ico)$/.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Fonts: Cache-first (fonts never change)
            urlPattern: ({ url }) =>
              url.origin === 'https://fonts.googleapis.com' ||
              url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // 3D models / PDF / large assets: Stale-While-Revalidate
            urlPattern: ({ url }) =>
              url.origin === self.location.origin &&
              /\.(glb|gltf|pdf)$/.test(url.pathname),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        // Skip waiting so new SW activates immediately in the background
        skipWaiting: true,
        clientsClaim: true,
      },
      manifest: {
        name: 'Nithin K R | Developer',
        short_name: 'NithinKR',
        description: 'Full Stack Developer & Cyber Security enthusiast portfolio',
        theme_color: '#0f0f0f',
        background_color: '#0f0f0f',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      devOptions: {
        enabled: false, // disable SW in dev to avoid confusion
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        // ── Attribution banner injected into every compiled chunk ──
        // DO NOT REMOVE — required by LICENSE (github.com/NITHINKR06/Animated_Portfolio)
        banner: [
          '/*!',
          ' * Animated 3D Portfolio — Original design & code by Nithin K R',
          ' * GitHub  : https://github.com/NITHINKR06',
          ' * Live    : https://nithinkr.vercel.app',
          ' * License : See LICENSE file — attribution required for derivative works',
          ' * Removing or altering this notice violates the terms of use.',
          ' */',
        ].join('\n'),
        manualChunks: {
          three: ['three'],
          framer: ['framer-motion'],
          anime: ['animejs'],
          react: ['react', 'react-dom', 'react-router-dom'],
          markdown: ['react-markdown', 'rehype-raw', 'remark-gfm'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});
