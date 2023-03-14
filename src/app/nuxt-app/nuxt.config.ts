// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'SPAMM web application'
    },
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@vuestic/nuxt',
  ],
  plugins: [
    {
      src: '~/plugins/ui.ts',
    },
  ],
  ssr: false,
  telemetry: false,
  typescript: {
    typeCheck: true,
  },
});
