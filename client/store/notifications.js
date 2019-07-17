import api from '../lib/api'

export const state = () => {
  return {
    notifications: [],
    setting: null,
    unread_count: 0,
  }
}

export const actions = {
  async getSetting (context) {
    const {data} = await api.get('/me/notification-setting')
    context.commit('setSetting', data.setting)
    return data.setting
  },
  async updateSetting (context, setting) {
    const {data} = await api.put('/me/notification-setting', {setting})
    context.commit('setSetting', data.setting)
    return data.setting
  },
  async getAll (context) {
    const {data} = await api.get('/me/notifications')
    context.commit('setNotifications', data.notifications)
    return data.notifications
  },
  async readAll (context) {
    await api.post('/me/notifications/read-all')
    context.commit('setUnreadCount', 0)
  },
}

export const mutations = {
  setNotifications (state, notifications) {
    state.notifications = notifications
  },
  setUnreadCount (state, count) {
    state.unread_count = count
  },
  setSetting (state, setting) {
    state.setting = setting
  },
}
