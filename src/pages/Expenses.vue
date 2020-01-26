<template>
  <q-page class="q-py-xl">
    <div class="q-pa-md q-mr-sm">
      <q-linear-progress
        size="40px"
        :value="progress1"
        color="accent"
        class="q-mx-sm"
      >
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="accent" :label="progressLabel1" />
        </div>
      </q-linear-progress>
    </div>

    <q-list>
      <q-item v-for="(expense,index) in expenses" :key="index" class="q-my-md">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white" font-size="5">
           <div class="text-caption">${{ expense.amount }}</div>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ expense.title }}</q-item-label>
          <q-item-label caption lines="1">{{ expense.date }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="edit" color="secondary" @click="Edit" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="delete" color="red" @click="Delete" />
        </q-item-section>
        <q-separator />
      </q-item>
    </q-list>

    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      progress1: 0.3
    }
  },

  computed: {
    ...mapState('store', ['expenses']),
    progressLabel1 () {
      return (this.progress1 * 100).toFixed(2) + '%'
    }
  },
  methods: {
    ...mapActions('store', ['getExpenses']),
    Edit () {
      console.log(this.expenses)
    },
    Delete () {
      alert('Deleting')
    }
  },
  created () {
    this.getExpenses()
  }
}
</script>
