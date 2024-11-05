<template>
  <div>
    <h3 class="fw-bold mb-0 text-color" style="color: #0c934a">Recursos</h3>
    <br />
    <!-- Filtro y selector para abrir el formulario flotante de agregación -->
    <div class="mb-3 d-flex align-items-center">
      <input
        v-model="buscarPor"
        type="text"
        placeholder="Buscar por nombre..."
        class="form-control w-50"
      />
      <span class="ms-2">Filtrar por tipo: </span>
      <select
        v-model="filtroSeleccionado"
        class="form-select me-2"
        @change="filtrarRecursos"
      >
        <option value="todos">Todos</option>
        <option value="solvente">Solventes</option>
        <option value="reactivo">Reactivos</option>
        <option value="solución">Soluciones</option>
      </select>
      <button
        @click="$router.push({ name: 'recursos.create' })"
        class="btn btn-primary w-40 ms-2"
      >
        + Agregar recurso
      </button>
    </div>
    <!-- Tabla de recursos -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Almacén</th>
          <th>No. de inventario</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Marca</th>
          <th>Fórmula</th>
          <th>PM</th>
          <th>Capacidad recip.</th>
          <th>Recipientes actuales</th>
          <th>Lote</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(resource, index) in resultadosBusqueda" :key="index">
          <td>{{ resource.id }}</td>
          <td>{{ resource.almacen || "-" }}</td>
          <td>{{ resource.no_inventario }}</td>
          <td>{{ resource.nombre }}</td>
          <td>{{ resource.tipo_recurso }}</td>
          <td>{{ resource.marca || "-" }}</td>
          <td>{{ resource.formula || "-" }}</td>
          <td>{{ resource.pm || "-" }}</td>
          <td>{{ resource.capacidad_r }}</td>
          <td>{{ resource.recipientes_actuales || "-" }}</td>
          <td>{{ resource.lote || "-" }}</td>

          <td>
            <button
              @click="editarResource(resource)"
              class="btn btn-sm btn-warning mr-2"
            >
              Editar
            </button>
            <button
              @click="eliminarRecurso(resource)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Resultados de búsqueda -->
    <p v-if="resultadosBusqueda.length > 0" class="mt-3">
      Resultados de búsqueda: {{ resultadosBusqueda.length }} recursos
      encontrados.
    </p>
  </div>
</template>

<script>
import { RecursoService } from "@/users/services/RecursoService";
import backend from "@/backend";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      recursos: [],
      nuevoRecurso: {
        tipo_recurso: "",
        no_inventario: "",
        nombre: "",
        marca: "",
        pm: "",
        formula: "",
        capacidad_r: null,
        lote: "",
        recipientes_actuales: null,
        catalogo_id: null,
      },
      formularioAgregacionVisible: false,
      buscarPor: "",
      filtroSeleccionado: "",
      resultadosBusqueda: [],
    };
  },
  async mounted() {
    try {
      const recursos = await RecursoService.all();
      this.recursos = recursos;
      this.resultadosBusqueda = recursos;
    } catch (error) {
      console.error("Error al cargar recursos:", error);
      alert(
        "Ha ocurrido un error al cargar los recursos. Por favor, inténtelo nuevamente."
      );
    }
  },
  methods: {
    agregarRecurso() {
      if (
        Object.values(this.nuevoRecurso).every(
          (value) => value !== "" && value !== null
        )
      ) {
        this.resultadosBusqueda.push({ ...this.nuevoRecurso });
        this.cerrarFormularioAgregacion();
        this.nuevoRecurso = {
          tipo_recurso: "",
          no_inventario: "",
          nombre: "",
          marca: "",
          pm: "",
          formula: "",
          capacidad_r: null,
          lote: "",
          recipientes_actuales: null,
          catalogo_id: null,
        };
      } else {
        alert("Por favor, rellene todos los campos obligatorios.");
      }
    },
    editarResource(resource) {
      this.$router.push({
        name: "recursos.edit",
        params: { id: resource.id },
      })
      console.log("Editar recurso:", resource);
    },

    async eliminarRecurso(resource) {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Quieres eliminar al recurso ${resource.nombre}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: '<span style="color:white;">Sí, eliminar</span>',
        cancelButtonText: '<span style="color:white;">Cancelar</span>',
      });
      if (!result.isConfirmed) {
        return;
      }
      try {
        await backend.delete(`recursos/${resource.id}`);
        this.resultadosBusqueda = this.resultadosBusqueda.filter(
          (r) => r.id !== resource.id
        );
        Swal.fire({
          icon: "success",
          title: "¡Recurso eliminado exitosamente!",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error al eliminar recurso:", error);
        Swal.fire({
          icon: "error",
          title: "Error al eliminar recurso",
          text: "Ha ocurrido un error al intentar eliminar el recurso.",
        });
      }
    },

    buscarPorNombre() {
      if (this.buscarPor.trim()) {
        this.resultadosBusqueda = this.recursos.filter((resource) =>
          resource.nombre.toLowerCase().includes(this.buscarPor.toLowerCase())
        );
      } else {
        this.resultadosBusqueda = this.recursos;
      }
    },
  },
  watch: {
    buscarPor: {
      handler() {
        this.buscarPorNombre();
      },
      immediate: true,
    },
  },
};
</script>


<style scoped>
/* Estilos para el formulario flotante */
.agregacion-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow-y: scroll;
  overflow-x: hidden;
}

.agregacion-form-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 95%; /* Ajusta según sea necesario */

  max-width: 600px;
  position: relative;
}

/* Transición para el formulario flotante */
.form-transition-enter-active,
.form-transition-leave-active {
  transition: opacity 0.3s ease;
}

.form-transition-enter,
.form-transition-leave-to {
  opacity: 0;
}

/* Resto de estilos */
.table {
  font-size: 12px;
}

.btn {
  padding: 5px 10px;
}

.form-select {
  width: 200px;
}
</style>