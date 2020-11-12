<template>
  <q-page
    ref="ChatPage"
    class="chat-page flex column"
  >
    <div :class="{ 'invisible' : !showMessages }" class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message,key) in messages"
        :key="key"
        :name="message.from === 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        class="q-message"
        :sent="message.from === 'me'"
        :bg-color="message.from === 'me' ? 'blue-2' : 'grey-3'"
      >
        <template v-slot:avatar>
          <q-avatar v-if="message.from !== 'me'" class="bg-primary q-mx-sm text-white text-capitalize circle text-center" size="md">
            {{ shortName(message.from) }}
            </q-avatar>
        </template>
      </q-chat-message>
    </div>
    <q-footer class="q-pa-sm">
      <q-form @submit="sendMessage" class="full-width row justify-center">
        <q-input ref="newMessage" class="col-10" v-model="newMessage" outlined rounded dense bg-color="white" label="Send" />
        <q-btn round color="white" padding="10px" dense flat icon="send" type="submit" />
      </q-form>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details';

export default {
  name: 'ChatPage',
  mixins: [mixinOtherUserDetails],
  data () {
    return {
      newMessage: '',
      showMessages: false,
    }
  },
  methods: {
    ...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: 'me'
        },
        otherUserId: this.$route.params.userId
      })
      this.newMessage = ''
      this.$refs.newMessage.focus()
    },
    shortName(name) {
      return name.charAt(0)
    },
    scrollBottom() {
      let ChatPage = this.$refs.ChatPage.$el
      setTimeout(() => {
        window.scrollTo(0, ChatPage.scrollHeight)
      }, 20)
    }
  },
  computed: {
    ...mapState('store', ['messages', 'userDetails']),
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length) {
        this.scrollBottom()
        setTimeout(() => {
          this.showMessages = true
        }, 20)
      }
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.userId)
  },
  destroyed() {
    this.firebaseStopGettingMessages()
  }
}
</script>

<style scoped>
  .circle{
    border-radius: 50%;
  }
  .q-message{
    z-index: 1;
  }
</style>
