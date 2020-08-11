<template>
    <ion-item>
        <ion-grid>
            <ion-row>
				<ion-toggle :checked="completed === true" @ionChange="completedToggle"></ion-toggle>
                <div @click="openModal" class="ion-padding-start">
                    <ion-label ref="completedLine">{{ task.title }}</ion-label>
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
	data() {
		return {
			completed: '',
			sendCompleted : ''
		}
	},
	computed: {
		completedValue() {
		 	return this.task.completed === 'Y' ? this.completed = true : this.completed = false;
		}
	},
	methods: {
	    openModal() {
		    return this.$ionic.modalController.create({
				component: InfoModal,
				cssClass: 'my-custom-class',
				componentProps: {
					data: { 
						task_info: this.task,
						access_token: this.access_token
					},
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
		},
		completedToggle() {
			const headers = {
                'Authorization': this.access_token,
                'Content-Type': 'application/json'
			};

			this.completed = !this.completed;
			this.sendCompleted = (this.completed ? 'Y' : 'N');
			if (this.completed) {
				this.sendCompleted = 'Y'
				this.$refs.completedLine.style.textDecoration = "line-through";
				this.$refs.completedLine.style.textDecorationColor = "#D51818";
				this.$refs.completedLine.style.textDecorationStyle = "wavy";
			} else {
				this.sendCompleted = 'N'
				this.$refs.completedLine.style.textDecoration = "";
				this.$refs.completedLine.style.textDecorationColor = "";
				this.$refs.completedLine.style.textDecorationStyle = "";
			}

            const data = { completed: this.sendCompleted }
			
			axios.patch(`http://localhost/restapi/tasks/${this.task.id}`, data, { headers })
            .then(response => {
				console.log(response)
            })
		}
	}
}
</script>