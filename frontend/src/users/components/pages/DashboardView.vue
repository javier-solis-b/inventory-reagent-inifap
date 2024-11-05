<template>
  <div class="container-fluid  ">
    <div class="row justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-0 text-color" style="color: #0c934a;">Cátalagos</h3>
      </div>
      <h6 class="text-muted">Selecciona una opción:</h6>
    </div>
    <div class="row text-center">
      <!-- Tarjeta de Almacenes -->
      <div class="col-sm-6 col-md-6 mb-4 " >
        <div class="card h-100 shadow-sm border-30" >
          <div class="card-body d-flex flex-column align-items-center justify-content-center bg-white rounded">
            <img src="/imagenes/almacen.png" alt="Almacenes" class="mb-3" width="50px" height="70px" />
            <h4 class="card-title text-color: var(--primary-alt)">Almacenes</h4>
          </div>
        </div>
      </div>
      <!-- Fin card -->
      <!-- Tarjeta de Refrigeradores -->
      <div class="col-sm-6 col-md-6 mb-4 elevation">
        <div class="card h-100 shadow-sm border-30">
          <div class="card-body d-flex flex-column align-items-center justify-content-center bg-white rounded">
            <img src="/imagenes/refrigerador.png" alt="Refrigeradores" class="mb-3" width="50px" height="70px" />
            <h4 class="card-title text-color: var(--primary-alt)">Refrigeradores</h4>
          </div>
        </div>
      </div>
      <!-- Fin card -->
      <!-- Tarjeta de Solventes -->
      <div class="col-sm-6 col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-30">
          <div class="card-body d-flex flex-column align-items-center justify-content-center bg-white rounded">
            <img src="/imagenes/solvente.png" alt="Solventes" class="mb-3" width="50px" height="70px" />
            <h4 class="card-title text-color: var(--primary-alt)">Solventes</h4>
          </div>
        </div>
      </div>
      <!-- Fin card -->
      <!-- Tarjeta de Usuarios -->
      <div class="col-sm-6 col-md-6 mb-4" @click="navigateToUsers">
        <div class="card h-100 shadow-sm border-30">
          <div class="card-body d-flex flex-column align-items-center justify-content-center bg-white rounded">
            <img src="/imagenes/usuario.png" alt="Usuarios" class="mb-3" width="50px" height="70px" />
            <h4 class="card-title text-color: var(--primary-alt)">Usuarios</h4>
          </div>
        </div>
      </div>
      <!-- Fin card -->
    </div>
<br>
    <div class="text-center ">
      <h4 class="color: var(--primary)">SIGIRES INIFAP - CERI</h4>
    </div>
  </div>
</template>

<script>
import WebFont from "webfontloader";

export default {
  name: "DashboardView",
  mounted() {
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
  },
  methods: {
    navigateToUsers() {
      this.$router.push('/usuarios');
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
    transform: scale(0.9) ;
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
