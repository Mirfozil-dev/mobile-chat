<template>
  <q-page>
     <q-card class="shadow-0">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <my-form :tab="tab" />
          </q-tab-panel>

          <q-tab-panel name="register">
            <my-form :tab="tab" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
  </q-page>
</template>

<script>
import myForm from 'components/myForm';

export default {
  name: 'AuthPage',
  components: {
    myForm
  },
  data() {
    return {
      tab: 'login',
    }
  }
}
</script>
