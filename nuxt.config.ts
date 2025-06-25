import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'

export default defineNuxtConfig({
  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@vue-macros/nuxt',
    '@nuxt/image',
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
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    CLOUDFRONT_DOMAIN: process.env.CLOUDFRONT_DOMAIN,
    CLOUDFRONT_KEY_PAIR_ID: process.env.CLOUDFRONT_KEY_PAIR_ID,
    CLOUDFRONT_PRIVATE_KEY: process.env.CLOUDFRONT_PRIVATE_KEY,
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    typedPages: true,
    renderJsonPayloads: true,
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    experimental: {
      websocket: true,
    },
    storage: {
      upstash: {
        driver: 'upstash',
        base: 'default',
      },
    },
  },
  vite: { plugins: [tailwindcss(), mkcert()] },
  eslint: {
    checker: true,
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
    },
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
