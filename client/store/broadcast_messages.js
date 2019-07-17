import api from '../lib/api'

export const state = () => {
  return {
    messages: {},
  }
}

export const actions = {
  async findByProjectId (context, payload) {
    const {projectId} = payload
    const {data} = await api.get('/broadcast-messages', {params: {project_id: projectId}})
    context.commit('setMessages', {messages: data.messages})
    return data.messages
  },
  // 自分がサポートしているファンルーム
  async findBackedProjectChannels (context) {
    const {data} = await api.get('/broadcast-messages/channels')
    return data.channels
  },
  async sendMessage (context, payload) {
    const {projectId, planId, title, message, publishId} = payload
    const {data} = await api.post('/broadcast-messages', {
      project_id: projectId,
      title: title,
      plan_id: planId,
      body: message,
      publish_id: publishId,
    })

    context.commit('addMessage', {message: data.message})

    return data.message
  },
}

export const mutations = {
  setMessages (state, {messages}) {
    state.messages = messages
  },
  addMessage (state, {message}) {
    state.messages.unshift(message)
  }
}
