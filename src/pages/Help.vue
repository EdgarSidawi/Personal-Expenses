<template>
    <q-page class="q-pa-xl">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam fuga
        sint maiores quas quia cumque in perspiciatis non amet? Laboriosam
        provident amet quia eos at vero hic, obcaecati voluptate iure?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam fuga
        sint maiores quas quia cumque in perspiciatis non amet? Laboriosam
        provident amet quia eos at vero hic, obcaecati voluptate iure?
      </p>
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
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
