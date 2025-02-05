<template>
  <div>
    <h3 class="fw-bold mb-0 text-color" style="color: #0c934a">Inventario</h3>
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
    </div>
    <!-- Tabla de recursos -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Almacén</th>
          <th>No. inventario</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Fórmula</th>
          <th>Cantidad disponible</th>
          <th>Recipientes</th>
          <th>Caducidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(resource, index) in resultadosBusqueda" :key="index" :class="{ 'table-danger': resource.capacidad_r === 0 || resource.recipientes_actuales === 0 }">
          <td>{{ resource.id }}</td>
          <td>{{ resource.almacen || "-" }}</td>
          <td>{{ resource.no_inventario }}</td>
          <td>{{ resource.nombre }}</td>
          <td>{{ resource.tipo_recurso }}</td>
          <td>{{ resource.formula || "-" }}</td>
          <td>
            <div class="d-flex align-items-center">
              {{ resource.capacidad_r }} {{ resource.unidad_medida }}
              <div class="d-flex ms-2 align-items-center">
                <input
                  v-model.number="resource.cantidad"
                  type="number"
                  class="form-control form-control-sm me-2"
                  placeholder="Cantidad"
                  style="width: 90px"
                />
                <button
                  @click="
                    actualizarCapacidad(
                      resource.id,
                      resource.cantidad,
                      'agregar'
                    )
                  "
                  class="btn btn-success btn-sm me-1"
                >
                  +
                </button>
                <button
                  @click="
                    actualizarCapacidad(
                      resource.id,
                      resource.cantidad,
                      'quitar'
                    )
                  "
                  class="btn btn-danger btn-sm"
                >
                  -
                </button>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              {{ resource.recipientes_actuales || "-" }}
              <div class="d-flex ms-2 align-items-center">
                <button
                  @click="confirmarAccionRecipiente(resource.id, 'agregar')"
                  class="btn btn-success btn-sm me-1"
                >
                  +
                </button>
                <button
                  @click="confirmarAccionRecipiente(resource.id, 'quitar')"
                  class="btn btn-danger btn-sm"
                >
                  -
                </button>
              </div>
            </div>
          </td>
          <td>{{ resource.fecha_caducidad || "-" }}</td>
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
import { computed } from "vue";
import backend from "@/backend";

