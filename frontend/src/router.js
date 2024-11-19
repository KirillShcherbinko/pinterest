import {createRouter, createWebHistory} from "vue-router"
import Login from "./views/Login.vue"
import Registration from "./views/Registration.vue"

const routes = [
    { path: '/auth/login', name: 'Login', component: Login,  beforeEnter: () => {
      console.log("Navigating to Login");
    } },
    { path: '/auth/registration', name: 'Registration', component: Registration },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  export default router