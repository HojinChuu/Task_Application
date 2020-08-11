<template>
    <ion-fab @click="refreshToken" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
            <ion-icon name="sync-outline"></ion-icon>        
        </ion-fab-button>
    </ion-fab>
</template>

<script>
import axios from 'axios';

export default {
    name: "RefreshBtn",
    props: ['access_token', 'session_id', 'refresh_token'],
    data() {
        return {
            userinfo: {}
        }
    },
    methods: {
        refreshToken() {
            return this.$ionic.loadingController
            .create({
                cssClass: 'my-custom-class',
                message: '세션을 새로 고치는 중...',
                duration: 1000,
            }).then(loading => {
                return loading.present()
            }).then(() => {
                const headers = {
                    'Authorization': this.access_token,
                    'Content-Type': 'application/json'
                };
                const data = { refresh_token: this.refresh_token }

                axios.patch(`http://localhost/restapi/sessions/${this.session_id}`, data, {headers})
                .then((response) => {
                    sessionStorage.removeItem("userinfo");
                    this.userinfo = JSON.stringify(response.data.data);
                    sessionStorage.setItem("userinfo", this.userinfo);
                    this.$router.go();
                })
            })
        },
    }
}
</script>