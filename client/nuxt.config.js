const {join} = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'satou',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    // analyze: true,
    vendor: [
      'axios',
      'nuxtend',
      'animejs',
      'core-js/es6/array.js',
      'core-js/es7/array.js',
      'core-js/es6/object.js',
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ja/))
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|vendor)/,
        })
      }
      // https://github.com/Justineo/vue-awesome/issues/7#issuecomment-322034039
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/],
          }),
        ]
      }
      config.module.rules = config.module.rules.map((rule) => {
        if (rule.loader === 'babel-loader') {
          rule.exclude = /node_modules|vendor/
        }
        return rule
      })
    },
  },
  modules: [
    // '@nuxtjs/toast',
    // '~/modules/toast',
    // '@nuxtjs/icon',
    'nuxt-device-detect',
    '@nuxtjs/markdownit',
    [
      '@nuxtjs/pwa',
      {
        icon: {
          iconSrc: 'static/images/icon@3x.png',
        },
        workbox: false,
      },
    ],
    [
      '@nuxtjs/proxy',
      {
        proxy: (process.env.NODE_ENV !== 'production') ? ['http://localhost:3000/uploads/*'] : [],
      },
    ],
  ],
  css: [
    {src: join(__dirname, 'node_modules/normalize.css/normalize.css'), lang: 'css'},
    {src: join(__dirname, 'node_modules/milligram/dist/milligram.min.css'), lang: 'css'},
    {src: join(__dirname, '/assets/element-ui.scss'), lang: 'scss'},
    {src: join(__dirname, '/assets/application.scss'), lang: 'scss'},
    {src: join(__dirname, '/assets/transition.scss'), lang: 'scss'},
  ],
  plugins: [
    {src: '~/plugins/restore-from-storage.js', ssr: false},
    {src: '~/plugins/global-components.js', ssr: true},
    {src: '~/plugins/icons.js', ssr: true},
    {src: '~/plugins/vee-validate.js', ssr: true},
    {src: '~/plugins/filters.js', ssr: true},
    {src: '~/plugins/toast.js', ssr: false},
    // {src: '~/plugins/device.js', ssr: true},
    {src: '~/plugins/element-ui.js', ssr: true},
  ],
  proxy: (process.NODE_ENV !== 'production') ? ['http://localhost:3000/uploads/*/**.*'] : [],
  router: {
    middleware: []
  },
  manifest: {
    name: 'satouNext',
    short_name: 'satouNext',
    lang: 'ja',
  },
  // vue-markdownには適用されないので注意。
  // vue-markdownの場合はvue-markdownコンポーネントに直接オプションを指定する。
  markdownit: {
    preset: 'commonmark',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-attrs',
    ],
  },
}
