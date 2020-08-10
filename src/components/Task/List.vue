<template>
    <ion-content fullscreen>
      <ion-list>
        <ion-list-header>My tasks</ion-list-header>
			<ion-toolbar v-if="tasks_count == 0">
				<ion-title><small>할 일을 생성해주세요 . .</small></ion-title>
			</ion-toolbar>
			<div v-else>
				<ListDetail v-for="task in tasks" :key="task.id" :task="task"/>
			</div>
        </ion-list>
    </ion-content>
</template>

<script>
import axios from 'axios';
import InfoModal from './InfoModal';
import ListDetail from './ListDetail';

export default {
	name: "List",
	components: { InfoModal, ListDetail},
	props: ['access_token'],
	data() {
		return {
			tasks: [],
			tasks_count: 0
		}
	},
	async mounted() {
		const headers = {'Authorization': this.access_token};
		const response = await axios.get("http://localhost/restapi/tasks", { headers });
		this.tasks = await response.data.data.tasks;
		this.tasks_count = await response.data.data.rows_returned;

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