<template>
  <q-page class="q-ma-lg">
    <h5>History</h5>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('authStore', ['isLoggedIn'])
  },
  created () {
    if (!this.isLoggedIn) {
      this.$router.replace('/')
    }
  }
}
</script>

<style>

</style>
