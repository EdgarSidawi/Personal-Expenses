<template>
<div>

  <q-page v-if="!session" class="q-pa-xl">
      <q-form
         @submit.prevent
          class="q-gutter-md"
      >
        <q-input
          filled
          type="number"
          v-model="budgetInfo.budget"
          label="Your Budget"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please in an valid amount',
          val => val > 0 || 'Amount can not be a negative number']"
        />
        <q-btn label="Start Session" color="green" @click="sessionCreate"/>
      </q-form>
  </q-page>

  <q-page class="q-py-xl" v-if="session">
    <div class="q-pa-md q-mr-sm">
      <q-linear-progress
        size="40px"
        :value="totalExpense"
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
          <q-item-label caption lines="1">{{ expense.created_at }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="edit" color="secondary" @click="Edit(index)" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="delete" color="red" @click="Delete(index)" />
        </q-item-section>
        <q-separator />
      </q-item>
    </q-list>

    <q-page-sticky position="bottom" :offset="[18, 18]" >
      <q-btn fab icon="add" color="accent" @click="showDialog=true"/>
    </q-page-sticky>

    <q-dialog v-model="showDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card q-pa-md" >
        <q-form
        @submit.prevent
        class="q-gutter-md"
        >
          <q-input
            filled
            v-model="form.title"
            label="Your title "
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            type="amount"
            v-model="form.amount"
            label="The amount "
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type your amount',
              val => val > 0  || 'Please type a real number'
            ]"
          />

          <div>
            <div v-if="editing">
            <q-btn
            label="Edit"
            type="submit"
            color="primary"
            @click="editExpenseValue"
            />
             <q-btn flat color="red" label="Cancel" @click="resetForm"/>
            </div>

            <div v-else>
            <q-btn
            label="Add Expense"
            type="submit"
            color="primary"
            @click="newExpense"/>
            <q-btn flat color="red" label="Cancel" @click="resetForm"/>
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>

  </q-page>
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      budgetInfo: {
        budget: null
      },
      expenseInfo: {
        id: null,
        index: null
      },
      editing: false,
      form: {
        title: '',
        amount: null
      },
      showDialog: false
    }
  },

  computed: {
    ...mapState('store', ['expenses', 'session', 'budget', 'totalExpense']),
    ...mapGetters('authStore', ['isLoggedIn']),
    progressLabel1 () {
      return (this.totalExpense * 100).toFixed(2) + '%'
    },
    progress () {
      let percentage = (this.totalExpense / this.budget)
      return percentage
    }
  },
  methods: {
    ...mapActions('store', [
      'getExpenses',
      'addExpense',
      'editExpense',
      'deleteExpense',
      'getSession',
      'createSession'
    ]),
    Edit (index) {
      this.editing = true
      this.showDialog = true
      this.form.title = this.expenses[index].title
      this.form.amount = this.expenses[index].amount
      this.expenseInfo.id = this.expenses[index].id
      this.expenseInfo.index = index
    },
    Delete (index) {
      let payload = {
        id: this.expenses[index].id,
        index: index
      }
      this.deleteExpense(payload)
    },
    resetForm () {
      this.form = {}
      this.editing = false
      this.showDialog = false
      this.expenseId = null
    },
    newExpense () {
      if (this.form.title !== '' && this.form.amount != null) {
        this.addExpense(this.form)
        this.resetForm()
      }
    },
    editExpenseValue () {
      if (this.form.title !== '' && this.form.amount != null) {
        let payload = {
          form: this.form,
          expenseInfo: this.expenseInfo
        }
        // this.expenses[this.expenseInfo.index].title = this.form.title
        // this.expenses[this.expenseInfo.index].amount = this.form.amount
        this.editExpense(payload)
        this.resetForm()
      }
    },
    sessionCreate () {
      if (this.budgetInfo.budget !== null && this.budgetInfo.budget > 0) {
        this.createSession(this.budgetInfo)
      }
    }
  },
  created () {
    if (!this.isLoggedIn) {
      this.$router.replace('/')
    } else {
      this.getSession()
    }
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
</style>
