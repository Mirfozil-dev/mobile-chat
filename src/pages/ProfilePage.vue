<template>
  <q-page>
    <template v-if="userDetails.userID">
      <div class="flex column q-mx-lg">
        <q-avatar class="q-mt-xl" size="100px" font-size="52px" color="primary" text-color="white">
          {{ userDetails.name[0] }}
        </q-avatar>
      </div>
      <div class="q-mx-lg q-mt-md">
        <p class="text-h5">Account details</p>
        <div class="flex text-grey-8">
          <q-icon size="xs" class="q-my-auto" name="far fa-user" />
          <p class="text-h6 q-mx-xs q-ma-none">{{ userDetails.name }}</p>
        </div>
        <div class="flex text-grey-8">
          <q-icon size="xs" class="q-my-auto" name="far fa-envelope" />
          <p class="text-h6 q-mx-xs q-ma-none">{{ userDetails.email }}</p>
        </div>
        <q-btn @click="logoutUser" class="float-right q-mt-md" color="primary" label="Log out" />
      </div>
    </template>
    <template v-else>
      <div class="flex column items-center">
        <q-avatar class="q-my-xl" icon="far fa-comment-dots" size="130px" font-size="52px" color="primary" text-color="white" />
        <p class="text-h5 q-mt-md text-center">Welcome to My Chat <br> Let`s start !</p>
        <q-btn label="start" color="primary" class="q-px-lg q-mt-md" unelevated to="/auth" />
      </div>
    </template>
  </q-page>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: 'ProfilePage',
  computed: {
    ...mapState('store', ['userDetails']),
  },
  methods: {
    ...mapActions('store', ['logoutUser'])
  }
}
</script>
