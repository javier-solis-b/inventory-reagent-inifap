<template>
  <form @submit.prevent="crearSolucion">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />
    <div class="d-flex align-center mb-3">
      <v-btn icon @click="$router.push('/solucioness')" class="mr-2">
        <span class="material-symbols-outlined"> arrow_back </span>
      </v-btn>
      <v-col class="encabezado" cols="12" sm="auto">
        <h3 class="fw-bold mb-0">Crear nueva solución stock</h3>
      </v-col>
    </div>

    <v-card>
      <v-container>
        <v-row >
          <!-- Nombre de la solución -->
          <v-col cols="12" sm="24" md="12">
            <v-text-field
              variant="underlined"
              v-model="nombre_solucion"
              label="Nombre de la solución"
              prepend-icon="mdi-test-tube"
              required
            ></v-text-field>
          </v-col>

          <!-- Recursos -->
          <div  v-for="(recurso, index) in recursos" :key="index">
            <label :for="'recurso-' + index" class="form-label">{{ 'Recurso ' + (index + 1) }}</label>
            <div class="row">
              <v-col cols="12" sm="6" md="5">
                <select
                  :id="'recurso-' + index"
                  v-model="recurso.recurso_id"
                  class="form-select"
                  required
                >
                  <option value="" disabled>Seleccione un recurso</option>
                  <option
                    v-for="res in listaRecursos"
                    :key="res.id"
                    :value="res.id"
                  >
                    {{ res.nombre }}
                  </option>
                </select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <input
                  v-model="recurso.cantidad_usada"
                  type="number"
                  step="0.01"
                  class="form-control"
                  placeholder="Cantidad Usada"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <div class="d-flex justify-end">
                  <button
                    type="button"
                    class="btn btn-danger me-2"
                    @click="eliminarRecurso(index)"
                  >
                    Eliminar
                  </button>
                </div>
              </v-col>
            </div>
          </div>
        </v-row>
        
        <!-- Botón Agregar Recurso -->
        <v-row justify="start" align="center" class="mt-3">
          <v-col cols="auto">
            <button
              type="button"
              class="btn btn-secondary w-100"
              @click="agregarRecurso"
            >
              Agregar Recurso
            </button>
          </v-col>
        </v-row>
        
        <!-- Botón Crear Solución Stock -->
        <v-row justify="start" align="center" class="mt-3">
          <v-col cols="auto">
            <v-btn type="submit" color="primary">Crear solución stock</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </form>
</template>

<script>
export default {
  data() {
    return {
      nombre_solucion: "",
      recursos: [{ recurso_id: "", cantidad_usada: "" }],
      listaRecursos: [],
    };
  },
  methods: {
    agregarRecurso() {
      this.recursos.push({ recurso_id: "", cantidad_usada: "" });
    },
    eliminarRecurso(index) {
      this.recursos.splice(index, 1);
    },
    async crearSolucion() {
      try {
        const datos = {
          nombre_solucion: this.nombre_solucion,
          recursos: this.recursos,
        };

        console.log("Datos a enviar:", datos);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert("Solución creada con éxito");

        this.limpiarFormulario();
      } catch (error) {
        console.error("Error al crear la solución:", error);
        alert(
          "Hubo un error al crear la solución. Por favor, inténtalo de nuevo."
        );
      }
    },
    limpiarFormulario() {
      this.nombre_solucion = "";
      this.recursos = [{ recurso_id: "", cantidad_usada: "" }];
    },
  },
  mounted() {
    fetch("/api/recursos")
      .then((response) => response.json())
      .then((data) => {
        this.listaRecursos = data;
      })
      .catch((error) => console.error("Error:", error));
  },
};
</script>

<style scoped>
.card {
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-select {
  height: auto;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #c82333;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #495057;
}

.btn-primary {
  background-color: #1976d2;
  border-color: #1565c0;
}

.v-container {
  background-color: white;
}
</style>
