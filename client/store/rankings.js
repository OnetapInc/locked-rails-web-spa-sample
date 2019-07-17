import api from '../lib/api'

export const state = () => {
  return {
    projects: [],
    posts: [],
  }
}

export const actions = {
  async findRanking (context) {
    const params = {test: true}
    const {data} = await api.get('/ranking', {params})
    context.commit('setProjects', data.projects)
    context.commit('setPosts', data.posts)
    return data
  },
}

export const mutations = {
  setProjects (state, projects) {
    state.projects = projects
  },
  setPosts (state, posts) {
    state.posts = posts
  },
}
