<template>
  <ion-button @click="logout">
    <i class="fas fa-sign-out-alt fa-lg"></i>
  </ion-button>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import showAlert from '../../../alert'

export default {
  name: "Logout",
  computed: {
    ...mapGetters([ 'accessToken', 'sessionID' ])
  },
  methods: {
    ...mapActions([ 'LOGOUT' ]),
    logout() {
      const headers = { "Authorization": this.accessToken }
      const session_id = this.sessionID

      this.LOGOUT({session_id, headers}).then(() => {
        showAlert.success('Bye', 'Logout', 'success')
        this.$router.push({ name: "Login" })
      })
    }
  }
}
</script>
