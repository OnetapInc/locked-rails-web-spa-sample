import api from '../lib/api'

export const state = () => ({})

export const actions = {
  async find (context, payload) {
    const {id} = payload
    const {data} = await api.get(`/users/${id}`)
    return data.user
  },
  /**
   * @param {File} file
   */
  async updateProfileImage (context, file) {
    const authUser = context.rootState.auth.me
    let formData = new FormData()
    formData.append('image', file)
    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    const result = await api.put(`/users/${authUser.id}/profile_image`, formData, config)
    context.commit('auth/updateLoginUser', result.data.user, {root: true})
  },
  async updateName (context, name) {
    return api.put('/me/name', {name})
  },
  async updateMailAddress (context, email) {
    return api.post('/me/request-mail-change', {email})
  },
  async updatePassword (context, password) {
    return api.put('/me/password', {password})
  },
}

export const mutations = {}
