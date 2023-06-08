// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    plugins: [
        '~/plugins/vue-dragscroll.ts',
        '~/plugins/vue-lottie-web.ts',
    ],

    css: [
        '@/assets/css/main.css',
    ],

})
