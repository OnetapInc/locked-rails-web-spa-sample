import axios from 'axios'
import api from '../lib/api'
import config from '~/config/config'

export const state = () => {
  return {}
}

export const actions = {
  async getToken (context, {card, expire, securityCode}) {
    const {data} = await axios.post('https://api.veritrans.co.jp/4gtoken', {
      card_number: card,
      card_expire: expire,
      security_code: securityCode,
      token_api_key: config.token_api_key,
    })
    return data
  },
  async getPaymentMethod (context) {
    const {data} = await api.get('/payments/methods')
    return data.payment_method
  },
  // クレジットカードの登録
  async register (context, {token, req_card_number}) {
    const {data} = await api.post('/payments/register-card', {token: token, card_number: req_card_number})
    return data
  },
  // プランへの加入と与信(売上確定は翌月1日)
  async subscribe (context, {planId}) {
    const {data} = await api.post('/payments/subscribe', {plan_id: planId})
    return data
  },
}

export const mutations = {}
