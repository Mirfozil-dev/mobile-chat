<template>
    <q-page class="q-pa-md">
        <user-list :users="users" />
    </q-page>
</template>

<script>
import userList from 'src/components/userList';
import { mapGetters } from 'vuex';

export default {
  name: 'UsersPage',
  components: {
    userList,
  },
  computed: {
    ...mapGetters('store', ['users'])
  }
}
</script>
