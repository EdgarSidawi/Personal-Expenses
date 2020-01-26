import { axiosInstance } from '../boot/axios'

const state = {
  expenses: null

}

const getters = {

}

const mutations = {
  setExpenses (state, payload) {
    state.expenses = payload
  }

}

const actions = {
  getExpenses ({ commit }) {
    axiosInstance.get('api/1/expense').then(res => {
      commit('setExpenses', res.data)
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