export default {
  data() {
    return {
      recursos: [],
      buscarPor: "",
      filtroSeleccionado: "todos",
      resultadosBusqueda: [],
      cantidad: 0,
    };
  },
  setup() {
    const isAdmin = computed(() => localStorage.getItem("isAdmin") === "true");

    return {
      isAdmin,
    };
  },
  async mounted() {
    try {
      const recursos = await RecursoService.all();
      this.recursos = recursos.map((resource) => ({
        ...resource,
        cantidad: 0,
      }));
      this.resultadosBusqueda = this.recursos;
    } catch (error) {
      console.error("Error al cargar recursos:", error);
      alert(
        "Ha ocurrido un error al cargar los recursos. Por favor, inténtelo nuevamente."
      );
    }
  },
  methods: {
    async verificarSuficienteInventario(id, cantidad, accion) {
    const updatedRecurso = this.resultadosBusqueda.find(res => res.id === id);
    if (!updatedRecurso) {
      console.error(`Recurso con ID ${id} no encontrado`);
      return false;
    }

    if (accion === 'quitar' && cantidad > 0) {
      if (cantidad > updatedRecurso.capacidad_r) {
        alert("No se puede quitar más de la cantidad disponible.");
        return false;
      }
    }

    return true;
  },
    async actualizarInventario(id, campo, valor) {
      try {
        console.log(`Enviando solicitud para actualizar recurso con ID ${id}`);
        console.log(`Datos enviados:`, { [campo]: valor }); // Realiza la solicitud al servidor
        const response = await backend.patch(`/recursos/${id}`, {
          [campo]: valor,
        }); // Verifica la respuesta del servidor
        if (response.status === 200) {
          console.log(
            `Actualizado campo "${campo}" del recurso con ID ${id} en el backend.`
          );
          alert("Inventario actualizado exitosamente.");
        } else {
          throw new Error(
            `Error en la respuesta del servidor: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error(
          `Error al actualizar campo "${campo}" del recurso con ID ${id}:`,
          error
        );
        alert(
          `Error al actualizar campo "${campo}" del recurso con ID ${id}: ${error.message}`
        );
      }
    },

    async actualizarCapacidad(id, cantidad, accion) {
      cantidad = Number(cantidad);
      if (cantidad <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
      }

      try {
        const response = await backend.post(`/recursos/${id}/update-capacity`, {
          cantidad,
          accion,
        });

        if (response.status === 200) {
          const updatedRecurso = this.resultadosBusqueda.find(
            (res) => res.id === id
          );
          if (!updatedRecurso) {
            console.error(`Recurso con ID ${id} no encontrado`);
            return;
          }

          if (accion === "agregar") {
            updatedRecurso.capacidad_r += cantidad;
          } else if (accion === "quitar") {
            if (updatedRecurso.capacidad_r - cantidad < 0) {
              alert("No se puede quitar más de la cantidad disponible.");
              return;
            }
            updatedRecurso.capacidad_r -= cantidad;
          }

          // Actualizar el inventario en la base de datos
          await this.actualizarInventario(
            id,
            "capacidad_r",
            updatedRecurso.capacidad_r
          );

          // Actualizar el servicio con los cambios
          this.recursos = await RecursoService.all();
          this.resultadosBusqueda = this.recursos;
        } else {
          throw new Error(
            `Error al actualizar capacidad: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error al actualizar capacidad:", error);
        alert("Error al actualizar la capacidad del recurso");
      }
    },

    async confirmarAccionRecipiente(id, accion) {
      const mensaje =
        accion === "agregar"
          ? "¿Estás seguro de que quieres agregar un nuevo recipiente?"
          : "¿Estás seguro de que quieres quitar un recipiente?";

      if (confirm(mensaje)) {
        try {
          const response = await backend.post(
            `/recursos/${id}/update-recipientes`,
            { accion }
          );

          if (response.status === 200) {
            const updatedRecurso = this.resultadosBusqueda.find(
              (res) => res.id === id
            );
            if (!updatedRecurso) {
              console.error(`Recurso con ID ${id} no encontrado`);
              return;
            }

            if (accion === "agregar") {
              updatedRecurso.recipientes_actuales++;
            } else if (
              accion === "quitar" &&
              updatedRecurso.recipientes_actuales > 0
            ) {
              updatedRecurso.recipientes_actuales--;
            } else {
              alert("No se puede quitar más recipientes.");
              return;
            }

            // Actualizar el inventario en la base de datos
            await this.actualizarInventario(
              id,
              "recipientes_actuales",
              updatedRecurso.recipientes_actuales
            );

            // Actualizar el servicio con los cambios
            this.recursos = await RecursoService.all();
            this.resultadosBusqueda = this.recursos;
          } else {
            throw new Error(
              `Error al actualizar recipientes: ${response.statusText}`
            );
          }
        } catch (error) {
          console.error("Error al actualizar recipientes:", error);
          alert("Error al actualizar el número de recipientes del recurso");
        }
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
      this.filtrarRecursos();
    },

    filtrarRecursos() {
      if (this.filtroSeleccionado === "todos") {
        this.resultadosBusqueda = this.recursos.filter((resource) =>
          resource.nombre.toLowerCase().includes(this.buscarPor.toLowerCase())
        );
      } else {
        this.resultadosBusqueda = this.recursos.filter(
          (resource) =>
            resource.tipo_recurso.toLowerCase() === this.filtroSeleccionado &&
            resource.nombre.toLowerCase().includes(this.buscarPor.toLowerCase())
        );
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
    filtroSeleccionado: {
      handler() {
        this.filtrarRecursos();
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
  y4: 0;
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
