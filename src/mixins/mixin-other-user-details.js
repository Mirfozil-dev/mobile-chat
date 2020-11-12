export default {
  computed: {
    otherUserDetails() {
      if (this.$store.state.store.users[this.$route.params.userId]) {
        return this.$store.state.store.users[this.$route.params.userId]
      }
      return {}
    }
  }
}
