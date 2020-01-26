import { axiosInstance } from '../boot/axios'

const state = {
  expenses: []

}

const getters = {

}

const mutations = {
  setExpenses (state, payload) {
    state.expenses = payload
  },
  addNewExpense (state, payload) {
    state.expenses.push(payload)
  }

}

const actions = {
  getExpenses ({ commit }) {
    axiosInstance.get('api/1/expense').then(res => {
      commit('setExpenses', res.data)
    })
  },
  addExpense ({ commit }, payload) {
    axiosInstance.post('api/1/expense', payload).then(res => {
      commit('addNewExpense', { title: res.data.title, amount: res.data.amount })
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
