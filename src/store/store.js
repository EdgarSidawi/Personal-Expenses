import { axiosInstance } from '../boot/axios'

const state = {
  expenses: [],
  session: false,
  budget: null,
  totalExpense: null
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
  },
  setSession (state, payload) {
    state.session = true
    state.budget = payload
  },
  setTotalExpense (state, payload) {
    if (state.expenses.length > 0) {
      let totalAmount = 0
      for (let i = 0; i < state.expenses.length; i++) {
        totalAmount += state.expenses[i].amount
      }
      state.totalExpense = totalAmount / state.budget
    }
  },
  addToTotalExpense (state, payload) {
    let newValue = payload / state.budget
    state.totalExpense += newValue
  },
  subFromTotalExpense (state, payload) {
    let amount = state.expenses[payload].amount
    let newValue = amount / state.budget
    state.totalExpense -= newValue
  },
  editTotalExpense (state, payload) {
    let oldAmount = state.expenses[payload.index].amount
    let newAmount = payload.data.amount
    let difference = newAmount - oldAmount
    let newValue = difference / state.budget
    state.totalExpense += newValue
  }

}

const actions = {
  getExpenses ({ commit }) {
    axiosInstance.get(`api/${localStorage.getItem('session')}/expense`)
      .then(res => {
        commit('setExpenses', res.data)
        commit('setTotalExpense')
      })
  },
  addExpense ({ commit }, payload) {
    axiosInstance.post(`api/${localStorage.getItem('session')}/expense`, payload)
      .then(res => {
        commit('addNewExpense', {
          id: res.data.id,
          title: res.data.title,
          amount: res.data.amount,
          created_at: res.data.created_at
        })
        commit('addToTotalExpense', res.data.amount)
      })
  },
  editExpense ({ commit }, payload) {
    axiosInstance.patch(`api/${localStorage.getItem('session')}/expense/${payload.expenseInfo.id}`, payload.form)
      .then(res => {
        let expenseInfo = {
          data: res.data,
          index: payload.expenseInfo.index
        }
        commit('editTotalExpense', expenseInfo)
        commit('editExpenseValue', expenseInfo)
      })
  },
  deleteExpense ({ commit }, payload) {
    axiosInstance.delete(`api/${localStorage.getItem('session')}/expense/${payload.id}`)
      .then(res => {
        commit('subFromTotalExpense', payload.index)
        commit('removeExpense', payload.index)
      })
  },
  getSession ({ commit, dispatch }) {
    axiosInstance.get('api/session?token=' + localStorage.getItem('token')).then(res => {
      if (res.data.length !== 0) {
        localStorage.setItem('session', res.data[0].id)
        commit('setSession', res.data[0].budget)
        dispatch('getExpenses')
      }
    })
  },
  createSession ({ commit, dispatch }, payload) {
    axiosInstance.post('api/session?token=' + localStorage.getItem('token'), payload).then(res => {
      commit('setSession')
      dispatch('getSession')
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
