// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: 'http://localhost:9000/dist/cornerstoneTools.js' },
      ],
      link: [
        { href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap', rel: 'stylesheet'},
      ],
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
      src: '~/plugins/ui.js',
    },
  ],
  ssr: false,
  telemetry: false,
});
