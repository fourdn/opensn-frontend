import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/user/:userId",
      name: "user",
      component: () => import("./views/User.vue")
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("./components/Registration.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login.vue")
    }
  ]
});
