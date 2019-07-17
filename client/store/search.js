import api from '../lib/api'

export const state = () => {
  return {
    projects: [],
    posts: [],
  }
}

export const actions = {
  async search (context, payload) {
    const {query, tag} = payload
    const {data} = await api.get('/search', {params: {q: query, t: tag}})
    return data
  },
}

export const mutations = {}
