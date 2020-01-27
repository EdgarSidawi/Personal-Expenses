<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapActions('authStore', ['refreshToken'])
  },
  mounted () {
    if (localStorage.getItem('token') !== null) {
      this.refreshToken()
    }
    console.log(localStorage.getItem('token'))
  }
}
</script>
