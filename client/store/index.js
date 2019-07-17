import Cookies from 'universal-cookie'

export const actions = {
  // この関数はSSRするときに毎回呼ばれる。storeの初期化が主な役割となる。
  // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
  async nuxtServerInit (context, {req}) {
    if (req.headers.cookie) {
      const token = (new Cookies(req.headers.cookie)).get('_token') || null
      if (token && token.length > 0) {
        try {
          await context.dispatch('auth/verify', token)
        } catch (e) {
          console.warn('nuxtServeInit():' + e.message)
        }
      }
    }
  },
}

