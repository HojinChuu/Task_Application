<template>
  <ion-content fullscreen>
    <ion-list>
      <ion-list-header>
        <span>My tasks</span>
        <div>
          <ion-button @click="getAll" color="light" size="small">
            all
          </ion-button>
          <ion-button @click="getCompleted" color="light" size="small">
            completed
          </ion-button>
          <ion-button @click="getIncompleted" color="light" size="small">
            incompleted
          </ion-button>
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
          :access_token="access_token"
        />
      </div>
    </ion-list>
  </ion-content>
</template>

<script>
import axios from "axios";
import ListDetail from "./ListDetail";

export default {
  name: "List",
  components: { ListDetail },
  props: ["access_token"],
  data() {
    return {
      tasks: [],
      tasks_count: 0
    };
  },
  async mounted() {
    const headers = { Authorization: this.access_token };
    const response = await axios.get("http://localhost/restapi/tasks", {
      headers
    });
    this.tasks = await response.data.data.tasks;
    this.tasks_count = await response.data.data.rows_returned;
    console.log(this.tasks);
  },
  methods: {
    async getAll() {
      const headers = { Authorization: this.access_token };
      const response = await axios.get("http://localhost/restapi/tasks", {
        headers
      });
      this.tasks = await response.data.data.tasks;
      this.tasks_count = await response.data.data.rows_returned;
    },
    async getCompleted() {
      const headers = { Authorization: this.access_token };
      const response = await axios.get(
        "http://localhost/restapi/tasks/complete",
        { headers }
      );
      this.tasks = await response.data.data.tasks;
      this.tasks_count = await response.data.data.rows_returned;
    },
    async getIncompleted() {
      const headers = { Authorization: this.access_token };
      const response = await axios.get(
        "http://localhost/restapi/tasks/incomplete",
        { headers }
      );
      this.tasks = await response.data.data.tasks;
      this.tasks_count = await response.data.data.rows_returned;
    }
  }
};
</script>
