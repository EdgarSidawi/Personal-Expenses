import { axiosInstance } from '../boot/axios'

const state = {
  isLoggedIn: false,
  userinfo: {}

}

const getters = {
  isLoggedIn (state) {
    return state.isLoggedIn
  },
  userinfo (state) {
    return state.userinfo
  }
}

const mutations = {
  login (state, payload) {
    state.isLoggedIn = true
    state.userinfo = {
      user_id: payload.user_id,
      user: payload.user,
      email: payload.email
    }
    localStorage.setItem('user_id', payload.user_id)
    localStorage.setItem('user', payload.user)
    localStorage.setItem('email', payload.email)
    localStorage.setItem('token', payload.access_token)
  },
  logout (state) {
    state.isLoggedIn = false
    localStorage.clear()
  }

}

const actions = {
  registerUser ({ commit }, payload) {
    axiosInstance.post('api/auth/signup', payload).then(res => {
      commit('login', res.data)
    })
  },
  loginUser ({ commit }, payload) {
    axiosInstance.post('api/auth/login', payload).then(res => {
      commit('login', res.data)
    })
  },
  logout ({ commit }) {
    axiosInstance.post('api/auth/logout?token=' + localStorage.getItem('token')).then(res => {
      console.log(res)
    })
    commit('logout')
  },
  refreshToken ({ commit }) {
    axiosInstance.post('api/auth/refresh').then(res => {
      commit('login', res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
