import api from '../lib/api'

export const state = () => {
  return {
    transferable_amount: null,
    requests: [],
  }
}

export const actions = {
  async findAll (context, payload) {
    const {projectId} = payload
    const {data} = await api.get(`/projects/${projectId}/transfer-requests`)
    context.commit('setRequests', data)
    return data.requests
  },
  async create (context, payload) {
    const {projectId, amount} = payload
    const {data} = await api.post(`/projects/${projectId}/transfer-requests`, {amount})
    await context.dispatch('findAll', payload)
    return data.requests
  },
  async update (context, payload) {
    const {id, projectId, amount} = payload
    const {data} = await api.put(`/projects/${projectId}/transfer-requests/${id}`, {amount})
    await context.dispatch('findAll', payload)
    return data.requests
  },
  async cancel (context, payload) {
    const {id, projectId} = payload
    const {data} = await api.put(`/projects/${projectId}/transfer-requests/${id}/cancel`)
    await context.dispatch('findAll', payload)
    return data.request
  },
}

export const mutations = {
  setRequests (state, payload) {
    state.requests = payload.requests
    state.transferable_amount = payload.transferable_amount
  },
}
