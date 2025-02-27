<template>
  <div class="container-fluid">
    <h3 class="fw-bold mb-3 text-color" style="color: #0c934a">
      Editar Solución
    </h3>
    <form @submit.prevent="guardarCambios">
      <!-- Campos de la solución -->
      <div class="mb-3">
        <label for="medios_cultivo" class="form-label">Medio de Cultivo</label>
        <input
          type="text"
          class="form-control"
          id="medios_cultivo"
          v-model="solucion.medios_cultivo"
        />
      </div>
      <div class="mb-3">
        <label for="nombre_solucion" class="form-label">Nombre de la Solución</label>
        <input
          type="text"
          class="form-control"
          id="nombre_solucion"
          v-model="solucion.nombre_solucion"
        />
      </div>
      <!-- Lista de recursos asociados -->
      <div class="mb-3">
        <h5>Recursos Asociados</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Recurso</th>
              <th>Cantidad Usada</th>
              <th>Unidad de Medida</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recurso in solucion.recursos" :key="recurso.id">
              <td>{{ recurso.recurso.nombre }}</td>
              <td>{{ recurso.cantidad_usada }}</td>
              <td>{{ recurso.recurso.unidad_medida }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Botones -->
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
      <button
        type="button"
        class="btn btn-secondary ms-2"
        @click="cancelarEdicion"
      >
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SolucionStockService } from '@/users/services/SolucionStockService.js';
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const solucion = ref({
      medios_cultivo: '',
      nombre_solucion: '',
      recursos: [], // Array para almacenar los recursos asociados
    });

    // Función para cargar la solución con sus recursos
    const cargarSolucion = async () => {
      try {
        const id = route.params.id;
        const response = await SolucionStockService.getWithResources(id);
        solucion.value = response; // Asignar los datos de la solución y sus recursos
      } catch (error) {
        console.error('Error cargando la solución:', error);
        toast.error('Error al cargar la solución');
      }
    };

    // Función para guardar los cambios
    const guardarCambios = async () => {
      try {
        const id = route.params.id;
        await SolucionStockService.update(id, solucion.value);
        toast.success('Solución actualizada correctamente');
        router.push({ name: 'solucioness' });
      } catch (error) {
        console.error('Error actualizando la solución:', error);
        toast.error('Error al actualizar la solución');
      }
    };

    // Función para cancelar la edición
    const cancelarEdicion = () => {
      router.push({ name: 'solucioness' });
    };

    // Cargar los datos al montar el componente
    onMounted(cargarSolucion);

    return {
      solucion,
      guardarCambios,
      cancelarEdicion,
    };
  },
};
</script>

<style scoped>
.text-color {
  color: #0c934a;
}
</style>