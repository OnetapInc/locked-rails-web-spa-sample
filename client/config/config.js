const dev = {
  // api_host: 'http://192.168.1.13:3000/api/v1'
  preopen: false,
  web_host: 'http://localhost:4000',
  api_host: 'http://localhost:3000/api/v1',
  token_api_key: 'cd76ca65-7f54-4dec-8ba3-11c12e36a548'
}

const prod = {
  // api_host: 'http://192.168.1.13:3000/api/v1'
  preopen: false,
  web_host: 'https://satou.jp',
  api_host: 'https://satou.jp/api/v1',
  token_api_key: 'cd76ca65-7f54-4dec-8ba3-11c12e36a548'
}

const config = process.env.NODE_ENV === 'production' ? prod : dev
export default config
