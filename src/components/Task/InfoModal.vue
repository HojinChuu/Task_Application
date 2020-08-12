<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ task_info.id }}번째 할 일</ion-title>
        <ion-button @click="isEdit = !isEdit" slot="end" size="small" color="secondary">
          <span v-if="isEdit === true">돌아가기</span>
          <span v-else>편집</span>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <form @submit="onSubmit">
        <ion-list class="full">
          <ion-item-divider>
            <ion-label>
              Todo Detail
            </ion-label>
          </ion-item-divider>

          <ion-item>
            <ion-label>Todo Name : </ion-label>
            <ion-label v-if="isEdit === false">{{ task_info.title }}</ion-label>
            <ion-input
              v-else
              :value="title"
              @input="title = $event.target.value"
              required
              type="text"
              autofocus="true"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Deadline : </ion-label>
            <ion-label v-if="!isEdit">{{ task_info.deadline }}</ion-label>
            <ion-datetime
              v-else
              display-format="YYYY-MM-DD HH:mm"
              :min="current_date"
              :max="max_date"
            ></ion-datetime>
          </ion-item>
          <ion-item>
            <ion-label>Completed : </ion-label>
            <ion-label v-if="!isEdit">{{ task_info.completed }}</ion-label>
            <ion-input
              v-else
              :value="completed"
              @input="completed = $event.target.value"
              required
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item-divider>
            <ion-label>Description</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label v-if="!isEdit">{{ task_info.description }}</ion-label>
            <ion-textarea
              v-else
              :value="description"
              @input="description = $event.target.value"
              rows="6"
              cols="20"
              placeholder="Enter any notes here..."
            ></ion-textarea>
          </ion-item>
        </ion-list>
        <ion-button
          v-show="isEdit"
          expand="block"
          color="secondary"
          type="submit"
          >Update</ion-button
        >
      </form>
    </ion-content>
    <ion-button color="primary" @click="closeModal">Back</ion-button>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import showAlert from '../../alert'
import moment from "moment"

export default {
  name: "InfoModal",
  data() {
    return {
      isEdit: false,
      title: "",
      completed: "",
      description: "",
      deadline: ""
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
    ...mapActions([ 'UPDATE_TASK' ]),
    closeModal() {
      this.isEdit = false
      return this.$ionic.modalController.dismiss()
    },
    onSubmit(e) {
      e.preventDefault()
      this.deadline = moment(e.target[1].defaultValue).format("DD/MM/YYYY HH:mm")

      const headers = {
        Authorization: this.access_token,
        "Content-Type": "application/json"
      }
      const data = {
        title: this.title,
        description: this.description,
        deadline: this.deadline,
        completed: this.completed
      }
      const task_id = this.task_info.id

      this.UPDATE_TASK({task_id, data, headers}).then(() => {
        showAlert.success('Good', 'Updated Task', 'success')
        this.$ionic.modalController.dismiss()
        this.$router.go()
      })
    }
  }
}
</script>
