<template>
  <div class="users-view">
    <v-row>
    <v-col v-for="user in users" :key="user.id" cols="10" sm="10" md="6" lg="6">
      <UserDetails :user="user"/>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import UserDetails from "../organisms/UserDetails.vue";
import { UserService } from "@/users/services/UserService.js";

export default {
  data() {
    return {
      users: []
    };
  },

  async mounted() {
    this.users = await UserService.all();
  },

  components: { UserDetails },
};
</script>

<style lang="scss" scoped>
.users-view {
  margin: 10px;
  padding: 10px;

  .v-row {
    margin-right: -5px; // Ajusta el margen derecho de la fila para compensar el margen izquierdo de las columnas
    margin-left: -10px; // Ajusta el margen izquierdo de la fila para compensar el margen derecho de las columnas
  }

  .v-col {
    margin-bottom: 20px; // Añade un margen inferior a las columnas para dar espacio entre los usuarios
  }
}
</style>
