<template>
  <form @submit="onSubmit">
    <ion-list lines="full" class="ion-no-margin ion-no-padding">
      <ion-item>
        <ion-label position="stacked">User Name <ion-text color="danger">*</ion-text></ion-label>
        <ion-input :value="username" @input="username = $event.target.value" type="text"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Password <ion-text color="danger">*</ion-text></ion-label>
        <ion-input :value="password" @input="password = $event.target.value" type="password"></ion-input>
      </ion-item>
    </ion-list>

    <div class="ion-padding">
      <ion-button expand="block" type="submit" class="ion-no-margin">OK</ion-button>
    </div>

    <ion-toolbar>
      <ion-title>
        <router-link to="/register">Don't have an Account?</router-link>
      </ion-title>
    </ion-toolbar>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import showAlert from '../../alert'

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      userinfo: {}
    };
  },
  methods: {
    ...mapActions([ 'LOGIN' ]),

    onSubmit(e) {
      e.preventDefault();
      (this.username == "" || this.password == "")
      ? showAlert.error('Oops..', "모두 입력해주세요")
      : this.login()

      this.username = ""
      this.password = ""
    },

    login() {
      const headers = { "Content-Type": "application/json" };
      const data = {
        username: this.username,
        password: this.password
      }
      
      this.LOGIN({data, headers})
        .then(() => {
          showAlert.success('Hello !', '로그인 되었습니다')
          this.$router.push({ name: "Task" })
        })
    }
  }
}
</script>
