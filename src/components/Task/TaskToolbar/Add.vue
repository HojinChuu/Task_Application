<template>
  <ion-button @click="openModal">
    <ion-icon name="add-circle-outline" size="small"></ion-icon>
    <small>ADD TASK</small>
  </ion-button>
</template>

<script>
import AddModal from "./AddModal"

export default {
  name: "Add",
  components: { AddModal },
  methods: {
    openModal() {
      return this.$ionic.modalController
        .create({ component: AddModal })
        .then(m => m.present())
    }
  }
}
</script>
