import Vue from 'vue'
import api from '../lib/api'

export const state = () => {
  return {
    messages: {},
  }
}

export const actions = {
  async findMessageChannels (context) {
    const {data} = await api.get('/messages/channels')
    return data.channels
  },
  async findMessageChannel (context, payload) {
    const {data} = await api.get('/messages/channel', {params: payload})
    return data.channel
  },
  async findMessages (context, channel) {
    if (!channel) {
      throw new Error('channel must be set')
    }
    const pid = channel.project_id
    const {data} = await api.get(`/messages?project_id=${pid}`)
    context.commit('setMessages', {channelId: channel.id, messages: data.messages})
    return data.messages
  },
  async findMessagesByChannelId (context, channelId) {
    const {data} = await api.get(`/messages?channel_id=${channelId}`)
    context.commit('setMessages', {channelId, messages: data.messages})
    return data.messages
  },
  async sendMessageToProject (context, payload) {
    const {channel, body, publishId} = payload
    const {data} = await api.post('/messages', {project_id: channel.project_id, body: body, direction: 2, publish_id: publishId})
    context.commit('addMessage', {channelId: channel.id, message: data.message})
    return data.message
  },
  async sendMessageToUser (context, payload) {
    const {channel, body, publishId} = payload
    const {data} = await api.post('/messages', {project_id: channel.project_id, body: body, direction: 1, publish_id: publishId})
    context.commit('addMessage', {channelId: channel.id, message: data.message})
    return data.message
  },
  async deleteMessage (context, payload) {
    const {channel, message} = payload
    await api.delete(`/messages/${message.id}`)
    context.commit('deleteMessage', {channel, message})
  },
}

export const mutations = {
  setMessages (state, payload) {
    Vue.set(state.messages, payload.channelId, payload.messages)
  },
  addMessage (state, payload) {
    if (!state.messages[payload.channelId]) {
      Vue.set(state.messages, payload.channelId, [])
    }
    state.messages[payload.channelId].push(payload.message)
  },
  deleteMessage (state, payload) {
    const {channel, message} = payload
    if (state.messages[channel.id]) {
      state.messages[channel.id] = state.messages[channel.id].filter(m => m.id !== message.id)
    }
  },
}
