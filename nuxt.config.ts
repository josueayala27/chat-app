import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
  nitro: {
    experimental: {
      websocket: true,
    },
    storage: {
      test: {
        driver: 'upstash',
        base: 'unstorage',
      },
    },
  },
  devtools: {
    enabled: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  css: ['@/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  components: [
    { path: '@/components/chat/window', prefix: 'Window' },
    { path: '@/components/chat/sidebar', prefix: 'Sidebar' },
    { path: '@/components/chat/window/panel/info', prefix: 'PanelInfo' },
    '@/components',
  ],
  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/eslint',
  ],
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
  icon: {
    mode: 'css',
    cssLayer: 'base',
    clientBundle: {
      scan: true,
    },
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  runtimeConfig: {
    DB_URI: process.env.DB_URI,
  },
})
