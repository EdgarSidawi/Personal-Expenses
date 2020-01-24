<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="q-pl-lg">
          {{title}}
        </q-toolbar-title>

          <main-drawer :leftDrawerOpen="leftDrawerOpen"/>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import mainDrawer from '../components/Drawer'

export default {
  data () {
    return {
      leftDrawerOpen: false
    }
  },

  computed: {
    title () {
      let currentPath = this.$route.fullPath
      if (currentPath === '/') {
        return 'Personal Expenses'
      } else if (currentPath === '/history') {
        return 'History'
      } else if (currentPath === '/help') {
        return 'Help'
      }
      return null
    }
  },
  components: {
    mainDrawer
  }
}
</script>
