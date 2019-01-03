import Vue from 'vue'
import Vuex from 'vuex'
import axios from './api/ajax'
import { Indicator } from 'mint-ui'
import { getCookie, setCookie } from './utils/common.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isFirstComeon: true, // 是否第一次进页面  第一次进需要认证token
    awardTokenAmount: 0, // 注册成功后的奖励
    token: getCookie('_token') || '',
    user_status: getCookie('user_status') || '', // token状态：1：真实用户，0：仅微信授权
    user: getCookie('user') && getCookie('user') != 'undefined' ? JSON.parse(getCookie('user')) : { nick: '', phone: '', userId: 0, authName: '' }
  },
  mutations: {
    setFirst(state) {
      state.isFirstComeon = false
    },
    setAwardTokenAmount(state, amount) {
      state.awardTokenAmount = amount
    },
    // 保存用户信息
    saveUser(state, user) {
      setCookie('user', JSON.stringify(user))
      state.user = user
    },
    // 保存用户信息
    saveUserInfo(state, data) {
      setCookie('_token', data.token)
      setCookie('user_status', data.status)
      setCookie('user', JSON.stringify(data.user))
      state.token = data.token
      state.user_status = data.status
      state.user = data.user
      state.awardTokenAmount = data.awardTokenAmount
    }
  },
  actions: {

  }
})
