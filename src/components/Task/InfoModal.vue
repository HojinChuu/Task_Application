<template>
	<div>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ task_info.id }}번째 할 일</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content fullscreen>
			<ion-list class="full">
				<ion-item-divider>
					<ion-label>
						Todo Detail
					</ion-label>
				</ion-item-divider>

				<ion-item>
					<ion-label>Todo Name : {{ task_info.title }}</ion-label>
				</ion-item>
				<ion-item>
					<ion-label>Deadline : {{ task_info.deadline }}</ion-label>
				</ion-item>
				<ion-item>
					<ion-label>Completed : {{ task_info.completed }}</ion-label>
				</ion-item>

				<ion-item-divider>
					<ion-label>Description</ion-label>
				</ion-item-divider>
				<ion-item>
					{{ task_info.description }}
				</ion-item>

			</ion-list>
		</ion-content>

		<ion-button color="primary" @click="closeModal">Back</ion-button>
	</div>
</template>

<script>
export default {
	name: 'InfoModal',
	methods: {
		closeModal() {
			return this.$ionic.modalController.dismiss()
		},
	}
}
</script>