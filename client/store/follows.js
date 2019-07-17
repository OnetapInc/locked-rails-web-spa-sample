import Vue from 'vue'
import api from '../lib/api'

export const state = () => {
  return {
    follows: {},
  }
}

export const actions = {
  async findByProjectId (context, {projectId, keyword}) {
    const {data} = await api.get(`/projects/${projectId}/followers`, {params: {keyword}})
    return data.followers
  },
  /**
   * 自分のフォロー情報を取得する
   * @param {ActionContext.<any,any>} context
   */
  async getMyFollows (context) {
    const {data} = await api.get('/me/follows')
    context.commit('setMyFollows', data.follows)
  },
  /**
   * フォローする
   * @param {ActionContext.<any,any>} context
   * @param {string} projectId
   */
  async follow (context, projectId) {
    let {data} = await api.put(`/projects/${projectId}/follow`)
    context.commit('setFollow', data.follow)
    return data.follow
  },
  /**
   * フォローを解除する
   * @param context
   * @param {string} projectId
   * @returns {Promise.<actions.follow|*>}
   */
  async unfollow (context, projectId) {
    let {data} = await api.delete(`/projects/${projectId}/follow`)
    context.commit('deleteFollow', projectId)
    return data.follow
  },

  async setFollows (context, follows) {
    context.commit('setMyFollows', follows)
  },
}

export const mutations = {
  setMyFollows (state, follows) {
    let newFollows = {}
    follows.forEach(f => {
      newFollows[f.project_id] = f
    })
    state.follows = newFollows
  },
  setFollow (state, follow) {
    Vue.set(state.follows, follow.project_id, follow)
  },
  deleteFollow (state, projectId) {
    Vue.delete(state.follows, projectId)
  },
}
