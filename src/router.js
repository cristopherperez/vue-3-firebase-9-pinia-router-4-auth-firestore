import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";
import HomeView from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";

const requireAuth = async (to, from, next) => {
  const useStore = useUserStore();
  useStore.loadingSession = true;
  const user = await useStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  useStore.loadingSession = false;
};

const routes = [
  {
    path: "/",
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
