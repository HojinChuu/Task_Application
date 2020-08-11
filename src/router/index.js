import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Task from "../views/Task.vue";

Vue.use(IonicVueRouter);

// 임시 가드
const requireAuth = (to, from, next) => {
  (sessionStorage.key("userinfo") ? true : false) ? next() : history.go(-1);
};

const userAccess = (to, from, next) => {
  (sessionStorage.key("userinfo") ? false : true) ? next() : history.go(-1);
};

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: userAccess
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: userAccess
  },
  {
    path: "/task",
    name: "Task",
    component: Task,
    beforeEnter: requireAuth
  }
];

const router = new IonicVueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
