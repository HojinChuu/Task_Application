<template>
    <ion-header translucent>
        <ion-toolbar>
            <ion-buttons slot="start">
                <Add :access_token="access_token" />
            </ion-buttons>
            <ion-buttons slot="end">
                <Logout :access_token="access_token"  :session_id="session_id" />
            </ion-buttons>
            <ion-title>Task</ion-title> 
        </ion-toolbar>
    </ion-header>
</template>

<script>
import Add from './Add';
import Logout from './Logout';

export default {
    name: "Toolbar",
    components: { Add, Logout },
    props: ['access_token', 'session_id']
}
</script>