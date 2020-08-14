<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" size="small" color="secondary">이미지 추가</ion-button>
        <ion-title v-if="isEdit === true">수정하기</ion-title>
        <ion-title v-else>상세보기</ion-title>
        <ion-button @click="isEdit = !isEdit" slot="end" size="small" color="secondary">
          <span v-if="isEdit === true">돌아가기</span>
          <span v-else>모두편집</span>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <form @submit="onSubmit">
        <ion-list class="full">

          <ion-slides pager="true" :options="slideOpts">
            <ImageSlider />
          </ion-slides>
          
          <ion-item-divider>
            <ion-label>
              Todo Detail
            </ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label>Todo Name : </ion-label>
            <ion-label v-if="titleCondition" @click="titleEdit = true">{{ task_info.title }}</ion-label>
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
            <ion-label v-if="deadlineCondition" @click="deadlineEdit = true">{{ task_info.deadline }}</ion-label>
            <ion-datetime
              v-else
              display-format="YYYY-MM-DD HH:mm"
              :min="current_date"
              :max="max_date"
            ></ion-datetime>
          </ion-item>

          <ion-item-divider>
            <ion-label>Description</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label v-if="descriptionCondition" @click="descriptionEdit = true">{{ task_info.description }}</ion-label>
            <ion-textarea
              v-else
              :value="description"
              @input="description = $event.target.value"
              rows="6"
              cols="20"
              required
              placeholder="Enter any notes here..."
            ></ion-textarea>
          </ion-item>
        </ion-list>
        <ion-button
          v-show="buttonCondition"
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
import ImageSlider from './ImageSlider';
import moment from "moment"

export default {
  name: "InfoModal",
  components: { ImageSlider },
  data() {
    return {
      isEdit: false,
      titleEdit: false,
      descriptionEdit: false,
      deadlineEdit: false,
      title: "",
      description: "",
      deadline: "",
      slideOpts: {
        initialSlide: 1,
        speed: 400
      }
    }
  },
  computed: {
    current_date() {
      return moment().format("YYYY-MM-DD")
    },
    max_date() {
      return moment().add(3, "years").format("YYYY-MM-DD")
    },
    titleCondition() {
      return this.isEdit === false && this.titleEdit === false
    },
    descriptionCondition() {
      return this.isEdit === false && this.descriptionEdit === false
    },
    deadlineCondition() {
      return this.isEdit === false && this.deadlineEdit === false
    },
    buttonCondition() {
      return this.isEdit === true || this.titleEdit === true || this.descriptionEdit === true || this.deadlineEdit === true
    }
  },
  methods: {
    ...mapActions([ 'UPDATE_TASK', 'FETCH_TASKS' ]),
    modeChange() {
      this.isEdit = !this.isEdit
      this.titleEdit = false;
      this.deadlineEdit = false;
      this.descriptionEdit = false;
    },
    closeModal() {
      this.isEdit = false
      return this.$ionic.modalController.dismiss()
    },
    onSubmit(e) {
      e.preventDefault()
      this.deadline = moment(e.target[1].defaultValue).format("DD/MM/YYYY HH:mm")

      const headers = {
        "Authorization": this.access_token,
        "Content-Type": "application/json"
      }

      let data = {}

      if (this.isEdit === true || (this.titleEdit === true && this.deadlineEdit === true && this.descriptionEdit === true)) {
        data.title = this.title
        data.deadline = this.deadline
        data.description = this.description
      } else if (this.titleEdit === true && this.deadlineEdit === true) {
        data.title = this.title
        data.deadline = this.deadline
      } else if (this.titleEdit === true && this.descriptionEdit === true) {
        data.title = this.title
        data.description = this.description
      } else if (this.deadlineEdit === true && this.descriptionEdit === true) {
        data.deadline = this.deadline
        data.description = this.description
      } else if (this.titleEdit) {
        data.title = this.title
      } else if (this.descriptionEdit) {
        data.description = this.description
      } else if (this.deadlineEdit) {
        data.deadline = this.deadline
      }
      
      const task_id = this.task_info.id

      this.UPDATE_TASK({task_id, data, headers}).then(() => {
        this.$ionic.modalController.dismiss()
        this.FETCH_TASKS({headers})
      })
    }
  }
}
</script>
