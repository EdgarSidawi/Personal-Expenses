import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

// axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

Vue.prototype.$axios = axiosInstance

export { axiosInstance }
