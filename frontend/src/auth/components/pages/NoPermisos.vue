<template>
    <div>
      <h1>Error 403</h1>
      <h2>No eres administrador </h2>
      <h3>no tienes permiso para acceder a esta página</h3>
      <v-btn color="primary" @click="redirectToLogin">Volver al inicio</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      redirectToLogin() {
        this.$router.push('/dashboard'); 
      },
    },
  };
  </script>
  