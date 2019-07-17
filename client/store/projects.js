import Vue from 'vue'
import api from '../lib/api'

export const state = () => ({
  // キャッシュ
  projects: {},
  // 自身がオーナーを務めるファンルーム
  ownProject: null,
  // メンバーとして参加しているファンルーム
  joinedProjects: [],
  // サポート中のファンルーム
  backedProjects: [],
  // 閲覧履歴
  histories: [],
})

export const getters = {
  hasProject (state) {
    return Object.keys(state.joinedProjects).length > 0
  },
}

export const actions = {
  async find (context, payload) {
    const {id, save, all} = payload
    const {data} = await api.get(`/projects/${id}/show`, {params: {save, all}})
    context.commit('setProject', data.project)
    context.state.joinedProjects.forEach(p => {
      if (p.id === data.project.id) {
        context.commit('updateJoinedProject', data.project)
      }
    })
    return data.project
  },
  async findCategories (context) {
    const {data} = await api.get('/projects/categories')
    return data.categories
  },
  // クローズを申請する
  async requestClose (context, {id}) {
    const {data} = await api.post(`/projects/${id}/close`)
    return data.schedule
  },
  // クローズスケジュールを取得する
  async findCloseSchedule (context, {id}) {
    const {data} = await api.get(`/projects/${id}/close`)
    return data.schedule
  },
  async findFeatures (context) {
    const {data} = await api.get('/projects/features')
    return data.projects
  },
  async getBankAccount (context, projectId) {
    const res = await api.get(`/projects/${projectId}/bank-account`)
    return res.data.bank
  },
  async updateBankAccount (context, bank) {
    const res = await api.put(`/projects/${bank.project_id}/bank-account`, {bank})
    return res.data.bank
  },
  async getMessageChannels (context, projectId) {
    const {data} = await api.get(`/projects/${projectId}/message-channels`)
    return data.channels
  },
  // 新しいファンルームを登録する
  async register (context, payload) {
    const response = await api.post('/projects', payload)
    const project = response.data.project
    context.commit('addJoinedProject', project)
    context.commit('setOwnProject', project)
    await context.dispatch('find', {id: project.id, all: true})

    return project
  },
  // ファンルーム情報を更新する
  async update ({dispatch}, payload) {
    const {data} = await api.put(`/projects/${payload.projectId}/update`, payload.data)
    await dispatch('find', {id: data.project.id, all: true})
  },
  async publish ({dispatch}, projectId) {
    const {data} = await api.put(`/projects/${projectId}/publish`)
    await dispatch('find', {id: data.project.id, all: true})
  },
  async unpublish ({dispatch}, projectId) {
    const {data} = await api.put(`/projects/${projectId}/unpublish`)
    await dispatch('find', {id: data.project.id, all: true})
  },
  /** @param {File} file */
  async updateHeaderImage ({dispatch}, payload) {
    const projectId = payload.projectId
    const file = payload.file
    let formData = new FormData()
    formData.append('image', file)
    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    const {data} = await api.post(`/projects/${projectId}/header_image`, formData, config)
    await dispatch('find', {id: data.project.id, all: true})
  },
}

export const mutations = {
  setProject (state, project) {
    Vue.set(state.projects, project.id, project)
  },
  setOwnProject (state, project) {
    state.ownProject = project
  },
  setJoinedProjects (state, projects) {
    state.joinedProjects = projects
  },
  addJoinedProject (state, project) {
    state.joinedProjects.push(project)
  },
  updateJoinedProject (state, project) {
    state.joinedProjects = state.joinedProjects.map(p => {
      if (p.id !== project.id) {
        return p
      } else {
        return project
      }
    })
  },
  setBackedProjects (state, projects) {
    state.backedProjects = projects
  },
  setHistories (state, projects) {
    state.histories = projects
    if (state.histories.length > 20) {
      state.histories = state.histories.slice(0, 20)
    }
  },
  addHistory (state, project) {
    state.histories.unshift(project)
    if (state.histories.length > 20) {
      state.histories = state.histories.slice(0, 20)
    }
  },
}
