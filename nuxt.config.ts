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
      fontIcons: [
        'material-symbols-rounded',
        'material-symbols-outlined',
        'material-symbols-sharp'
      ],

      svgIcons: [
        'material-symbols-rounded',
        'material-symbols-outlined',
        'material-symbols-sharp'
      ],
    },

    sassVariables: "assets/css/quasar.variables.scss",
    config: {
      dark: true,

      brand: {
        primary: '#EC8489',
        secondary: '#921818',
        accent: '#EF3A3A',

        dark: '#121212',

        positive: '#1ad914',
        negative: '#EF3A3A',
        info: '#1826F3',
        warning: '#ffc400',

        "dark-page": "#121212"
      }
    }
  }
})
