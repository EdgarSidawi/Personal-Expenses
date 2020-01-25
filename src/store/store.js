import { axiosInstance } from '../boot/axios'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  getExpenses ({ commit }, payload) {
    console.log('getExpenses')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
