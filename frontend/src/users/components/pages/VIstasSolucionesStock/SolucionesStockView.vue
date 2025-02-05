<template>
  <div class="container-fluid">
    <h3 class="fw-bold mb-3 text-color" style="color: #0c934a">Soluciones Stock y Recursos</h3>

    <!-- Filtro y botón para añadir soluciones -->
    <div class="d-flex align-items-center mb-3">
      <input
        v-model="buscarPor"
        type="text"
        placeholder="Buscar por nombre de la solución..."
        class="form-control me-2"
      />
      <button
        v-if="isAdmin"
        @click="$router.push({ name: 'solucioness.create' })"
        class="btn btn-primary"
      >
        + Crear nueva solución stock
      </button>
    </div>

    <!-- Tabla de Soluciones de Stock y Recursos -->
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre de la Solución</th>
          <th>Recursos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="solucion in solucionesFiltradas" :key="solucion.id">
          <td>{{ solucion.id }}</td>
          <td>{{ solucion.nombre_solucion }}</td>
          <td>
            <div v-for="recurso in solucion.recursos" :key="recurso.id" style="color: #5a5a5a;">
              {{ recurso.nombre }}: {{ recurso.cantidad_usada }}
            </div>
          </td>
          <td>
            <button @click="usarSolucion(solucion.nombre_solucion)" class="btn btn-success">
              Usar esta solución
            </button>
            <button class="btn btn-danger me-2">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { SolucionStockService } from "@/users/services/SolucionStockService.js";
import { SolucionRecursosService } from "@/users/services/SolucionRecursosService.js";
import { useToast } from "vue-toastification"; // Importa useToast

export default {
  setup() {
    const isAdmin = computed(() => localStorage.getItem("isAdmin") === "true");
    const buscarPor = ref("");
    const soluciones = ref([]);
    const toast = useToast(); // Inicializa useToast

    // Función para cargar soluciones con recursos
    const fetchSolucionesConRecursos = async () => {
      try {
        const solucionesResponse = await SolucionStockService.all();
        const recursosResponse = await SolucionRecursosService.all();

        // Mapear soluciones con sus recursos
        soluciones.value = solucionesResponse.map(solucion => {
          solucion.recursos = recursosResponse.filter(recurso => recurso.solucion_id === solucion.id);
          return solucion;
        });
      } catch (error) {
        console.error("Error fetching soluciones with recursos:", error);
        toast.error("Error al cargar las soluciones y recursos"); // Notificación de error
      }
    };

    // Filtrar soluciones por nombre
    const solucionesFiltradas = computed(() => {
      if (!buscarPor.value) return soluciones.value;
      return soluciones.value.filter(solucion =>
        solucion.nombre_solucion.toLowerCase().includes(buscarPor.value.toLowerCase())
      );
    });

    // Función para usar una solución
    const usarSolucion = async (nombreSolucion) => {
      try {
        await SolucionStockService.actualizarInventario(nombreSolucion);
        toast.success(`Solución "${nombreSolucion}" usada correctamente`); // Notificación de éxito
      } catch (error) {
        console.error("Error al usar la solución:", error);
        toast.error("Error al usar la solución"); // Notificación de error
      }
    };

    // Cargar datos al montar el componente
    onMounted(fetchSolucionesConRecursos);

    return {
      isAdmin,
      buscarPor,
      solucionesFiltradas,
      usarSolucion,
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados (opcional) */
.text-color {
  color: #0c934a;
}
</style>