
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      {
        hid: 'description',
        name: 'description',
        content:
          'nyk510 のポートフォリオ'
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'nyk510 portfolio' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://nyk510.github.io/portfolio/' },
      { hid: 'og:title', property: 'og:title', content: 'nyk510 portfolio' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'nyk510 のポートフォリオ'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: './icon_400x400.png'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'nyk510 portfolio'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content:
          'nyk510 のポートフォリオ'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: './icon_400x400.png'
      }

    ],
    link: [
      { rel: 'icon', type: 'image/png', href: './icon_400x400.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.9.0/css/all.css'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/scrolling.js',
    '~/plugins/aos.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  router: {
    base: '/portfolio/'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
