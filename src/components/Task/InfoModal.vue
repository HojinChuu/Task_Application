<template>
	<div>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ title }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			{{ content }}
		</ion-content>
			update
		<ion-button color="primary" @click="closeModal">Back</ion-button>
	</div>
</template>

<script>
export default {
	name: 'InfoModal',
	props: {
		title: { type: String, default: 'Super Modal' },
	},
	data() {
		return {
			content: 'Content',
		}
	},
	methods: {
		closeModal() {
			return this.$ionic.modalController.dismiss()
		},
	}
}
</script>