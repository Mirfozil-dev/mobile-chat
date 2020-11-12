<template>
    <q-item
        clickable
        v-ripple
        :to="'/chat/' + userId"
    >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ shortName(user.name) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" :color="user.online ? 'positive' : 'grey'" />
        </q-item-section>
    </q-item>
</template>

<script>
export default {
  name: 'userListItem',
  props: {
    user: {
      type: Object,
      isRequired: true,
    },
    userId: {
      type: String,
      isRequired: true,
    }
  },
  methods: {
    shortName(name) {
      return name.charAt(0)
    }
  }
}
</script>
