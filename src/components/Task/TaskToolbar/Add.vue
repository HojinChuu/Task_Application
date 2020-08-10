<template>
    <ion-button @click="createTask">
        <ion-icon name="add-circle-outline" size="small"></ion-icon>
        <small>Add Task</small>
    </ion-button>
</template>

<script>
import axios from 'axios';

export default {
    name: "Add",
    props: ['access_token'],
    methods: {
        createTask() {
            console.log('asdf')
        }
    }
}
</script>