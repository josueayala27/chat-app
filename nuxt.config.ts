import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/eslint',
  ],
  components: [
    { path: '@/components/chat/window', prefix: 'Window' },
    { path: '@/components/chat/sidebar', prefix: 'Sidebar' },
    { path: '@/components/chat/window/panel/info', prefix: 'PanelInfo' },
    '@/components',
  ],
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
  css: ['@/assets/css/main.css'],
  runtimeConfig: {
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_DB: process.env.MONGODB_DB,
    MONGODB_HOST: process.env.MONGODB_HOST,
    MONGODB_PORT: process.env.MONGODB_PORT,
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
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
  vite: { plugins: [tailwindcss()] },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
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
})
