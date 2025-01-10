<template>
  <div class="container mt-4">
    <h1 class="text-center text-success mb-4">Crear Solución Stock</h1>
    <div class="card p-4 shadow-sm">
      <form @submit.prevent="crearSolucion">
        <div class="mb-3">
          <label for="nombre_solucion" class="form-label">Nombre de la Solución</label>
          <input v-model="nombre_solucion" type="text" class="form-control" id="nombre_solucion" required>
        </div>
       
        <div class="mb-3">
          <label class="form-label">Recursos</label>
          <div v-for="(recurso, index) in recursos" :key="index" class="mb-3">
            <div class="row">
              <div class="col-md-6">
                <select v-model="recurso.recurso_id" class="form-select" required>
                  <option value="" disabled>Seleccione un recurso</option>
                  <!-- Aquí se llenará con la lista de recursos disponibles -->
                  <option v-for="res in listaRecursos" :key="res.id" :value="res.id">{{ res.nombre }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <input v-model="recurso.cantidad_usada" type="number" step="0.01" class="form-control" placeholder="Cantidad Usada" required>
              </div>
              <div class="col-md-2">
                <button type="button" class="btn btn-danger" @click="eliminarRecurso(index)">Eliminar</button>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-secondary" @click="agregarRecurso">Agregar Recurso</button>
        </div>
        <button type="submit" class="btn btn-success">Crear Solución</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre_solucion: '',
      fecha_creacion: '',
      recursos: [
        { recurso_id: '', cantidad_usada: '' }
      ],
      listaRecursos: [] // Esta será la lista de recursos disponibles
    };
  },
  methods: {
    agregarRecurso() {
      this.recursos.push({ recurso_id: '', cantidad_usada: '' });
    },
    eliminarRecurso(index) {
      this.recursos.splice(index, 1);
    },
    crearSolucion() {
      // Esta función se implementará más adelante
    }
  },
  mounted() {
    // Método para obtener la lista de recursos disponibles
    // se implementará más adelante
  }
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
