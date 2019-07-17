const path = require('path')

// CAUTION
// Nuxt.jsは自動でWebPackの設定を作成するので、この設定は利用されない。
// WebStormなどのIDEによる入力支援機能を有効にするために用意している。
module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    root: path.resolve(__dirname),
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname),
      'ss': path.join(path.resolve(__dirname), 'lib'),
    },
  },
}
