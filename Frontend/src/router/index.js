import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Batonnets from "../pages/Batonnets.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/batonnets",
    name: "Batonnets",
    component: Batonnets
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
