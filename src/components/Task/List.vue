<template>
    <ion-content fullscreen>
      <ion-list>
        <ion-list-header>My tasks</ion-list-header>
			<ion-item>
				<ion-grid>
					<ion-row>
					  	<div @click="openModal">
							<ion-label>Jon Snow</ion-label>
						</div>
					</ion-row>
				</ion-grid>
				<ion-button color="primary">				
					<ion-icon name="checkbox-outline" size="small"></ion-icon>
				</ion-button>
				<ion-button color="medium">				
					<ion-icon name="trash-outline" size="small"></ion-icon>          
				</ion-button>
			</ion-item>
        </ion-list>
    </ion-content>
</template>

<script>
import axios from 'axios';
import InfoModal from './InfoModal';

export default {
	name: "List",
	components: { InfoModal },
	props: ['access_token'],
	data() {
		return {
			tasks: {}
		}
	},
	async mounted() {
		const headers = {'Authorization': this.access_token};
		const response = await axios.get("http://localhost/restapi/tasks", { headers });

		this.tasks = await response.data.data;
		console.log(this.tasks);
	},
	methods: {
	openModal() {
		return this.$ionic.modalController
			.create({
				component: InfoModal,
				cssClass: 'my-custom-class',
				componentProps: {
					data: { content: 'New Content' },
					propsData: { title: 'New title' }
				}
			}).then(m => m.present())
		}
	}
}
</script>