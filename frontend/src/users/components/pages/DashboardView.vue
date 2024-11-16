<template>
   <div class="container-fluid p-0">
    <div class="row justify-content-center align-items-center mb-4">
      <div class="col-auto">
        <h3 class="fw-bold mb-0 text-color" style="color: #0c934a;">Inicio</h3>
      </div>
    </div>

    <!-- Gráficas -->
    <div class="row justify-content-center">
      <div class="col-md-6 mb-4">
        <div class="card shadow-none bg-light rounded">
          <div class="card-header">
            <h5 class="mb-0">Gráfica de Almacenes</h5>
          </div>
          <div class="card-body">
            <canvas id="almacenChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card shadow-none bg-light rounded">
          <div class="card-header">
            <h5 class="mb-0">Distribución de Tipos de Recursos</h5>
          </div>
          <div class="card-body">
            <canvas id="tipoRecursoChart"></canvas>
          </div>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
import WebFont from "webfontloader";
import Chart from 'chart.js/auto';
import { AlmacenService } from "@/users/services/AlmacenService";
import { RecursoService } from "@/users/services/RecursoService";

export default {
  name: "DashboardView",
  data() {
    return {
      almacenes: [],
      recursos: [],
    };
  },
  async mounted() {
    WebFont.load({
      google: { families: ["Public Sans:300,400,500,600,700"] },
      custom: {
        families: [
          "Font Awesome 5 Solid",
          "Font Awesome 5 Regular",
          "Font Awesome 5 Brands",
          "simple-line-icons",
        ],
        urls: ["assets/css/fonts.min.css"],
      },
      active: function () {
        sessionStorage.fonts = true;
      },
    });
    await this.cargarDatos();
    this.generarGraficaAlmacenes();
    this.generarGraficaTiposRecursos();
  },
  methods: {
    navigateToUsers() {
      this.$router.push('/usuarios');
    },
    async cargarDatos() {
      try {
        this.almacenes = await AlmacenService.all();
        this.recursos = await RecursoService.all();
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    },
    generarGraficaAlmacenes() {
      const ctx = document.getElementById('almacenChart').getContext('2d');
      const almacenesData = this.almacenes.map(almacen => {
        return {
          nombre: almacen.nombre_almacen,
          cantidad: this.recursos.filter(recurso => recurso.catalogo_id === almacen.id).length
        };
      });
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: almacenesData.map(almacen => almacen.nombre),
          datasets: [{
            label: 'Cantidad de Recursos',
            data: almacenesData.map(almacen => almacen.cantidad),
            backgroundColor: 'rgba(54, 162, 235, 0.9)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    generarGraficaTiposRecursos() {
      const ctx = document.getElementById('tipoRecursoChart').getContext('2d');
      const tiposRecursoData = this.recursos.reduce((acc, recurso) => {
        acc[recurso.tipo_recurso] = (acc[recurso.tipo_recurso] || 0) + 1;
        return acc;
      }, {});
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(tiposRecursoData),
          datasets: [{
            label: 'Distribución de Tipos de Recursos',
            data: Object.values(tiposRecursoData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.9)',
              'rgba(54, 162, 235, 0.9)',
              'rgba(255, 206, 86, 0.9)',
              'rgba(75, 192, 192, 0.9)',
              'rgba(153, 102, 255, 0.9)',
              'rgba(255, 159, 64, 0.9)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1.5)',
              'rgba(54, 162, 235, 1.5)',
              'rgba(255, 206, 86, 1.5)',
              'rgba(75, 192, 192, 1.5)',
              'rgba(153, 102, 255, 1.5)',
              'rgba(255, 159, 64, 1.5)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  border-radius: 50px;
  background-color: #f8f9fa;
}

.card {
  box-shadow: 10px 5px 5px red;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    transform: scale(0.9);
    transition: 1s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}

h3 {
  color: var(--primary-alt);
}

.card-title {
  color: #0c934a;
}
</style>
