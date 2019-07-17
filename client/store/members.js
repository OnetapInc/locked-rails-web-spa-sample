import api from '../lib/api'

export const state = () => {
  return {}
}

export const actions = {
  async findByProjectId (context, projectId) {
    const {data} = await api.get(`/projects/${projectId}/members`)
    return data.members
  },
  async invite (context, payload) {
    const {projectId, email, role} = payload
    const {data} = await api.post(`/projects/${projectId}/members/invite`, {email, role})
    return data.members
  },
  async acceptInvite (context, payload) {
    const {notification, invite} = payload
    await api.post(`/projects/${invite.project_id}/members/accept`,
      {notification_id: notification.id, invite_id: invite.id, ...invite},
    )
  },
  async denyInvite (context, payload) {
    const {notification, invite} = payload
    await api.post(`/projects/${invite.project_id}/members/deny`, {
      notification_id: notification.id,
      invite_id: invite.id,
      ...invite
    })
  },
  async update (context, member) {
    await api.put(`/projects/${member.project_id}/members/${member.id}`, {member})
  },
  async remove (context, member) {
    await api.delete(`/projects/${member.project_id}/members/${member.id}`, {member})
  }
}

export const mutations = {}
