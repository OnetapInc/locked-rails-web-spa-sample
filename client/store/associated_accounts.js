import api from '../lib/api'

export const state = () => {
  return {}
}

export const actions = {
  async findMyAccounts (context, comment) {
    let {data} = await api.get('/me/associated-accounts')
    return data.accounts
  },
  async disconnect (context, assocId) {
    await api.delete('/associated-accounts/' + assocId)
    return true
  },
}

export const mutations = {}
