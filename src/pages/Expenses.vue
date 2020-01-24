<template>
  <q-page-container>
    <q-page>
      <div class="q-pa-md q-mr-sm">
        <q-linear-progress
          size="40px"
          :value="progress1"
          color="accent"
          class="q-mx-sm "
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="accent"
              :label="progressLabel1"
            />
          </div>
        </q-linear-progress>
      </div>

        <q-list>
          <q-item
            v-for="contact in contacts"
            :key="contact.id"
            class="q-my-md"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">{{
                contact.letter
              }}</q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contact.name }}</q-item-label>
              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="edit" color="secondary" />
            </q-item-section>
            <q-item-section side>
              <q-icon name="delete" color="red" />
            </q-item-section>
            <q-separator />
          </q-item>
        </q-list>

        <q-page-sticky position="bottom" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" />
          </q-page-sticky>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  data () {
    return {
      progress1: 0.3,
      contacts: [
        {
          id: 1,
          name: 'Ruddy Jedrzej',
          email: 'rjedrzej0@discuz.net',
          letter: 'R'
        },
        {
          id: 2,
          name: 'Mallorie Alessandrini',
          email: 'malessandrini1@marketwatch.com',
          letter: 'M'
        },
        {
          id: 3,
          name: 'Elisabetta Wicklen',
          email: 'ewicklen2@microsoft.com',
          letter: 'E'
        }
      ]
    }
  },

  computed: {
    progressLabel1 () {
      return (this.progress1 * 100).toFixed(2) + '%'
    }
  }
}
</script>
