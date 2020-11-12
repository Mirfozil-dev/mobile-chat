<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white flex flex-center q-pa-sm">
      <q-btn
        v-if="$route.fullPath.includes('/chat')"
        v-go-back.single
        icon="fas fa-chevron-left"
        dense
        flat
       />
      <q-space />
      <p class="text-h5 q-ma-none">
        {{ title }}
      </p>
       <q-space />
      <p v-if="!otherUserDetails.online && $route.fullPath.includes('/chat')" class="q-ma-none">offline</p>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="!$route.fullPath.includes('/chat')" bordered class="bg-grey-1 text-black">
      <q-list v-if="userDetails.userID" class="flex justify-around">
        <q-item class="flex flex-center" clickable to="/users" v-ripple>
          <q-icon name="far fa-comments" size="md" />
        </q-item>
        <q-item class="flex flex-center" clickable to="/profile" v-ripple>
          <q-icon name="far fa-user" size="md" />
        </q-item>
      </q-list>
    </q-footer>

  </q-layout>
</template>

<script>
import {mapState} from "vuex";
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details';

export default {
  name: 'MainLayout',
  mixins: [mixinOtherUserDetails],
  data () {
    return {}
  },
  computed: {
    ...mapState('store', ['userDetails']),
    title() {
      const currentPath = this.$route.fullPath
      if (currentPath.includes('/chat')) return this.otherUserDetails.name
      else if (currentPath == '/profile') return 'Profile'
      else if (currentPath == '/auth') return 'Register'
      else if (currentPath == '/users') return 'Users'
      else return 'Quasar Chat'
    }
  },
}
</script>
