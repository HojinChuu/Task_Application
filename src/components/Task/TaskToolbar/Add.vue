<template>
  <ion-button @click="openModal">
    <i class="fas fa-plus-circle fa-lg"></i>
  </ion-button>
</template>

<script>
import { mapGetters } from 'vuex'
import AddModal from "./AddModal"

export default {
  name: "Add",
  components: { AddModal },
  computed: {
    ...mapGetters(['accessToken'])
  },
  methods: {
    openModal() {
      return this.$ionic.modalController
        .create({ 
          component: AddModal,
          componentProps: {
            parent: this,
            data: {
              accessToken: this.accessToken
            }
          }
        })
        .then(m => m.present())
    }
  }
}
</script>
