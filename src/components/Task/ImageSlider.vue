<template>
  <ion-slide>
    <ion-gird>
      <ion-col>
        <ion-label><small>{{ image.name }}</small></ion-label>
        <ion-img :src="imageFile" style="width:120px; margin:auto;"></ion-img>
        <ion-button size="small">편집</ion-button>
        <ion-button color="danger" @click="remove" size="small">삭제</ion-button>
      </ion-col>
    </ion-gird>
  </ion-slide>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ImageSlider",
  props: ['image', 'task_info'],
  data() {
    return {
      imageFile: ''
    }
  },
  computed: {
    ...mapGetters([ 'accessToken' ])
  },
  mounted() {
    const headers = { "Authorization": this.accessToken }
    const task_id = this.task_info.id
    const image_id = this.image.id

    this.FETCH_IMAGE_FILE({task_id, image_id, headers})
    .then((res) => {
      this.imageFile = res
    })
  },
  methods: {
    ...mapActions([ 'FETCH_IMAGE', 'FETCH_IMAGE_FILE', 'REMOVE_IMAGE' ]),
    remove() {
      const headers = { "Authorization": this.accessToken }
      const task_id = this.task_info.id
      const image_id = this.image.id

      this.REMOVE_IMAGE({task_id, image_id, headers})
      .then(() => {
        this.$router.go();
      })
    }
  }
}
</script>