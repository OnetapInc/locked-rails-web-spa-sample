import api from '../lib/api'

export const state = () => {
  return {}
}

export const actions = {
  async findMonthly (context, {projectId}) {
    const {data} = await api.get('/sales/monthly', {params: {pid: projectId}})
    return data
  },
  async findDaily (context, {projectId, year, month}) {
    const {data} = await api.get('/sales/daily', {params: {pid: projectId, year, month}})
    return data
  },
  async findRecent (context, {projectId}) {
    const {data} = await api.get('/sales/recent', {params: {pid: projectId}})
    return data
  },
}

export const mutations = {}
