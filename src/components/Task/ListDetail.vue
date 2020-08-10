<template>
    <ion-item>
        <ion-grid>
            <ion-row>
                <div @click="openModal">
                    <ion-label>{{ task.title }}</ion-label>
                </div>
            </ion-row>
        </ion-grid>
        <ion-button color="medium">				
            <ion-icon name="checkbox-outline" size="small"></ion-icon>
        </ion-button>
        <ion-button color="danger">				
            <ion-icon name="trash-outline" size="small"></ion-icon>          
        </ion-button>
    </ion-item>
</template>

<script>
import InfoModal from './InfoModal';

export default {
	name: "ListDetail",
	components: { InfoModal },
	props: ['task'],
	methods: {
	    openModal() {
		    return this.$ionic.modalController.create({
				component: InfoModal,
				cssClass: 'my-custom-class',
				componentProps: {
					data: { task_info: this.task },
				}
			}).then(m => m.present())
		}
	}
}
</script>