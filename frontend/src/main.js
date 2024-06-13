import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import UserIndexPage from './components/users/pages/UserIndexPage.vue'; // Asegúrate de que esta ruta sea correcta

loadFonts();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/usuarios', // Corrección aquí: añade una barra al principio
      name: 'users',
      component: UserIndexPage, // Usa UserIndexPage directamente
    },
  ],
});

createApp(App).use(router).use(vuetify).mount('#app');
