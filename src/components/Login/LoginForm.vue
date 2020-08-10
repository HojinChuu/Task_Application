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
import axios from 'axios';

export default {
    name: "LoginForm",
    data() {
        return {
            username: "",
            password: "",
            userinfo: {}
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            (this.username == "" || this.password == "") ? 
            this.showAlert() : this.login();

            this.username = "";
            this.password = "";
        },
        showAlert() {
            return this.$ionic.alertController.create({
                header: "Warning !",
                message: "빈칸을 모두 채워주세요",
                buttons: ["OK"]
            }).then(a => a.present());
        },
        login() {
            const headers = {'Content-Type': 'application/json'};
            const data = {
                username: this.username,
                password: this.password
            }

            axios.post('http://localhost/restapi/sessions', data, {headers})
            .then((response) => {
                this.$ionic.alertController.create({
                    header: "Hello !",
                    message: "로그인 되었습니다.", 
                    buttons: ["OK"]}).then(a => a.present());

                this.userinfo = JSON.stringify(response.data.data);
                sessionStorage.setItem("userinfo", this.userinfo);
                // this.$emit("user-info", this.userinfo);
                this.$router.push({ name: 'Task' })
            })
        }
    }
}
</script>
