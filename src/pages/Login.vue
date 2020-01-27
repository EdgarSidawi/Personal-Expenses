<template>
  <q-page>
    <div class="q-pa-xl q-ma row justify-center">
      <div class="q-gutter-y-md col" style="max-width: 600px">
      <q-card class="card">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <q-form
            @submit.prevent
            class="q-gutter-md"
            >
            <q-input
                filled
                type="email"
                v-model="loginForm.email"
                label="Email"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter your email',
                val=> val.includes('@') || 'Please enter a valid email']"
            />

            <q-input
                filled
                type="password"
                v-model="loginForm.password"
                label="Password"
                lazy-rules
                :rules="[
                val => val && val.length > 0 || 'Please enter your password',
                ]"
            />
            <div>
                <q-btn label="Login" type="submit" color="primary" @click="login"/>
            </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="register">
            <q-form
                @submit.prevent
                class="q-gutter-md"
                >
                <q-input
                    filled
                    type="text"
                    v-model="registerForm.name"
                    label="Name"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please enter your name']"
                />
                <q-input
                    filled
                    type="email"
                    v-model="registerForm.email"
                    label="Email"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please enter your email',
                    val=> val.includes('@') || 'Please enter a valid email']"
                />

                <q-input
                    filled
                    type="password"
                    v-model="registerForm.password"
                    label="Password"
                    lazy-rules
                    :rules="[
                    val => val && val.length > 0 || 'Please enter your password',
                    ]"
                />
                <div>
                    <q-btn label="Register" type="submit" color="primary" @click="register"/>
                </div>
            </q-form>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>

    </div>
  </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: ''
      },
      tab: 'login'
    }
  },
  computed: {
    ...mapGetters('authStore', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('authStore', ['registerUser', 'loginUser']),
    login () {
      if (this.loginForm.email.indexOf('@') !== -1 && this.loginForm.password !== '') {
        this.loginUser(this.loginForm)
      }
    },
    register () {
      if (this.registerForm.email.indexOf('@') !== -1 && this.registerForm.password !== '' && this.registerForm.name !== '') {
        this.registerUser(this.registerForm)
      }
    }
  },
  watch: {
    isLoggedIn () {
      if (this.isLoggedIn) {
        this.$router.push('/expenses')
      }
    }
  }
}
</script>
