<template>
  <ion-fab @click="refreshTokenClick" vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button>
      <ion-icon name="sync-outline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: "RefreshBtn",
  computed: {
    ...mapGetters([ 'accessToken', 'refreshToken', 'sessionID' ])
  },
  methods: {
    ...mapActions([ 'REFRESH_TOKEN' ]),
    
    refreshTokenClick() {
      const headers = {
        "Authorization": this.accessToken,
        "Content-Type": "application/json"
      };
      const data = { refresh_token: this.refreshToken }
      const session_id = this.sessionID

      return this.$ionic.loadingController.create({
        message: "session refreshing...",
        duration: 1000
      }).then(loading => { return loading.present() })
      .then(() => {
        this.REFRESH_TOKEN({data, session_id, headers}).then(() => {
          this.$router.go();
        })
      })
    }
  }
}
</script>
