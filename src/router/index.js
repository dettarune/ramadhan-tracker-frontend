import { createRouter, createWebHistory } from "vue-router";
import TambahCeramah from "@/components/AddCeramahView.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import VerifyPage from "@/components/VerifyPage.vue";

const routes = [
  { path: "/add-ceramah", 
    name: "TambahCeramah",
     component: TambahCeramah
  },
  {
    path: '/',
    redirect: 'Register'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/verify',
    name: 'Verify',
    component: VerifyPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
