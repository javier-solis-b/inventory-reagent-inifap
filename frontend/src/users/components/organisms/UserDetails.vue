<template>
  <v-card v-if="display" class="elevation-0 pt-4 " cols="12">
    <div class="d-flex" style="justify-content: center">
      <div
        :style="`width: 150px; height: 150px; background: gray; border-radius: 50%;
         background-image: url(/imagenes/admin.png); background-size: contain;`"
      ></div>
    </div>
    <v-card-title class="text-center" style="padding: 0">
      {{ user.name ?? "" }}
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{
        user.isAdmin == 1 ? "Administrador 🟢" : "No administrador⚫"
      }}
    </v-card-subtitle>
    <v-card-actions>
      <v-row>
        <v-col cols="6">
          <v-btn style="width: 100%" v-on:click="onDeleteUser">
            Eliminar
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn style="width: 100%" v-on:click="onEditUser"> Editar </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  
</template>

<script>
import backend from '@/backend';
import Swal from 'sweetalert2'; 

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      display: true,
    };
  },
  methods: {
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
      await backend.delete(`usuarios/${this.user.id}`);
      this.display = false;

      Swal.fire('¡Usuario eliminado exitosamente!')
    },
    async onEditUser(){
      this.$router.push({name: 'usuarios.edit', params: { id: this.user.id}});
    }
  },
};
</script>