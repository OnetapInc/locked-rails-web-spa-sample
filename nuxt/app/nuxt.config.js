require('dotenv').config()
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt_rails',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { filename: ENV_IS_PRODUCTIION ? '.env.production' : '.env.development' }],
  ],
  env: {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://fathomless-sierra-36623.herokuapp.com/api/v1' :'http://localhost:3000/api/v1',
  },
}

var ENV_IS_PRODUCTIION = process.env.NODE_ENV === 'production'
// console.log('checkprocesssssss-------------',process)