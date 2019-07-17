import Vue from 'vue'
import api from '../lib/api'

export const state = () => {
  return {
    myPosts: [],
    favorites: {},
    newly: [],
    histories: [],
  }
}

const permittedParams = ['project_id', 'plan_id', 'title', 'body', 'scheduled_at', 'published_at']

// 更新が許可されたパラメータのみのオブジェクトに変換する
function postParams (post) {
  let result = {}
  permittedParams.forEach(p => {
    result[p] = post[p]
  })
  return result
}

export const actions = {
  async find (context, payload) {
    const {id, save} = payload
    const {data} = await api.get(`/posts/${id}`, {params: {save}})
    if (data.is_favorite) {
      context.commit('addFavorite', [data.post.id])
    }
    return data
  },
  async findByProjectId (context, {all, projectId, brief}) {
    const {data} = await api.get('/posts', {params: {'project-id': projectId, brief, all}})
    if (data.favorite_post_ids) {
      context.commit('addFavorite', data.favorite_post_ids)
    }
    return data.posts
  },
  // ファンルームメンバーとして参照可能な投稿の一覧
  async findMemberPosts (context, payload) {
    const {projectId, title, plans} = payload
    const {data} = await api.get(`/projects/${projectId}/posts`, {params: {title, plans}})
    return data.posts
  },
  async findNewly (context) {
    const {data} = await api.get('/posts')
    if (data.favorite_post_ids) {
      context.commit('addFavorite', data.favorite_post_ids)
    }
    return data.posts
  },
  async findPopular (context, {projectId}) {
    const {data} = await api.get('/posts/popular', {params: {project_id: projectId}})
    if (data.favorite_post_ids) {
      context.commit('addFavorite', data.favorite_post_ids)
    }
    return data.posts
  },
  async findRecommend (context) {
    const {data} = await api.get('/posts/recommend')
    return data.posts
  },
  async create (context, payload) {
    const {post, tags} = payload
    let {data} = await api.post('/posts', {
      post: postParams(post),
      tags: tags,
    })
    return data.post
  },
  async updateEyecatch (context, payload) {
    let {postId, file} = payload
    let formData = new FormData()
    formData.append('image', file)
    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    let {data} = await api.post(`/posts/${postId}/eyecatch_image`, formData, config)
    return data.post
  },
  async save (context, payload) {
    const {post, tags} = payload
    let {data} = await api.put('/posts/' + post.id, {
      post: postParams(post),
      tags: tags,
    })
    return data.post
  },
  async publish (context, payload) {
    let {data} = await api.put('/posts/' + payload.id + '/publish', {publish: true})
    return data.post
  },
  async unpublish (context, payload) {
    let {data} = await api.put('/posts/' + payload.id + '/publish', {publish: false})
    return data.post
  },
  async favorite (context, postId) {
    await api.put('/posts/' + postId + '/favorite')
    context.commit('addFavorite', [postId])
  },
  async removeFavorite (context, postId) {
    await api.delete('/posts/' + postId + '/favorite')
    context.commit('removeFavorite', postId)
  },
  async removeAttachment (context, {postId, attachmentId}) {
    await await api.delete(`/posts/${postId}/attachments/${attachmentId}`)
  },
}

export const mutations = {
  updateMyPosts (state, posts) {
    state.myPosts = posts
  },
  addFavorite (state, postIds) {
    postIds.forEach(id => {
      Vue.set(state.favorites, id, true)
    })
  },
  removeFavorite (state, postId) {
    Vue.delete(state.favorites, postId)
  },
  setHistories (state, posts) {
    state.histories = posts
    if (state.histories.length > 20) {
      state.histories = state.histories.slice(0, 20)
    }
  },
  addHistory (state, post) {
    state.histories.unshift(post)
    if (state.histories.length > 20) {
      state.histories = state.histories.slice(0, 20)
    }
  },
}
