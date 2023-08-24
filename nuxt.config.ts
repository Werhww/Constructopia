// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ["~/plugins/vue-dragscroll.ts"],

  css: ["@/assets/css/main.css"],

  imports: {
    dirs: [
      // Scan top-level modules
      "composables",
    ],
  },

  typescript: {
    strict: true,
  },
})
