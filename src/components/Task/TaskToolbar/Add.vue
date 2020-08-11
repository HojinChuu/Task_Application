<template>
    <ion-button @click="openModal">
        <ion-icon name="add-circle-outline" size="small"></ion-icon>
        <small>ADD TASK</small>
    </ion-button>
</template>

<script>
import AddModal from './AddModal';

export default {
    name: "Add",
    components: { AddModal },
    props: ['access_token'],
    methods: {
        openModal() {
            return this.$ionic.modalController.create({
                component: AddModal,
                cssClass: 'my-custom-class',
                componentProps: { data: { access_token: this.access_token } }
            }).then(m => m.present())
        }
    }
}
</script>