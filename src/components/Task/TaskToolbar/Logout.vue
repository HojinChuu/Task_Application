<template>
  <ion-button @click="logout">
    <small>LOGOUT</small>
  </ion-button>
</template>

<script>
import axios from "axios";

export default {
  name: "Logout",
  props: ["access_token", "session_id"],
  methods: {
    logout() {
      const headers = { Authorization: this.access_token };

      axios
        .delete(`http://localhost/restapi/sessions/${this.session_id}`, {
          headers
        })
        .then(response => {
          this.$ionic.alertController
            .create({
              header: "Bye !",
              message: "로그아웃 되었습니다.",
              buttons: ["OK"]
            })
            .then(a => a.present());

          sessionStorage.removeItem("userinfo");
          this.$router.push({ name: "Login" });
        });
    }
  }
};
</script>
