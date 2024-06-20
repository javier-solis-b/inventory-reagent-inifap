<template>
  <label for="user" class="form-label">Usuario:</label>
  <v-text-field v-model="name"></v-text-field>
  <label for="password" class="form-label">Contraseña:</label>
  <v-text-field type="password" v-model="password"></v-text-field>
  <v-btn v-on:click="onLogin()">Iniciar sesión</v-btn>
</template>
  
  <script>
import { AuthService } from "@/auth/services/AuthService.js";
//import DashboardViewVue from "@/users/components/pages/DashboardView.vue";

export default {
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    async onLogin() {
      const response = await AuthService.login(this.name, this.password);

      if (response.token) {
        this.$router.push({ name: 'users.index'});
      }
    },
  },
};
</script>
  