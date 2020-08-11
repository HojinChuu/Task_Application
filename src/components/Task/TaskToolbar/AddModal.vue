<template>
	<div>
		<ion-header>
			<ion-toolbar>
				<ion-title>ADD TASK</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content fullscreen>
            <form @submit="onSubmit">
                <ion-list lines="full" class="ion-no-margin ion-no-padding">
                    <ion-item>
                        <ion-label position="stacked">Title <ion-text color="danger">*</ion-text></ion-label>
                        <ion-input :value="title" @input="title = $event.target.value" required type="text"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Descripton</ion-label>
                        <ion-textarea :value="description" @input="description = $event.target.value" rows="6" cols="20" placeholder="Enter any notes here..."></ion-textarea>
                    </ion-item>
                     <ion-item>
                        <ion-label position="floating">Deadline</ion-label>
                        <ion-datetime display-format="YYYY-MM-DD HH:mm" :min="current_date" :max="max_date"></ion-datetime>
                    </ion-item>
                </ion-list>
                <div class="ion-padding">
                <ion-button expand="block" type="submit" class="ion-no-margin">ADD</ion-button>
                </div>
            </form>
        </ion-content>
	</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
    name: 'AddModal',
    data() {
        return {
            title: "",
            description: ""
        }
    },
    computed: {
        current_date() {
            return moment().format('YYYY-MM-DD');
        },
        max_date() {
            return moment().add(3, 'years').format('YYYY-MM-DD');
        }
    },
	methods: {
        onSubmit(e) {
            e.preventDefault();
            this.deadline = moment(e.target[2].defaultValue).format('DD/MM/YYYY HH:mm');

            const headers = {
                'Authorization': this.access_token,
                'Content-Type': 'application/json'
            };

            const data = {
                title: this.title,
                description: this.description,
                deadline: this.deadline,
                completed: "N"
            }

            axios.post('http://localhost/restapi/tasks', data, {headers})
            .then((response) => {
                this.$ionic.alertController.create({
                    header: "Good !",
                    message: "새로운 Task를 만들었습니다.", 
                    buttons: ["OK"]}).then(a => a.present());

                this.$ionic.modalController.dismiss()
            }).then(() => {
                this.$router.go();
            })
        }
	}
}
</script>