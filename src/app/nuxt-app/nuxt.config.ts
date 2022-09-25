// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  telemetry: false,
  buildModules: ['@pinia/nuxt'],
  modules: [
    '@pinia/nuxt',
  ],
})
