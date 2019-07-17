import api from '../lib/api'

export const state = () => {
  return {}
}

export const actions = {
  async findById (context, {id}) {
    const {data} = await api.get(`/post-packs/${id}`)
    return {...data.post_pack, bought: data.bought}
  },
  async findByProjectId (context, {projectId}) {
    if (!projectId) {
      throw new Error('invalid argument.')
    }
    const {data} = await api.get('/post-packs', {params: {project_id: projectId}})
    return data.post_packs
  },
  async create (context, payload) {
    const {data} = await api.post('/post-packs', payload)
    return data.post_pack
  },
  async update (context, payload) {
    const {data} = await api.put(`/post-packs/${payload.id}`, payload)
    return data.post_pack
  },
  async destroy (context, {id}) {
    await api.delete(`/post-packs/${id}`)
    return true
  },
  async buy (context, {id}) {
    const {data} = await api.put(`/post-packs/${id}/buy`)
    return data.post_pack
  },
  async findSetting (context, {projectId}) {
    const {data} = await api.get('/post-pack-automation-settings', {params: {project_id: projectId}})
    return data.setting
  },
  async updateSetting (context, payload) {
    const {data} = await api.put('/post-pack-automation-settings', payload)
    return data.setting
  },
}

export const mutations = {}
