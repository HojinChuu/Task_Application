<template>
  <div>
    <ion-contetn>
      <form @submit="addImage" enctype="multipart/form-data">
        <ion-card>
          <ion-card-header>Create the Image</ion-card-header>
          <ion-card-content>
              <ion-item>
                <ion-label>Name<ion-text color="danger">* : </ion-text></ion-label>
                <ion-input :value="title" @input="title = $event.target.value" type="text" ></ion-input>
              </ion-item>
              <ion-item v-if="!image">
                <input type="file" @change="onFileChange" name="image" accept="image/*">
              </ion-item>
              <div v-else>
                <img :src="image" />
              </div>
          </ion-card-content>
          <div class="ion-padding">
            <ion-button expand="block" type="submit" class="ion-no-margin">ADD</ion-button>
          </div>
        </ion-card>
      </form>
    </ion-contetn>
    <ion-button color="secondary" @click="closeModal">Back</ion-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "AddModal",
  data() {
    return {
      image: '',
      title: '',
      files: ''
    }
  },
  methods: {
    ...mapActions([ 'ADD_IMAGE' ]),
    onFileChange(e) {
      this.files = e.target.files;
      if (!this.files.length)
        return;
      this.createImage(this.files[0]);
    },
    createImage(file) {
      let image = new Image();
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addImage(e) {
      e.preventDefault();
      const headers = { "Authorization": this.accessToken }
      const task_id = this.task_id
      const data = {
        title: this.title,
        filename: this.title
      }
      let imageData = new FormData();
      imageData.append('attributes', JSON.stringify(data))
      imageData.append('imagefile', this.files[0])

      this.ADD_IMAGE({task_id, imageData, headers})
      .then((res) => {
        console.log(res)
        this.$router.go()
      })
    },
    closeModal() {
      this.$router.go()
    }
  }
}
</script>

<style scoped>
  img {
    width: 30%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
  }
</style>