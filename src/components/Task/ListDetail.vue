<template>
  <ion-item>
    <ion-grid>
      <ion-row>
        <ion-toggle
          :checked="completedValue"
          @ionChange="completedToggle"
        ></ion-toggle>
          
        <div @click="openModal" class="ion-padding-start">
          <ion-label ref="completedLine">{{ task.title }}</ion-label>
        </div>
      </ion-row>
    </ion-grid>
    <ion-button color="danger" @click="removeTask">
      <i class="fas fa-trash-alt fa-lg"></i>
    </ion-button>
  </ion-item>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import showAlert from '../../alert';
import InfoModal from "./InfoModal";

export default {
  name: "ListDetail",
  components: { InfoModal },
  props: ["task"],
  data() {
    return {
      completed: "",
      sendCompleted: ""
    }
  },
  computed: {
    ...mapGetters([ 'accessToken' ]),
    completedValue() {
      return this.task.completed === "Y"
        ? (this.completed = true)
        : (this.completed = false)
    }
  },
  mounted() {
    if (this.task.completed === "Y")
      this.$refs.completedLine.style.textDecoration = "line-through"
      this.$refs.completedLine.style.textDecorationColor = "#D51818"
      this.$refs.completedLine.style.textDecorationStyle = "wavy"
  },
  methods: {
    ...mapActions([ 'REMOVE_TASK', 'COMPLETE_TOGGLE', 'FETCH_TASKS' ]),
    openModal() {
      return this.$ionic.modalController
        .create({
          component: InfoModal,
          componentProps: {
            parent: this,
            data: {
              task_info: this.task,
              access_token: this.accessToken
            }
          }
        }).then(m => m.present())
    },
    removeTask() {
      const headers = { "Authorization": this.accessToken }
      const task_id = this.task.id

      this.REMOVE_TASK({task_id, headers}).then(() => {
        this.FETCH_TASKS({headers})
      })
    },
    completedToggle() {
      this.completed = !this.completed
      this.sendCompleted = this.completed ? "Y" : "N"

      if (this.completed) {
        this.sendCompleted = "Y"
        this.$refs.completedLine.style.textDecoration = "line-through"
        this.$refs.completedLine.style.textDecorationColor = "#D51818"
        this.$refs.completedLine.style.textDecorationStyle = "wavy"
      } else {
        this.sendCompleted = "N"
        this.$refs.completedLine.style.textDecoration = ""
        this.$refs.completedLine.style.textDecorationColor = ""
        this.$refs.completedLine.style.textDecorationStyle = ""
      }

      const headers = {
        "Authorization": this.accessToken,
        "Content-Type": "application/json"
      }
      const data = { completed: this.sendCompleted };
      const task_id = this.task.id

      this.COMPLETE_TOGGLE({task_id, data, headers})
    }
  }
}
</script>
