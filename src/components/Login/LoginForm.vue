<template>
    <form>
        <ion-list lines="full" class="ion-no-margin ion-no-padding">

          <ion-item>
            <ion-label position="stacked">User Name <ion-text color="danger">*</ion-text></ion-label>
            <ion-input required type="text"></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-label position="stacked">Password <ion-text color="danger">*</ion-text></ion-label>
            <ion-input required type="text"></ion-input>
          </ion-item>
        </ion-list>

        <div class="ion-padding">
          <ion-button expand="block" type="submit" class="ion-no-margin">OK</ion-button>
        </div>

        <ion-toolbar>
            <ion-title>
                <router-link to="/register">Don't have an Account?</router-link>  
            </ion-title>
        </ion-toolbar>
        
      </form>
</template>

<script>
export default {
    name: "LoginForm"
}
</script>
