<template>
  <ion-content fullscreen>
    <ion-list>
      <ion-list-header>
        <span>My tasks</span>
        <div>
          <ion-button @click="getAll" color="light" size="small">all</ion-button>
          <ion-button @click="getCompleted" color="light" size="small">completed</ion-button>
          <ion-button @click="getIncompleted" color="light" size="small">incompleted</ion-button>
        </div>
      </ion-list-header>

      <ion-toolbar v-if="tasks_count == 0">
        <ion-title><small>텅 ~</small></ion-title>
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

export default {
  name: "List",
  components: { ListDetail },
  computed: {
    ...mapState([ 'tasks', 'tasks_count' ]),
    ...mapGetters([ 'accessToken' ])
  },
  mounted() {
    const headers = { Authorization: this.accessToken }
    this.FETCH_TASKS({headers})
  },
  methods: {
    ...mapActions([ 'FETCH_TASKS', 'FETCH_COMPLETED', 'FETCH_INCOMPLETED' ]),

    getAll() {
      const headers = { Authorization: this.accessToken }
      this.FETCH_TASKS({headers})
    },
    getCompleted() {
      const headers = { Authorization: this.accessToken }
      this.FETCH_COMPLETED({headers})
    },
    getIncompleted() {
      const headers = { Authorization: this.accessToken }
      this.FETCH_INCOMPLETED({headers})
    }
  }
}
</script>
