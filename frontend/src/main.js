import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import DashboardView from '@/users/components/pages/DashboardView.vue'; 
import '@/assets/global.css';

loadFonts();

import LoginView from '@/auth/components/pages/LoginView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/usuarios', // Corrección aquí: añade una barra al principio
      name: 'users.index',
      component: DashboardView, // Usa UserIndexPage directamente
    },
    {
      path: '/login', // Corrección aquí: añade una barra al principio
      name: 'login',
      component: LoginView, // Usa UserIndexPage directamente
    }
  ],
})

createApp(App).use(router).use(vuetify).mount('#app');
