<template>
  <form @submit="onSubmit">
    <ion-list lines="full" class="ion-no-margin ion-no-padding">
      <ion-item>
        <ion-label position="stacked"
          >Full Name <ion-text color="danger">*</ion-text></ion-label
        >
        <ion-input
          :value="fullname"
          @input="fullname = $event.target.value"
          type="text"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked"
          >User Name <ion-text color="danger">*</ion-text></ion-label
        >
        <ion-input
          :value="username"
          @input="username = $event.target.value"
          type="text"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked"
          >Password <ion-text color="danger">*</ion-text></ion-label
        >
        <ion-input
          :value="password"
          @input="password = $event.target.value"
          type="password"
        ></ion-input>
      </ion-item>
    </ion-list>

    <div class="ion-padding">
      <ion-button expand="block" type="submit" class="ion-no-margin"
        >Create account</ion-button
      >
    </div>

    <ion-toolbar>
      <ion-title>
        <router-link to="/">Back</router-link>
      </ion-title>
    </ion-toolbar>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      fullname: "",
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.fullname == "" || this.username == "" || this.password == ""
        ? this.showAlert()
        : this.register();

      this.fullname = "";
      this.username = "";
      this.password = "";
    },
    showAlert() {
      return this.$ionic.alertController
        .create({
          header: "Warning !",
          message: "빈칸을 모두 채워주세요",
          buttons: ["OK"]
        })
        .then(a => a.present());
    },
    register() {
      const headers = { "Content-Type": "application/json" };
      const data = {
        fullname: this.fullname,
        username: this.username,
        password: this.password
      };

      axios
        .post("http://localhost/restapi/users", data, { headers })
        .then(response => {
          this.$ionic.alertController
            .create({
              header: "Welcome !",
              message: "회원가입 되었습니다.",
              buttons: ["OK"]
            })
            .then(a => a.present());

          this.$router.push({ name: "Login" });
        });
    }
  }
};
</script>
