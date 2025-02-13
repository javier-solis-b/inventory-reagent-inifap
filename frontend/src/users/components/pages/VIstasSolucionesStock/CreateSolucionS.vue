<template>
  <form @submit.prevent="crearSolucion">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
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
  <v-row>
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
  
  <!-- Medios de cultivo -->
  <v-col cols="12" sm="24" md="12">
  <v-text-field
  variant="underlined"
  v-model="medios_cultivo"
  label="Medios de cultivo"
  prepend-icon="mdi-flask-conical"
  ></v-text-field>
  </v-col>
  
  <!-- Recursos -->
  <div v-for="(recurso, index) in recursos" :key="index">
  <label :for="'recurso-' + index" class="form-label mb-2">{{ "Recurso " + (index + 1) }}</label>
  <div class="row">
  <v-col cols="8" sm="2" md="5">
  <v-select
  :id="'recurso-' + index"
  v-model="recurso.recurso_id"
  :items="listaRecursos"
  item-title="nombre"
  item-value="id"
  label="Recurso"
  prepend-icon="mdi-database"
  required
  @update:modelValue="onChangeRecurso"
  filterable
  clearable
  ></v-select>
  </v-col>
  <v-col cols="8" sm="2" md="5">
  <v-text-field
  v-model="recurso.cantidad_usada"
  label="Cantidad Usada"
  type="number"
  step="0.01"
  prepend-icon="mdi-measurement-variant"
  required
  ></v-text-field>
  </v-col>
  <v-col cols="8" sm="2" md="4">
  <div>
  <v-btn @click="eliminarRecurso(index)" color="error">
  <span>Quitar</span>
  </v-btn>
  </div>
  </v-col>
  </div>
  </div>
  </v-row>
  
  <!-- Botón Agregar Recurso -->
  <v-row justify="start" align="center" class="mt-3">
  <v-col cols="auto">
  <v-btn type="button" color="success" @click="agregarRecurso">Agregar Recurso</v-btn>
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
  import Swal from "sweetalert2";
  import { RecursoService } from "@/users/services/RecursoService";
  export default {
  data() {
  return {
  nombre_solucion: "",
  medios_cultivo: "",
  recursos: [{ recurso_id: null, cantidad_usada: "" }],
  listaRecursos: [],
  };
  },
  async mounted() {
  await this.cargarRecursos();
  },
  methods: {
  async cargarRecursos() {
  try {
  const recursos = await RecursoService.all();
  this.listaRecursos = recursos.map((recurso) => ({
  id: recurso.id,
  nombre: `${recurso.id} - ${recurso.nombre} - ${recurso.no_inventario}`,
  }));
  } catch (error) {
  console.error("Error al cargar los recursos:", error);
  Swal.fire({
  icon: "error",
  title: "Error al cargar recursos",
  text: "Hubo un problema al cargar los recursos. Por favor, inténtalo de nuevo.",
  confirmButtonText: '<span style="color:white;">OK</span>',
  });
  }
  },
  agregarRecurso() {
  this.recursos.push({ recurso_id: null, cantidad_usada: "" });
  },
  eliminarRecurso(index) {
  this.recursos.splice(index, 1);
  },
  onChangeRecurso(value) {
  console.log("Valor seleccionado:", value);
  },
  async crearSolucion() {
  try {
  // Convertir 'recursos' a un array regular
  const recursosParseados = this.recursos.map(recurso => ({
  recurso_id: recurso.recurso_id,
  cantidad_usada: Number(recurso.cantidad_usada)
  }));
  const datos = {
  nombre_solucion: this.nombre_solucion,
  medios_cultivo: this.medios_cultivo || null,
  recursos: recursosParseados
  };
  console.log("Datos a enviar:", JSON.stringify(datos));
  const response = await fetch('http://localhost:3000/api/v1/soluciones-stock', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify(datos)
  });
  if (!response.ok) {
  const errorDetails = await response.json();
  console.error('Detalles del error:', errorDetails);
  throw new Error("Error al crear la solución");
  }
  const result = await response.json();
  console.log("Respuesta del servidor:", result);
  Swal.fire({
  icon: "success",
  title: "Solución creada con éxito",
  confirmButtonText: '<span style="color:white;">OK</span>'
  });
  } catch (error) {
  console.error("Error al crear la solución:", error);
  Swal.fire({
  icon: "error",
  title: "Error",
  text: "Hubo un problema al crear la solución. Por favor, inténtalo de nuevo.",
  confirmButtonText: '<span style="color:white;">OK</span>'
  });
  }
  },
  limpiarFormulario() {
  this.nombre_solucion = "";
  this.medios_cultivo = "";
  this.recursos = [{ recurso_id: null, cantidad_usada: "" }];
  },
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