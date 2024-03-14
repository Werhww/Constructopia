// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    'nuxt-quasar-ui',
  ],
  quasar: { 
    iconSet: 'material-symbols-rounded',
    extras: {
      svgIcons: [
        'material-symbols-rounded',
      ],
    },

    config: {
      brand: {
        primary: '#EC8489',
        secondary: '#921818',
        accent: '#EF3A3A',

        dark: '#1F1F1F',

        positive: '#1ad914',
        negative: '#EF3A3A',
        info: '#1826F3',
        warning: '#ffc400'
      }
    }
  }
})
