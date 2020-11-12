<template>
  <q-form @submit="submitForm">
    <div v-if="tab === 'login'" class="flex flex-center q-my-lg">
      <q-avatar size="100px" font-size="52px" color="primary" text-color="white" icon="fas fa-user" />
    </div>
    <div v-else class="flex flex-center q-my-lg">
      <q-avatar size="100px" font-size="52px" color="primary" text-color="white" icon="fas fa-clipboard-list" />
    </div>
    <q-input v-if="tab === 'register'" class="q-mb-md" placeholder="Name" v-model="formData.name" outlined>
      <template v-slot:prepend>
        <q-icon name="fas fa-user" />
      </template>
    </q-input>
    <q-input class="q-mb-md" placeholder="Email" v-model="formData.email" outlined>
      <template v-slot:prepend>
          <q-icon name="far fa-envelope" />
        </template>
    </q-input>
    <q-input class="q-mb-md" autocomplete placeholder="Password" v-model="formData.password" outlined :type="isPwd ? 'password' : 'text'">
       <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      <template v-slot:prepend>
        <q-icon name="fas fa-lock" />
      </template>
    </q-input>
    <div class="row">
      <q-space/>
      <q-btn :label="tab" color="primary" type="submit" />
    </div>
  </q-form>
</template>
<script>

import { mapActions, mapState } from 'vuex'
export default {
  name: 'myForm',
  props: ['tab'],
  data() {
    return {
      isPwd: true,
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('store', ['userDetails'])
  },
  methods: {
    ...mapActions('store', ['registerUser', 'loginUser']),
    submitForm(){
      if(this.tab === 'login') {
        this.loginUser(this.formData);
      }
      else {
        this.registerUser(this.formData);
      }
      this.formData = {
        name: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>
