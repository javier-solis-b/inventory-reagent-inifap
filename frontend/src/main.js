import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import DashboardView from '@/users/components/pages/DashboardView.vue'; 
import '@/assets/global.css';
import "@/assets/bootstrap.min.css";
import UsersView from '@/users/components/pages/UsersView.vue';

loadFonts();

import LoginView from '@/auth/components/pages/LoginView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/dashboard', // Corrección aquí: añade una barra al principio
      name: 'dashboard',
      component: DashboardView, // Usa UserIndexPage directamente
    },
    {
      path: '/login', 
      name: 'login',
      component: LoginView, 
    },
    {
      path: '/usuarios', 
      name: 'usuarios',
      component: UsersView, 
    }
  ],
})

createApp(App).use(router).use(vuetify).mount('#app');
