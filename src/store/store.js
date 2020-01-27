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
  },
  editExpenseValue (state, payload) {
    state.expenses[payload.index].title = payload.data.title
    state.expenses[payload.index].amount = payload.data.amount
  },
  removeExpense (state, payload) {
    state.expenses.splice(payload, 1)
  }

}

const actions = {
  getExpenses ({ commit }) {
    axiosInstance.get(`api/${localStorage.getItem('session')}/expense`)
      .then(res => {
        commit('setExpenses', res.data)
      })
  },
  addExpense ({ commit }, payload) {
    console.log('add Expense reached')
    axiosInstance.post(`api/${localStorage.getItem('session')}/expense`, payload)
      .then(res => {
        commit('addNewExpense', {
          id: res.data.id,
          title: res.data.title,
          amount: res.data.amount,
          created_at: res.data.created_at
        })
      })
  },
  editExpense ({ commit }, payload) {
    axiosInstance.patch(`api/${localStorage.getItem('session')}/expense/${payload.expenseInfo.id}`, payload.form)
      .then(res => {
        let expenseInfo = {
          data: res.data,
          index: payload.expenseInfo.index
        }
        commit('editExpenseValue', expenseInfo)
      })
  },
  deleteExpense ({ commit }, payload) {
    axiosInstance.delete(`api/${localStorage.getItem('session')}/expense/${payload.id}`)
      .then(res => {
        commit('removeExpense', payload.index)
      })
  },
  getSession ({ commit, dispatch }) {
    axiosInstance.get('api/session?token=' + localStorage.getItem('token')).then(res => {
      console.log(res)
      console.log(res.data)
      console.log(res.data[0])
      console.log(res.data.length)
      if (res.data.length !== 0) {
        localStorage.setItem('session', res.data[0].id)
        dispatch('getExpenses')
      }
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
