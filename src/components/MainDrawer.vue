<template>
  <q-page>
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="767"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item
            exact
            clickable
            v-ripple
            to="/">
              <q-item-section avatar>
                <q-icon name="list" />
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

            <q-item clickable v-ripple class="q-mt-xl text-red" >
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
            <div class="text-weight-bold">Edgar Sidawi</div>
            <div>edgarfranksidawi@gmail.com</div>
          </div>
        </q-img>
      </q-drawer>
  </q-page>
</template>

<script>
export default {
  props: ['leftDrawerOpen']

}
</script>

<style>

</style>
