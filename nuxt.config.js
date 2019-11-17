import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'
import './plugins/dotenv-profile.js'
require('dotenv').config()

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify', '@/plugins/reactivesearch-vue'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: process.env.graphql_host,
    proxyHeaders: false,
    credentials: false
    // See https://github.com/nuxt-community/axios-module#options
  },


  router: {
    base: '/ui/'
  },

  /*
   ** Build configuration
   */
  build: {  
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (!ctx.isDev) {
        // relative links, please.
        config.output.publicPath = 'http://192.168.178.246:30390/ui/_nuxt/'
      }
    }
  },

  proxy: {
    '/graphql': {
      target: process.env.graphql_host
    },
    '/elasticsearch': {
      target: process.env.elastic_search_host,
      changeOrigin: true
    }
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.graphql_endpoint
      }
    }
  }
}
