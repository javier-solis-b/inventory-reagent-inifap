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
            Eliminar
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
import backend from '@/backend';
import Swal from 'sweetalert2'; 

export default {
  // Define las props que el componente espera recibir
  props: {
    user: Object, // Propiedad que contiene la información del usuario
  },

  // Función que devuelve el estado inicial de las variables reactivas del componente
  data() {
    return {
      display: true// Variable que controla si el componente debe mostrarse o no
    };
  },

  // Objeto que contiene métodos disponibles para el componente
  methods: {
    // Método asíncrono para eliminar al usuario
    async onDeleteUser() {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar al usuario ${this.user.name}?`,
        icon: 'warning',
        showCancelButton: true,
      });

      if (!result.isConfirmed){
        return;
      }
      await backend.delete(`usuarios/${this.user.id}`);// Construye la URL para la solicitud de eliminación utilizando el id del usuario 
      this.display = false; // Oculta el componente una vez que el usuario ha sido eliminado

      Swal.fire('¡Usuario eliminado exitosamente!')
    },
  },
};
 
</script>
