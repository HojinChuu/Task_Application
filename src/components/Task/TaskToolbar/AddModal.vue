<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>ADD TASK</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <form @submit="onSubmit">
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
          <ion-item>
            <ion-label position="stacked">Title <ion-text color="danger">*</ion-text></ion-label>
            <ion-input
              :value="title"
              @input="title = $event.target.value"
              required
              type="text"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Descripton</ion-label>
            <ion-textarea
              :value="description"
              @input="description = $event.target.value"
              rows="6"
              cols="20"
              placeholder="Enter any notes here..."
            ></ion-textarea>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Deadline</ion-label>
            <ion-datetime
              display-format="YYYY-MM-DD HH:mm"
              :min="current_date"
              :max="max_date"
            ></ion-datetime>
          </ion-item>
        </ion-list>
        <div class="ion-padding">
          <ion-button expand="block" type="submit" class="ion-no-margin">ADD</ion-button>
        </div>
      </form>
    </ion-content>
    <ion-button color="secondary" @click="closeModal">Back</ion-button>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import showAlert from '../../../alert'
import moment from "moment"
import Swal from 'sweetalert2'
import AddImage from './AddImage'

export default {
  name: "AddModal",
  data() {
    return {
      title: "",
      description: "",
      task_id: ""
    }
  },
  computed: {
    current_date() {
      return moment().format("YYYY-MM-DD")
    },
    max_date() {
      return moment().add(3, "years").format("YYYY-MM-DD")
    }
  },
  methods: {
    ...mapActions([ 'ADD_TASK', 'FETCH_TASKS' ]),
    onSubmit(e) {
      e.preventDefault();
      this.deadline = moment(e.target[2].defaultValue).format("DD/MM/YYYY HH:mm")
      const headers = {
        "Authorization": this.accessToken,
        "Content-Type": "application/json"
      }
      const data = {
        title: this.title,
        description: this.description,
        deadline: this.deadline,
        completed: "N"
      }

      this.ADD_TASK({data, headers}).then((res) => {
        this.task_id = res.data.tasks[0].id
        Swal.fire({
          text: '이미지도 추가하시겠어요?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        })
        .then((result) => {
          if (result.value) {
            return this.$ionic.modalController
            .create({ 
              component: AddImage,
              componentProps: {
                parent: this,
                data: {
                  accessToken: this.accessToken,
                  task_id: this.task_id
                }
              }
            })
            .then(m => m.present())
          } 
          
          else if (result.dismiss === Swal.DismissReason.cancel) {
            this.$ionic.modalController.dismiss()
            const headers = { "Authorization": this.accessToken }
            this.FETCH_TASKS({headers})
          }
        })
      })
    },

    closeModal() {
      return this.$ionic.modalController.dismiss()
    }
  }
}
</script>
