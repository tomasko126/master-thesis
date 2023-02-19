// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/cornerstone-math@0.1.10/dist/cornerstoneMath.js' },
        { src: 'https://cdn.jsdelivr.net/npm/cornerstone-core@2.6.1/dist/cornerstone.js' },
        { src: 'http://localhost:9000/dist/cornerstoneTools.js' },
        { src: 'https://cdn.jsdelivr.net/npm/cornerstone-wado-image-loader@4.8.0/dist/cornerstoneWADOImageLoader.bundle.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/dicom-parser@1.8.20/dist/dicomParser.js' },
        { src: 'https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.js' },
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
