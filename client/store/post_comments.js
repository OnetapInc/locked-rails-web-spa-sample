import api from '../lib/api'

export const state = () => {
  return {
  }
}

export const actions = {
  async create (context, comment) {
    let {data} = await api.post(`/posts/${comment.post_id}/comments`, {
      comment: comment.body,
    })
    return data.comment
  },
  async update (context, comment) {
    let {data} = await api.put(`/posts/${comment.post_id}/comments/${comment.id}`, {
      comment: comment.body,
    })
    return data.comment
  },
  async remove (context, comment) {
    let {data} = await api.delete(`/posts/${comment.post_id}/comments/${comment.id}`)
    return data.status
  },
}

export const mutations = {
  updateMyPosts (state, posts) {
    state.myPosts = posts
  },
}
