<template>
  <v-card v-if="display" class="elevation-0 pt-4">
    <div class="d-flex" style="justify-content: center">
      <div
        style="
          width: 150px;
          height: 150px;
          background: gray;
          border-radius: 50%;
          background-image: url('./user.png');
          background-size: contain;
        "
      ></div>
    </div>
    <v-card-title class="text-center" style="padding: 0">
      {{ user.name ?? "" }}
    </v-card-title>
    <v-card-subtitle class="text-center">{{
      user.isAdmin == 1 ? "Administrador 🟢" : "No administrador🔴"
    }}</v-card-subtitle>
    <v-card-actions>
      <v-row>
        <v-col cols="6">
          <v-btn style="width: 100%" v-on:click="onDeleteUser">
            Eliminar.
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn style="width: 100%"> Editar </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
// Importa el módulo backend para realizar llamadas HTTP al servidor
import backend from '@/backend';

// Exporta el componente Vue.js
export default {
  // Define las props que el componente espera recibir
  props: {
    // Propiedad que contiene la información del usuario
    user: Object,
  },

  // Función que devuelve el estado inicial de las variables reactivas del componente
  data() {
    return {
      // Variable que controla si el componente debe mostrarse o no
      display: true
    };
  },

  // Objeto que contiene métodos disponibles para el componente
  methods: {
    // Método asíncrono para eliminar al usuario
    async onDeleteUser() {
      // Construye la URL para la solicitud de eliminación utilizando el id del usuario
      // Utiliza backticks para permitir la interpolación de variables dentro de la cadena
      await backend.delete(`usuarios/${this.user.id}`);
      
      // Oculta el componente una vez que el usuario ha sido eliminado
      this.display = false; 
    },
  },
};
 
</script>
