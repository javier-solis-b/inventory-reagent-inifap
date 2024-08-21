<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {}
}

import { createApp } from 'vue';
import App from './App.vue';
import Paginate from 'vuejs-paginate-next';

const app = createApp(App);
app.use(Paginate);
app.mount('#app');

</script>

<style lang="scss">
:root {
  --primary: #0c934a;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --light-alt: #f0f5e9;
  
}

</style>
