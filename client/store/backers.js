import api from '../lib/api'

export const state = () => {
  return {}
}

export const actions = {
  async findOwns (context) {
    const {data} = await api.get('/me/backers')
    return data.backers
  },
  async findByProjectId (context, payload) {
    const {projectId, keyword} = payload
    const {data} = await api.get('/backers', {params: {project_id: projectId, keyword}})
    return data.backers
  },
}

export const mutations = {}
