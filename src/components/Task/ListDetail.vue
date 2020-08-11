<template>
    <ion-item>
        <ion-grid>
            <ion-row>
                <ion-toggle color="primary"></ion-toggle>
                <div @click="openModal" class="ion-padding-start">
                    <ion-label>{{ task.title }}</ion-label>
                </div>
            </ion-row>
        </ion-grid>
        <ion-button color="danger" @click="removeTask">				
            <ion-icon name="trash-outline" size="small"></ion-icon>          
        </ion-button>
    </ion-item>
</template>

<script>
import axios from 'axios';
import InfoModal from './InfoModal';

export default {
	name: "ListDetail",
	components: { InfoModal },
	props: ['task', 'access_token'],
	methods: {
	    openModal() {
		    return this.$ionic.modalController.create({
				component: InfoModal,
				cssClass: 'my-custom-class',
				componentProps: {
					data: { task_info: this.task },
				}
			}).then(m => m.present())
		},
		removeTask() {
			const headers = {'Authorization': this.access_token};

            axios.delete(`http://localhost/restapi/tasks/${this.task.id}`, { headers })
            .then(response => {
                this.$ionic.alertController.create({
                    header: "끝 !",
                    message: "삭제 되었습니다.", 
                    buttons: ["OK"]}).then(a => a.present());
                    
                this.$router.go()
            })
		}
	}
}
</script>