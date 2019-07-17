import Vue from 'vue'
import api from '../lib/api'

export const state = () => ({
  joiningPlans: {},
})

export const getters = {}

export const actions = {
  /**
   * ファンルームIDからプランの一覧を取得する
   *
   * @param {ActionContext.<any,any>} context
   * @param {string} projectId ファンルームID
   * @returns {Promise.<any>}
   */
  async findByProjectId (context, projectId) {
    const res = await api.get(`/projects/${projectId}/plans`)
    return res.data.plans
  },
  /**
   * プランの作成
   * @param {ActionContext.<any,any>} context
   * @param {Plan} plan
   * @returns {Promise.<Plan>}
   */
  async create (context, plan) {
    const {data} = await api.post('/plans', {plan})
    await context.dispatch('projects/find', {id: data.plan.project_id}, {root: true})
    return data.plan
  },
  /**
   * プランの更新
   * @param {ActionContext.<any,any>} context
   * @param {Plan} plan
   * @returns {Promise.<Plan>}
   */
  async update (context, plan) {
    const res = await api.put(`/plans/${plan.id}`, {plan})
    await context.dispatch('projects/find', {id: plan.project_id}, {root: true})
    return res.data.plan
  },
  /**
   * プランの削除
   * @param {ActionContext.<any,any>} context
   * @param {Plan} planId
   * @returns {Promise.<Plan>}
   */
  async remove (context, plan) {
    const res = await api.delete(`/plans/${plan.id}`)
    await context.dispatch('projects/find', {id: plan.project_id}, {root: true})
    return res.data.plan
  },
  /**
   * プランへの参加
   * @param {ActionContext.<any,any>} context
   * @param {Plan} plan
   * @returns {Promise.<void>}
   */
  async join (context, plan) {
    context.commit('addJoiningPlan', plan)
  },
  /**
   * プランから退会
   * @param {ActionContext.<any,any>} context
   * @param {Plan} plan
   */
  async leave (context, plan) {
    // FIXME: 開発有のデバッグ用の仕組みなので、あとで消す
    // FIXME: プロダクション版では必ず課金のチェックが必要
    await api.delete(`/plans/${plan.id}/join`)
    context.commit('removeJoiningPlan', plan.id)
  },

  async setJoiningPlans (context, plans) {
    context.commit('setJoiningPlans', plans)
  },

}

export const mutations = {
  setJoiningPlans (state, plans) {
    let r = {}
    plans.forEach(plan => { r[plan.id] = plan })
    state.joiningPlans = r
  },
  addJoiningPlan (state, plan) {
    Vue.set(state.joiningPlans, plan.id, plan)
  },
  removeJoiningPlan (state, planId) {
    Vue.delete(state.joiningPlans, planId)
  },
}
