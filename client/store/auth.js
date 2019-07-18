import api from '../lib/api'
import Cookies from 'universal-cookie'

export const state = () => ({
  me: null,
  access_token: null,
})

export const getters = {
  me (state) {
    return state.me
  },
}

export const actions = {
  async login (context, payload) {
    const {data} = await api.post('/auth/login', {email: payload.email, password: payload.password})
    await context.dispatch('verify', data.access_token)
    return data
  },
  async load (context, payload) {
    const {data} = await api.get(`/auth/load?token=${payload.verifyToken}`)
    return data.access_token.token
  },
  async snsLogin (context, token) {
    const {data} = await api.post('/auth/sns-login', {token: token})
    return context.dispatch('verify', data.access_token)
  },
  async confirmSignUp (contex, token) {
    const response = await api.post('/auth/sign-up-confirm', {token: token})
    return response.data.access_token
  },
  async confirmMailChange (context, token) {
    return api.post('/auth/email-change-confirm', {token})
  },
  /**
   * @param {ActionContext.<any,any>} context
   * @param {String} token
   */
  async verify (context, token) {
    const {data} = await api.get('/auth/verify', {
      headers: {
        'X-SATO-TOKEN': token,
      },
    })
    context.dispatch('saveAuth', {user: data.user, token: token})
    return data
  },
  async saveAuth (context, payload) {
    context.commit('updateLoginUser', payload.user)
    context.commit('updateAccessToken', payload.token)
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('user', JSON.stringify(payload.user))
      window.localStorage.setItem('access_token', payload.token)
      const cookie = new Cookies()
      cookie.set('_token', payload.token, {path: '/'})
    }
  },
  async signup (context, payload) {
    await api.post('/auth/sign-up', {email: payload.email, password: payload.password})
  },
  async logout (context) {
    context.commit('updateLoginUser', null)
    context.commit('updateAccessToken', null)
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('access_token')
    const cookie = new Cookies()
    cookie.remove('_token', {path: '/'})
  },
  // ストレージからログイン情報を復元する
  async restore (context) {
    try {
      let userJson = window.sessionStorage.getItem('user')
      if (userJson) {
        let user = JSON.parse(userJson)
        context.commit('updateLoginUser', user)
      }
    } catch (e) {
      console.log(e)
    }
    const accessToken = window.localStorage.getItem('access_token')
    if (accessToken) {
      context.commit('updateAccessToken', accessToken)
      if (!context.state.me) {
        context.dispatch('verify')
      }
    }
  },
  async updateAuthInfo (context, payload) {
    const {email, password} = payload
    const result = await api.put('/users/auth', {email, password})
    context.commit('updateLoginUser', result.data.user)
  },
  async requestPasswordReset (context, email) {
    return api.post('/auth/request-password-reset', {email})
  },
  async resetPassword (context, payload) {
    const {token, password} = payload
    return api.post('/auth/reset-password', {token, password})
  },
}

export const mutations = {
  updateLoginUser (state, user) {
    state.me = user
  },
  updateAccessToken (state, token) {
    state.access_token = token
  },
}
