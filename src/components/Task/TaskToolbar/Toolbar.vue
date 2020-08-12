<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-buttons slot="start">
        <Add />
      </ion-buttons>
      <ion-buttons slot="end">
        <Logout />
      </ion-buttons>
      <ion-title>Task</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import Add from "./Add"
import Logout from "./Logout"

export default {
  name: "Toolbar",
  components: { Add, Logout }
}
</script>
