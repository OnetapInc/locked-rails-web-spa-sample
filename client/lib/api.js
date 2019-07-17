import axios from 'axios'
import config from '../config/config'

let store = null
const client = axios.create({
  baseURL: config.api_host,
  timeout: 5000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  maxContentLength: 1024 * 1024,
})

client.interceptors.request.use((config) => {
  const token = store.state.auth.access_token
  if (token && !('X-SATO-TOKEN' in config.headers)) {
    config.headers['X-SATO-TOKEN'] = token
  }
  return config
})

export function setStore (_store) {
  store = _store
}

export class StandardRestClientResponse {

  /**
   * @param {AxiosResponse} response
   */
  constructor (response) {
    /** @type {AxiosResponse} */
    this._response = response
  }

  /**
   * @returns {object}
   */
  get data () {
    return this._response.data
  }

  get status () {
    return this._response.status
  }

  get code () {
    if (this._response.data) {
      return this._response.data.code
    } else {
      return null
    }
  }

  /**
   * @returns {boolean}
   */
  get ok () {
    return this.status === 'ok'
  }
}

export class StandardRestClientError {
  constructor (config, code, response, message) {
    /** @type {AxiosRequestConfig} */
    this.config = config
    /** @type {string} */
    this.code = code
    /** @type {string} */
    this.message = message
    /** @type {StandardRestClientResponse} */
    this.response = new StandardRestClientResponse(response)
  }
}

export class StandardRestClient {

  /**
   * Constructs StandardRestClient object
   * @param {AxiosInstance} client
   */
  constructor (client) {
    /** @type {AxiosInstance} */
    this._client = client
  }

  /**
   * Requests
   *
   * @param {string} method
   * @param {string} endpoint
   * @param {object} data
   * @param {AxiosRequestConfig} config
   * @return {Promise<StandardRestClientResponse>}
   */
  async request (method, endpoint, data = {}, config = {}) {
    let response = null
    try {
      if (['get', 'delete', 'head'].includes(method)) {
        response = await this._client[method](endpoint, config)
      } else {
        response = await this._client[method](endpoint, data, config)
      }
    } catch (e) {
      if (e.response) {
        throw new StandardRestClientError(e.config, e.code, e.response, e.message)
      } else {
        throw e
      }
    }
    return this._transform(response)
  }

  /**
   * Requests with GET method.
   *
   * @param {string} endpoint
   * @param {AxiosRequestConfig} config
   * @return {Promise<StandardRestClientResponse>}
   */
  async get (endpoint, config = {}) {
    return this.request('get', endpoint, null, config)
  }

  /**
   * Requests with DELETE method.
   *
   * @param {string} endpoint
   * @param {AxiosRequestConfig} config
   * @return {Promise<StandardRestClientResponse>}
   */
  async delete (endpoint, config = {}) {
    return this.request('delete', endpoint, null, config)
  }

  /**
   * Requests with HEAD method.
   *
   * @param {string} endpoint
   * @param {AxiosRequestConfig} config
   * @return {Promise<StandardRestClientResponse>}
   */
  async head (endpoint, config = {}) {
    return this.request('head', endpoint, null, config)
  }

  /**
   * Requests with POST method.
   *
   * @param {string} endpoint
   * @param {object} data
   * @param {AxiosRequestConfig} config
   * @return {Promise<StandardRestClientResponse>}
   */
  async post (endpoint, data = {}, config = {}) {
    return this.request('post', endpoint, data, config)
  }

  /**
   * Requests with PUT method.
   *
   * @param {string} endpoint
   * @param {object} data
   * @param {AxiosRequestConfig} config
   * @return {Promise<StandardRestClientResponse>}
   */
  async put (endpoint, data = {}, config = {}) {
    return this.request('put', endpoint, data, config)
  }

  /**
   * Requests with PATCH method.
   *
   * @param {string} endpoint
   * @param {object} data
   * @param {AxiosRequestConfig} config
   * @return {Promise<StandardRestClientResponse>}
   */
  async patch (endpoint, data = {}, config = {}) {
    return this.request('patch', endpoint, data, config)
  }

  async _transform (response) {
    return new StandardRestClientResponse(response)
  }
}

let stdRestClient = new StandardRestClient(client)
export default stdRestClient
