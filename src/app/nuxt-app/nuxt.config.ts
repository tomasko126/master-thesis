// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt'],
  modules: [
    '@pinia/nuxt',
  ],
  optimizeDeps: {
    exclude: ['cornerstone-tools']
  },
  plugins: [
    {
      src: '~/plugins/oruga.js',
    },
  ],
  ssr: false,
  telemetry: false,
});
