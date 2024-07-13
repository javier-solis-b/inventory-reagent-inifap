<template>
  <v-row>
    <v-col v-for="user in users" :key="user.id" cols="12" sm="6" md="4" lg="3">
      <UserDetails :user="user"/>
    </v-col>
  </v-row>
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
