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
        @click="$router.push({ name: 'crearSolucion' })"
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
        <tr v-for="solucion in soluciones" :key="solucion.id">
          <td>{{ solucion.id }}</td>
          <td>{{ solucion.nombre_solucion }}</td>
          <td>
            <div v-for="recurso in solucion.recursos" :key="recurso.id" style="color: #5a5a5a;">
              {{ recurso.nombre }}: {{ recurso.cantidad_usada }}
            </div>
          </td>
          <td>
            <button class="btn btn-success">Usar esta solución</button>
            
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

export default {
  setup() {
    const isAdmin = computed(() => localStorage.getItem("isAdmin") === "true");
    const buscarPor = ref("");
    const soluciones = ref([]);

    const fetchSolucionesConRecursos = async () => {
      try {
        const solucionesResponse = await SolucionStockService.all();
        soluciones.value = await Promise.all(solucionesResponse.map(async solucion => {
          const recursoResponse = await SolucionRecursosService.all();
          solucion.recursos = recursoResponse.filter(r => r.solucion_id === solucion.id);
          return solucion;
        }));
      } catch (error) {
        console.error("Error fetching soluciones with recursos:", error);
      }
    };

    onMounted(fetchSolucionesConRecursos);

    return {
      isAdmin,
      buscarPor,
      soluciones
    };
  }
};
</script>
