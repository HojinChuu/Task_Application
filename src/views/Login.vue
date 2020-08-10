<template>
    <div>
        <ion-header translucent>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content fullscreen>
            <LoginForm />
        </ion-content>
    </div>
</template>

<script>
import LoginForm from '../components/Login/LoginForm'

export default {
    name: "Login",
    components: { LoginForm }
}
</script>

<style>

</style>