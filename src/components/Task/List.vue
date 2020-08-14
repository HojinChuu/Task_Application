<template>
  <ion-content fullscreen>
    <ion-list>
      <ion-list-header>
        <span>My tasks</span>
        <div>
          <ion-button @click="getAll" color="light" size="small">all</ion-button>
          <ion-button @click="getCompleted" color="light" size="small"><i class="far fa-grin-squint fa-lg"></i></ion-button>
          <ion-button @click="getIncompleted" color="light" size="small"><i class="far fa-grin-beam-sweat fa-lg"></i></ion-button>
        </div>
      </ion-list-header>

      <ion-toolbar v-if="tasks_count == 0">
        <ion-card @click="openModal">
          <ion-card-header>
            <ion-card-subtitle>Just do</ion-card-subtitle>
            <ion-card-title>Your First Task</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            계획을 만들어서 실천해보세요 !
          </ion-card-content>
      </ion-card>
      </ion-toolbar>
      <div v-else>
        <ListDetail
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          :access_token="accessToken"
        />
      </div>
    </ion-list>
  </ion-content>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import ListDetail from "./ListDetail"
import AddModal from "./TaskToolbar/AddModal"

export default {
  name: "List",
  components: { ListDetail, AddModal },
  computed: {
    ...mapState([ 'tasks', 'tasks_count' ]),
    ...mapGetters([ 'accessToken' ])
  },
  mounted() {
    const headers = { "Authorization": this.accessToken }
    this.FETCH_TASKS({headers})
  },
  methods: {
    ...mapActions([ 'FETCH_TASKS', 'FETCH_COMPLETED', 'FETCH_INCOMPLETED' ]),

    getAll() {
      const headers = { "Authorization": this.accessToken }
      this.FETCH_TASKS({headers})
    },
    getCompleted() {
      const headers = { "Authorization": this.accessToken }
      this.FETCH_COMPLETED({headers})
    },
    getIncompleted() {
      const headers = { "Authorization": this.accessToken }
      this.FETCH_INCOMPLETED({headers})
    },
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
