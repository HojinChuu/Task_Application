import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";
// import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Task from "../views/Task.vue";
// import VueRouter from "vue-router";

Vue.use(IonicVueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/task",
        name: "Task",
        component: Task
    },
    // {
    //   path: "/",
    //   name: "Home",
    //   component: Home
    // }
];

const router = new IonicVueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
