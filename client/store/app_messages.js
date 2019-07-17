
export const state = () => {
  return {
    messages: [],
  }
}

let msgId = 1
export const actions = {
  addMessage (context, msg) {
    msgId += 1
    const id = msgId
    context.commit('addMessage', {...msg, id})
    const timeout = msg.timeout ? msg.timeout : 4000
    setTimeout(_ => {
      context.commit('removeMessage', id)
    }, timeout)
  },
}

export const mutations = {
  addMessage (state, msg) {
    state.messages.push(msg)
  },
  removeMessage (state, messageId) {
    state.messages = state.messages.filter(m => m.id !== messageId)
  },
  removeAll (state, _) {
    state.messages = []
  },
}
