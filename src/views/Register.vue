<template>
    <div>
        <ion-header translucent>
            <ion-toolbar>
                <ion-title>Register</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content fullscreen>
            <RegisterForm />
        </ion-content>
  </div>
</template>

<script>
import RegisterForm from '../components/Register/RegisterForm'

export default {
    name: "Register",
    components: { RegisterForm }
}
</script>

<style>

</style>