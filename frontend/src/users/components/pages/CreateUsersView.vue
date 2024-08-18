<template>
  <v-form @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col cols="12" sm="24" md="12">
          <v-text-field v-model="name" label="Usuario" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="24" md="12">
          <v-text-field
            v-model="password"
            type="password"
            label="Contraseña"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="24" md="12">
          <v-text-field
            v-model="repeatedPassword"
            type="password"
            label="Verificar contraseña"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="24" md="12">
          <!-- Checkbox para determinar si el usuario es administrador -->
          <v-checkbox
            v-model="isAdmin"
            :label="'¿Este usuario es un administrador?'"
            true-value="true"
            false-value="false"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="24" md="12">
          <v-btn type="submit" color="primary"> Crear usuario. </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import backend from "@/backend";
import Swal from 'sweetalert2'; // Importa SweetAlert

export default {
  data() {
    return {
      name: "",
      password: "",
      repeatedPassword: "",
      isAdmin: null, // Permite que esto esté vacío
    };
  },
  methods: {
    async onSubmit() {
      // Validación de campos vacíos
      if (!this.name || !this.password || !this.repeatedPassword) {
        Swal.fire({
          icon: 'warning',
          title: 'Completa todos los campos',
          text: 'Por favor, asegúrate de llenar todos los campos requeridos.',
          confirmButtonText: '<span style="color:white;">ok</span>'
        });
        return; // Detener la ejecución aquí
      }

      if (this.password !== this.repeatedPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden',
          confirmButtonText: '<span style="color:white;">ok</span>'
        });
        return; // Detener la ejecución aquí
      }

      // Convertir el valor del checkbox a un entero
      const isAdminInt = this.isAdmin ? 1 : 0;

      await backend
        .post("usuarios", {
          name: this.name,
          password: this.password,
          isAdmin: isAdminInt,
        })
        .catch((error) => {
          console.error("Error al crear el usuario:", error.response.data);
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el usuario',
            text: 'Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo.',
            confirmButtonText: '<span style="color:white;">ok</span>'
          });
        });

      this.$router.push({ name: "usuarios" });
      console.log({
        name: this.name,
        password: this.password,
        repeatedPassword: this.repeatedPassword,
        isAdmin: isAdminInt,
      });
    },
  },
};
</script>
