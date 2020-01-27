<template>
  <q-layout view="lHh Lpr lFf" light>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-show="title !== 'Login'"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="q-pl-lg">
          <span>
           {{title == 'Login' ? 'Welcome to My Expenses App': title}}
          </span>
        </q-toolbar-title>

         <q-drawer
         v-if="title !== 'Login'"
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="767"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd color:black">
          <q-list padding light class="text-dark">
            <q-item
            exact
            clickable
            v-ripple
            to="/expenses">
              <q-item-section avatar>
                <q-icon name="list"/>
              </q-item-section>

              <q-item-section>
                Expenses
              </q-item-section>
            </q-item>

            <q-item
            exact
            clickable
            v-ripple
            to="/history">
              <q-item-section avatar>
                <q-icon name="history" />
              </q-item-section>

              <q-item-section>
                History
              </q-item-section>
            </q-item>

            <q-item
            exact
            clickable
            v-ripple
            to="/help">
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple class="q-mt-xl text-red" @click="logOut">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section>
                Log Out
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{setUserInfo.user}}</div>
            <div>{{setUserInfo.email}}</div>
          </div>
        </q-img>
      </q-drawer>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      leftDrawerOpen: false
    }
  },

  computed: {
    ...mapGetters('authStore', ['isLoggedIn', 'userinfo']),
    title () {
      let currentPath = this.$route.fullPath
      if (currentPath === '/') {
        return 'Login'
      } else if (currentPath === '/expenses') {
        return 'Personal Expenses'
      } else if (currentPath === '/history') {
        return 'History'
      } else if (currentPath === '/help') {
        return 'Help'
      }
      return null
    },
    setUserInfo () {
      return this.userinfo
    }
  },
  watch: {
    isLoggedIn () {
      if (!this.isLoggedIn) {
        this.$router.replace('/')
      }
    }
  },
  methods: {
    ...mapActions('authStore', ['logout']),
    logOut () {
      this.logout()
    }
  }
}
</script>
