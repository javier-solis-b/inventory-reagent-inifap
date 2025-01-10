<template>
    <div class="container-fluid">
      <h3 class="fw-bold mb-3 text-color" style="color: #0c934a">Soluciones Stock</h3>
  
      <!-- Filtro y selector para abrir el formulario flotante de agregación -->
      <div class="d-flex align-items-center mb-3">
        <input
          v-model="buscarPor"
          type="text"
          placeholder="Buscar por nombre..."
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
  
      <!-- Tabla de almacenes -->
      <table class="table table-striped table-bordered text-center">
        <thead>
          <tr>
            <th>comp. 1</th>
            <th>comp. 2</th>
            <th>comp. 3</th>
            <th>comp. 4</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(almacen, index) in resultadosBusqueda" :key="index">
            <td>{{ almacen.id }}</td>
            <td>{{ almacen.nombre_almacen || "-" }}</td>
            <td>
              <button
                @click="verContenidoAlmacen(almacen.id)"
                class="btn btn-sm btn-success me-2"
              >
                Ver contenido de este almacén
              </button>
              <button
                v-if="isAdmin"
                @click="editarAlmacen(almacen)"
                class="btn btn-sm btn-warning me-2"
              >
                Editar
              </button>
              <button
                v-if="isAdmin"
                @click="eliminarAlmacen(almacen)"
                class="btn btn-sm btn-danger"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Ventana modal para ver el contenido del almacén -->
      <v-dialog v-model="verModal" max-width="1200px">
        <v-card>
          <v-card-title> Contenido del Almacén </v-card-title>
          <v-card-text>
            <div class="table-responsive">
              <table class="table table-striped table-bordered text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Almacén ID</th>
                    <th>No. de inventario</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Fórmula</th>
                    <th>PM</th>
                    <th>Capacidad recip.</th>
                    <th>Recipientes actuales</th>
                    <th>Lote</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(recurso, index) in recursosAlmacen" :key="index">
                    <td>{{ recurso.id }}</td>
                    <td>{{ recurso.catalogo_id }}</td>
                    <td>{{ recurso.no_inventario }}</td>
                    <td>{{ recurso.nombre }}</td>
                    <td>{{ recurso.tipo_recurso }}</td>
                    <td>{{ recurso.marca || "-" }}</td>
                    <td>{{ recurso.formula || "-" }}</td>
                    <td>{{ recurso.pm || "-" }}</td>
                    <td>{{ recurso.capacidad_r }}</td>
                    <td>{{ recurso.recipientes_actuales || "-" }}</td>
                    <td>{{ recurso.lote || "-" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="cerrarModal">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Resultados de búsqueda -->
      
    </div>
  </template>

<script>
import { computed } from "vue";

    export default{
        setup() {
    const isAdmin = computed(() => localStorage.getItem("isAdmin") === "true");

    return {
      isAdmin,
      // ... otros métodos y propiedades
    };
  },
    }
</script>